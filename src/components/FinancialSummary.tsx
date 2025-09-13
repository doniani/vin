import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  AlertCircle, 
  Target
} from 'lucide-react';

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: 'equipment' | 'training' | 'travel' | 'competition' | 'education' | 'health' | 'other';
  date: string;
  isPaid: boolean;
  isRecurring: boolean;
  priority: 'low' | 'medium' | 'high';
}

interface Budget {
  id: string;
  name: string;
  totalAmount: number;
  spentAmount: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  isActive: boolean;
}

interface Scholarship {
  id: string;
  name: string;
  amount: number;
  status: 'available' | 'applied' | 'awarded' | 'rejected';
  deadline: string;
}

interface FinancialSummaryProps {
  expenses: Expense[];
  budgets: Budget[];
  scholarships: Scholarship[];
}

export const FinancialSummary: React.FC<FinancialSummaryProps> = ({ 
  expenses, 
  budgets, 
  scholarships 
}) => {
  const getTotalExpenses = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };


  const getPendingExpenses = () => {
    return expenses
      .filter(expense => !expense.isPaid)
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getRecurringExpenses = () => {
    return expenses
      .filter(expense => expense.isRecurring)
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getTotalBudget = () => {
    return budgets.reduce((sum, budget) => sum + budget.totalAmount, 0);
  };

  const getSpentBudget = () => {
    return budgets.reduce((sum, budget) => sum + budget.spentAmount, 0);
  };

  const getRemainingBudget = () => {
    return getTotalBudget() - getSpentBudget();
  };

  const getAvailableScholarships = () => {
    return scholarships
      .filter(scholarship => scholarship.status === 'available')
      .reduce((sum, scholarship) => sum + scholarship.amount, 0);
  };



  const getCategoryBreakdown = () => {
    const categories = ['equipment', 'training', 'travel', 'competition', 'education', 'health', 'other'];
    return categories.map(category => {
      const total = expenses
        .filter(expense => expense.category === category)
        .reduce((sum, expense) => sum + expense.amount, 0);
      
      return {
        category,
        total,
        percentage: getTotalExpenses() > 0 ? (total / getTotalExpenses()) * 100 : 0
      };
    }).filter(item => item.total > 0);
  };

  const getPriorityBreakdown = () => {
    const priorities = ['high', 'medium', 'low'];
    return priorities.map(priority => {
      const total = expenses
        .filter(expense => expense.priority === priority)
        .reduce((sum, expense) => sum + expense.amount, 0);
      
      return {
        priority,
        total,
        percentage: getTotalExpenses() > 0 ? (total / getTotalExpenses()) * 100 : 0
      };
    }).filter(item => item.total > 0);
  };

  const getUpcomingExpenses = () => {
    const today = new Date();
    const next30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    return expenses
      .filter(expense => 
        !expense.isPaid && 
        new Date(expense.date) >= today && 
        new Date(expense.date) <= next30Days
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  };

  const getOverdueExpenses = () => {
    const today = new Date();
    return expenses.filter(expense => 
      !expense.isPaid && 
      new Date(expense.date) < today
    );
  };

  const getBudgetStatus = () => {
    return budgets.map(budget => ({
      ...budget,
      percentage: (budget.spentAmount / budget.totalAmount) * 100,
      status: budget.spentAmount > budget.totalAmount ? 'over' : 
              budget.spentAmount > budget.totalAmount * 0.8 ? 'warning' : 'good'
    }));
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'equipment': return 'Equipamentos';
      case 'training': return 'Treinamento';
      case 'travel': return 'Viagens';
      case 'competition': return 'Competições';
      case 'education': return 'Educação';
      case 'health': return 'Saúde';
      default: return 'Outros';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'Desconhecida';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'over': return 'text-red-600';
      case 'warning': return 'text-yellow-600';
      case 'good': return 'text-green-600';
      default: return 'text-muted-foreground';
    }
  };

  const totalExpenses = getTotalExpenses();
  const pendingExpenses = getPendingExpenses();
  const recurringExpenses = getRecurringExpenses();
  const totalBudget = getTotalBudget();
  const remainingBudget = getRemainingBudget();
  const availableScholarships = getAvailableScholarships();

  const categoryBreakdown = getCategoryBreakdown();
  const priorityBreakdown = getPriorityBreakdown();
  const upcomingExpenses = getUpcomingExpenses();
  const overdueExpenses = getOverdueExpenses();
  const budgetStatus = getBudgetStatus();

  return (
    <div className="space-y-6">
      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Despesas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              R$ {totalExpenses.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              R$ {pendingExpenses.toLocaleString('pt-BR')} pendentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Orçamento Disponível
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              R$ {remainingBudget.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              de R$ {totalBudget.toLocaleString('pt-BR')} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bolsas Disponíveis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              R$ {availableScholarships.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {scholarships.filter(s => s.status === 'available').length} oportunidades
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Despesas Recorrentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              R$ {recurringExpenses.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              por período
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Breakdown por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Gastos por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryBreakdown.map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {getCategoryLabel(item.category)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    R$ {item.total.toLocaleString('pt-BR')} ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Breakdown por Prioridade */}
      <Card>
        <CardHeader>
          <CardTitle>Gastos por Prioridade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {priorityBreakdown.map((item) => (
              <div key={item.priority} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${getPriorityColor(item.priority)}`}>
                    {getPriorityLabel(item.priority)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    R$ {item.total.toLocaleString('pt-BR')} ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status dos Orçamentos */}
      <Card>
        <CardHeader>
          <CardTitle>Status dos Orçamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgetStatus.map((budget) => (
              <div key={budget.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{budget.name}</span>
                  <span className={`text-sm font-medium ${getStatusColor(budget.status)}`}>
                    {budget.status === 'over' ? 'Excedido' :
                     budget.status === 'warning' ? 'Atenção' : 'Bom'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    R$ {budget.spentAmount.toLocaleString('pt-BR')} / R$ {budget.totalAmount.toLocaleString('pt-BR')}
                  </span>
                  <span>{budget.percentage.toFixed(1)}%</span>
                </div>
                <Progress 
                  value={budget.percentage} 
                  className={`h-2 ${
                    budget.status === 'over' ? 'bg-red-200' :
                    budget.status === 'warning' ? 'bg-yellow-200' : 'bg-green-200'
                  }`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Próximas Despesas */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Despesas (30 dias)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingExpenses.length > 0 ? (
              upcomingExpenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      expense.priority === 'high' ? 'bg-red-100 text-red-800' :
                      expense.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      <Target className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{expense.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(expense.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">
                      R$ {expense.amount.toLocaleString('pt-BR')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getPriorityLabel(expense.priority)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Nenhuma despesa pendente nos próximos 30 dias
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Despesas Atrasadas */}
      {overdueExpenses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-red-600">
              <AlertCircle className="h-5 w-5 mr-2" />
              Despesas Atrasadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overdueExpenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <div>
                      <h4 className="font-medium text-sm">{expense.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        Vencimento: {new Date(expense.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm text-red-600">
                      R$ {expense.amount.toLocaleString('pt-BR')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {getPriorityLabel(expense.priority)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
