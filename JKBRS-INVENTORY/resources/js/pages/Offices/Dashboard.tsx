import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Target, 
  BarChart3, 
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react';

interface PerformanceMetrics {
  budget_efficiency: number;
  staff_productivity: number;
  operational_score: number;
  overall_performance: number;
  monthly_trends: {
    month: string;
    budget_usage: number;
    productivity: number;
    performance: number;
  }[];
  comparisons: {
    vs_last_month: number;
    vs_last_quarter: number;
    vs_same_month_last_year: number;
  };
  key_indicators: {
    total_staff: number;
    budget_utilization: number;
    completed_projects: number;
    average_efficiency: number;
  };
}

interface Office {
  id: number;
  name: string;
  office_type: string;
  budget_allocation: number;
  current_budget: number;
  staff_count: number;
}

interface DashboardProps {
  office: Office;
  metrics: PerformanceMetrics;
  children_offices?: Office[];
}

const PerformanceDashboard: React.FC<DashboardProps> = ({ 
  office, 
  metrics, 
  children_offices = [] 
}) => {
  const [timeRange, setTimeRange] = useState('3months');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshMetrics = async () => {
    setIsRefreshing(true);
    try {
      router.reload({ only: ['metrics'] });
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceBadge = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getTrendIcon = (value: number) => {
    return value >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  // Mock chart data - in real implementation, this would come from metrics
  const chartData = metrics.monthly_trends || [];

  return (
    <>
      <Head title={`Performance Dashboard - ${office.name}`} />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Performance Dashboard</h1>
            <p className="text-gray-600 mt-2">{office.name}</p>
          </div>
          <div className="flex space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={refreshMetrics} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overall Performance</p>
                  <p className={`text-2xl font-bold ${getPerformanceColor(metrics.overall_performance)}`}>
                    {metrics.overall_performance}%
                  </p>
                </div>
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <div className="mt-2 flex items-center">
                {getTrendIcon(metrics.comparisons.vs_last_month)}
                <span className="text-sm text-gray-600 ml-1">
                  {formatPercentage(metrics.comparisons.vs_last_month)} vs last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Budget Efficiency</p>
                  <p className={`text-2xl font-bold ${getPerformanceColor(metrics.budget_efficiency)}`}>
                    {metrics.budget_efficiency}%
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <Progress value={metrics.budget_efficiency} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Staff Productivity</p>
                  <p className={`text-2xl font-bold ${getPerformanceColor(metrics.staff_productivity)}`}>
                    {metrics.staff_productivity}%
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <Progress value={metrics.staff_productivity} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Operational Score</p>
                  <p className={`text-2xl font-bold ${getPerformanceColor(metrics.operational_score)}`}>
                    {metrics.operational_score}%
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
              <Progress value={metrics.operational_score} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Performance Trends and Comparisons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chartData.length > 0 ? (
                  chartData.slice(-6).map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{trend.month}</span>
                      <div className="flex space-x-4 text-sm">
                        <span className="text-blue-600">Performance: {trend.performance}%</span>
                        <span className="text-green-600">Budget: {trend.budget_usage}%</span>
                        <span className="text-purple-600">Productivity: {trend.productivity}%</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No trend data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Comparisons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">vs Last Month</span>
                  <div className="flex items-center">
                    {getTrendIcon(metrics.comparisons.vs_last_month)}
                    <span className="ml-2 font-medium">
                      {formatPercentage(metrics.comparisons.vs_last_month)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">vs Last Quarter</span>
                  <div className="flex items-center">
                    {getTrendIcon(metrics.comparisons.vs_last_quarter)}
                    <span className="ml-2 font-medium">
                      {formatPercentage(metrics.comparisons.vs_last_quarter)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">vs Same Month Last Year</span>
                  <div className="flex items-center">
                    {getTrendIcon(metrics.comparisons.vs_same_month_last_year)}
                    <span className="ml-2 font-medium">
                      {formatPercentage(metrics.comparisons.vs_same_month_last_year)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Indicators */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Key Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">{metrics.key_indicators.total_staff}</p>
                <p className="text-sm text-gray-600">Total Staff</p>
              </div>
              <div className="text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <p className="text-2xl font-bold">{metrics.key_indicators.budget_utilization}%</p>
                <p className="text-sm text-gray-600">Budget Utilization</p>
              </div>
              <div className="text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <p className="text-2xl font-bold">{metrics.key_indicators.completed_projects}</p>
                <p className="text-sm text-gray-600">Completed Projects</p>
              </div>
              <div className="text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                <p className="text-2xl font-bold">{metrics.key_indicators.average_efficiency}%</p>
                <p className="text-sm text-gray-600">Average Efficiency</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Child Offices Performance */}
        {children_offices.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Child Offices Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {children_offices.map((child) => {
                  // Mock performance score for child offices
                  const childScore = Math.floor(Math.random() * 40) + 60;
                  return (
                    <div key={child.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{child.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{child.office_type}</Badge>
                          <span className="text-sm text-gray-600">
                            {child.staff_count} staff
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className={`font-bold ${getPerformanceColor(childScore)}`}>
                            {childScore}%
                          </p>
                          <p className="text-xs text-gray-600">Performance</p>
                        </div>
                        <Badge className={getPerformanceBadge(childScore)}>
                          {childScore >= 80 ? 'Excellent' : childScore >= 60 ? 'Good' : 'Needs Improvement'}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.visit(`/offices/${child.id}/dashboard`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default PerformanceDashboard;
