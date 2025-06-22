import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle, Save, X } from 'lucide-react';

interface Office {
  id: number;
  name: string;
  office_type: string;
  budget_allocation: number;
  current_budget: number;
  staff_count: number;
}

interface BudgetProps {
  office: Office;
  children_offices?: Office[];
}

const BudgetManagement: React.FC<BudgetProps> = ({ office, children_offices = [] }) => {
  const [activeTab, setActiveTab] = useState<'update' | 'allocate' | 'history'>('update');

  // Form for updating office budget
  const { data, setData, post, processing, errors, reset } = useForm({
    budget_allocation: office.budget_allocation.toString(),
    notes: '',
    effective_date: new Date().toISOString().split('T')[0],
  });

  // Form for allocating budget to child offices
  const [childBudgets, setChildBudgets] = useState<Record<number, string>>(
    children_offices.reduce((acc, child) => ({
      ...acc,
      [child.id]: child.budget_allocation.toString()
    }), {})
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(`/offices/${office.id}/budget`, {
      onSuccess: () => {
        reset();
        router.reload();
      }
    });
  };

  const handleChildBudgetUpdate = (childId: number, amount: string) => {
    setChildBudgets(prev => ({
      ...prev,
      [childId]: amount
    }));
  };

  const submitChildBudgets = () => {
    const budgetData = Object.entries(childBudgets).map(([id, amount]) => ({
      office_id: parseInt(id),
      budget_allocation: parseFloat(amount)
    }));

    router.post('/offices/bulk-budget-update', {
      budgets: budgetData
    });
  };

  const getBudgetUtilization = (current: number, allocation: number) => {
    if (allocation === 0) return 0;
    return Math.round((current / allocation) * 100);
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage > 90) return 'text-red-600';
    if (percentage > 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  const totalChildBudget = Object.values(childBudgets).reduce((sum, amount) => sum + parseFloat(amount || '0'), 0);
  const remainingBudget = office.budget_allocation - totalChildBudget;

  return (
    <>
      <Head title={`Budget Management - ${office.name}`} />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Budget Management</h1>
            <p className="text-gray-600 mt-2">{office.name}</p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.visit(`/offices/${office.id}`)}
          >
            <X className="h-4 w-4 mr-2" />
            Back to Office
          </Button>
        </div>

        {/* Budget Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Budget Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-sm font-medium text-gray-600">Total Allocation</Label>
                <p className="text-2xl font-bold text-blue-600">
                  ${office.budget_allocation.toLocaleString()}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Current Budget</Label>
                <p className="text-2xl font-bold text-green-600">
                  ${office.current_budget.toLocaleString()}
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Utilization</Label>
                <div className="flex items-center space-x-2">
                  <p className={`text-2xl font-bold ${getUtilizationColor(getBudgetUtilization(office.current_budget, office.budget_allocation))}`}>
                    {getBudgetUtilization(office.current_budget, office.budget_allocation)}%
                  </p>
                  {getBudgetUtilization(office.current_budget, office.budget_allocation) > 90 && (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <Progress 
                  value={getBudgetUtilization(office.current_budget, office.budget_allocation)} 
                  className="mt-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === 'update' ? 'default' : 'outline'}
            onClick={() => setActiveTab('update')}
          >
            Update Budget
          </Button>
          {children_offices.length > 0 && (
            <Button
              variant={activeTab === 'allocate' ? 'default' : 'outline'}
              onClick={() => setActiveTab('allocate')}
            >
              Allocate to Children
            </Button>
          )}
          <Button
            variant={activeTab === 'history' ? 'default' : 'outline'}
            onClick={() => setActiveTab('history')}
          >
            Budget History
          </Button>
        </div>

        {/* Update Budget Tab */}
        {activeTab === 'update' && (
          <Card>
            <CardHeader>
              <CardTitle>Update Budget Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="budget_allocation">New Budget Allocation</Label>
                  <Input
                    id="budget_allocation"
                    type="number"
                    value={data.budget_allocation}
                    onChange={(e) => setData('budget_allocation', e.target.value)}
                    placeholder="Enter new budget allocation"
                    className={errors.budget_allocation ? 'border-red-500' : ''}
                  />
                  {errors.budget_allocation && (
                    <p className="text-red-500 text-sm mt-1">{errors.budget_allocation}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="effective_date">Effective Date</Label>
                  <Input
                    id="effective_date"
                    type="date"
                    value={data.effective_date}
                    onChange={(e) => setData('effective_date', e.target.value)}
                    className={errors.effective_date ? 'border-red-500' : ''}
                  />
                  {errors.effective_date && (
                    <p className="text-red-500 text-sm mt-1">{errors.effective_date}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={data.notes}
                    onChange={(e) => setData('notes', e.target.value)}
                    placeholder="Add notes about this budget update..."
                    rows={3}
                  />
                </div>

                <Button type="submit" disabled={processing}>
                  <Save className="h-4 w-4 mr-2" />
                  {processing ? 'Updating...' : 'Update Budget'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Allocate to Children Tab */}
        {activeTab === 'allocate' && children_offices.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Allocate Budget to Child Offices</CardTitle>
              <div className="flex items-center space-x-4 text-sm">
                <span>Total Available: ${office.budget_allocation.toLocaleString()}</span>
                <span>Allocated: ${totalChildBudget.toLocaleString()}</span>
                <span className={remainingBudget < 0 ? 'text-red-600' : 'text-green-600'}>
                  Remaining: ${remainingBudget.toLocaleString()}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {children_offices.map((child) => (
                  <div key={child.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{child.name}</h4>
                      <p className="text-sm text-gray-600">
                        Current: ${child.current_budget.toLocaleString()} / 
                        ${child.budget_allocation.toLocaleString()}
                      </p>
                      <Badge className="mt-1">
                        {child.office_type}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`budget-${child.id}`} className="text-sm">
                        Budget:
                      </Label>
                      <Input
                        id={`budget-${child.id}`}
                        type="number"
                        value={childBudgets[child.id] || ''}
                        onChange={(e) => handleChildBudgetUpdate(child.id, e.target.value)}
                        className="w-32"
                        placeholder="0"
                      />
                    </div>
                  </div>
                ))}
                
                {remainingBudget < 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                    <span className="text-red-700">
                      Warning: Total allocation exceeds available budget by ${Math.abs(remainingBudget).toLocaleString()}
                    </span>
                  </div>
                )}

                <Button 
                  onClick={submitChildBudgets}
                  disabled={remainingBudget < 0}
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Update Child Office Budgets
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Budget History Tab */}
        {activeTab === 'history' && (
          <Card>
            <CardHeader>
              <CardTitle>Budget History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Budget history will be displayed here.</p>
                <p className="text-sm">This feature requires additional backend implementation.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default BudgetManagement;
