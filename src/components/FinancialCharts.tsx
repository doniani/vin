import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: 'equipment' | 'training' | 'travel' | 'competition' | 'education' | 'health' | 'other';
  date: string;
  isPaid: boolean;
}

interface Budget {
  id: string;
  name: string;
  totalAmount: number;
  spentAmount: number;
  period: 'monthly' | 'quarterly' | 'yearly';
}

interface FinancialChartsProps {
  expenses: Expense[];
  budgets: Budget[];
}

export const FinancialCharts: React.FC<FinancialChartsProps> = ({ expenses, budgets }) => {
  const getCategoryData = () => {
    const categories = ['equipment', 'training', 'travel', 'competition', 'education', 'health', 'other'];
    return categories.map(category => {
      const total = expenses
        .filter(expense => expense.category === category)
        .reduce((sum, expense) => sum + expense.amount, 0);
      
      return {
        name: category === 'equipment' ? 'Equipamentos' :
              category === 'training' ? 'Treinamento' :
              category === 'travel' ? 'Viagens' :
              category === 'competition' ? 'Competições' :
              category === 'education' ? 'Educação' :
              category === 'health' ? 'Saúde' : 'Outros',
        value: total,
        color: category === 'equipment' ? '#3B82F6' :
               category === 'training' ? '#10B981' :
               category === 'travel' ? '#8B5CF6' :
               category === 'competition' ? '#EF4444' :
               category === 'education' ? '#F59E0B' :
               category === 'health' ? '#EC4899' : '#6B7280'
      };
    }).filter(item => item.value > 0);
  };

  const getMonthlyData = () => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    const currentYear = new Date().getFullYear();
    
    return months.map((month, index) => {
      const monthExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === currentYear && expenseDate.getMonth() === index;
      });
      
      const total = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      const paid = monthExpenses.filter(expense => expense.isPaid).reduce((sum, expense) => sum + expense.amount, 0);
      
      return {
        month,
        total,
        paid,
        pending: total - paid
      };
    });
  };

  const getBudgetData = () => {
    return budgets.map(budget => ({
      name: budget.name,
      total: budget.totalAmount,
      spent: budget.spentAmount,
      remaining: budget.totalAmount - budget.spentAmount
    }));
  };

  const getPaymentStatusData = () => {
    const paid = expenses.filter(expense => expense.isPaid).reduce((sum, expense) => sum + expense.amount, 0);
    const pending = expenses.filter(expense => !expense.isPaid).reduce((sum, expense) => sum + expense.amount, 0);
    
    return [
      { name: 'Pago', value: paid, color: '#10B981' },
      { name: 'Pendente', value: pending, color: '#F59E0B' }
    ];
  };

  const categoryData = getCategoryData();
  const monthlyData = getMonthlyData();
  const budgetData = getBudgetData();
  const paymentStatusData = getPaymentStatusData();

  return (
    <div className="space-y-6">
      {/* Gráfico de Categorias */}
      <Card>
        <CardHeader>
          <CardTitle>Gastos por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Valor']} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico Mensal */}
      <Card>
        <CardHeader>
          <CardTitle>Gastos Mensais - {new Date().getFullYear()}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Valor']} />
              <Bar dataKey="paid" stackId="a" fill="#10B981" name="Pago" />
              <Bar dataKey="pending" stackId="a" fill="#F59E0B" name="Pendente" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Orçamentos */}
      <Card>
        <CardHeader>
          <CardTitle>Status dos Orçamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Valor']} />
              <Bar dataKey="spent" fill="#EF4444" name="Gasto" />
              <Bar dataKey="remaining" fill="#10B981" name="Restante" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Status de Pagamento */}
      <Card>
        <CardHeader>
          <CardTitle>Status de Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Valor']} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
