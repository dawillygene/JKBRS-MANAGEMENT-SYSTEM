import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, Users, ChevronRight, ChevronDown, Eye, Edit } from 'lucide-react';

interface Office {
  id: number;
  name: string;
  office_type: string;
  parent_id?: number;
  budget_allocation: number;
  current_budget: number;
  staff_count: number;
  children?: Office[];
}

interface HierarchyProps {
  offices: Office[];
}

const OfficeHierarchy: React.FC<HierarchyProps> = ({ offices }) => {
  const [expandedOffices, setExpandedOffices] = useState<Set<number>>(new Set());

  // Toggle office expansion
  const toggleOffice = (officeId: number) => {
    const newExpanded = new Set(expandedOffices);
    if (newExpanded.has(officeId)) {
      newExpanded.delete(officeId);
    } else {
      newExpanded.add(officeId);
    }
    setExpandedOffices(newExpanded);
  };

  // Expand all offices
  const expandAll = () => {
    const allOfficeIds = new Set<number>();
    const collectOfficeIds = (officeList: Office[]) => {
      officeList.forEach(office => {
        allOfficeIds.add(office.id);
        if (office.children) {
          collectOfficeIds(office.children);
        }
      });
    };
    collectOfficeIds(offices);
    setExpandedOffices(allOfficeIds);
  };

  // Collapse all offices
  const collapseAll = () => {
    setExpandedOffices(new Set());
  };

  // Get office type color
  const getOfficeTypeColor = (type: string) => {
    switch (type) {
      case 'headquarters':
        return 'bg-blue-100 text-blue-800';
      case 'regional':
        return 'bg-green-100 text-green-800';
      case 'branch':
        return 'bg-yellow-100 text-yellow-800';
      case 'department':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate budget percentage
  const getBudgetPercentage = (current: number, allocation: number) => {
    if (allocation === 0) return 0;
    return Math.round((current / allocation) * 100);
  };

  // Render office node
  const renderOfficeNode = (office: Office, level: number = 0) => {
    const hasChildren = office.children && office.children.length > 0;
    const isExpanded = expandedOffices.has(office.id);
    const budgetPercentage = getBudgetPercentage(office.current_budget, office.budget_allocation);

    return (
      <div key={office.id} className={`ml-${level * 6}`}>
        <Card className="mb-2 border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleOffice(office.id)}
                    className="p-1 h-auto"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                )}
                {!hasChildren && <div className="w-6" />}
                
                <Building className="h-5 w-5 text-blue-600" />
                
                <div>
                  <h3 className="font-semibold text-lg">{office.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={getOfficeTypeColor(office.office_type)}>
                      {office.office_type}
                    </Badge>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{office.staff_count} staff</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium">
                    Budget: ${office.current_budget.toLocaleString()} / ${office.budget_allocation.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">
                    {budgetPercentage}% utilized
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className={`h-2 rounded-full ${
                        budgetPercentage > 90 
                          ? 'bg-red-600' 
                          : budgetPercentage > 75 
                          ? 'bg-yellow-600' 
                          : 'bg-green-600'
                      }`}
                      style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.visit(`/offices/${office.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.visit(`/offices/${office.id}/edit`)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {hasChildren && isExpanded && (
          <div className="ml-6 border-l border-gray-200 pl-4">
            {office.children!.map(child => renderOfficeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Head title="Office Hierarchy" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Office Hierarchy</h1>
            <p className="text-gray-600 mt-2">View and manage your organizational structure</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={collapseAll}>
              Collapse All
            </Button>
            <Button variant="outline" onClick={expandAll}>
              Expand All
            </Button>
            <Button onClick={() => router.visit('/offices/create')}>
              Add Office
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {offices.map(office => renderOfficeNode(office))}
        </div>
      </div>
    </>
  );
};

export default OfficeHierarchy;
