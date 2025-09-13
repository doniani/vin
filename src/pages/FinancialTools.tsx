import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  Plus, 
  Trash2, 
  AlertCircle,
  CheckCircle,
  Wallet,
  CreditCard,
  PiggyBank
} from 'lucide-react';

interface Expense {
  id: string;
  title: string;
  description: string;
  amount: number;
  category: 'equipment' | 'training' | 'travel' | 'competition' | 'education' | 'health' | 'other';
  date: string;
  isRecurring: boolean;
  isPaid: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

interface Budget {
  id: string;
  name: string;
  category: string;
  totalAmount: number;
  spentAmount: number;
  period: 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface Scholarship {
  id: string;
  name: string;
  amount: number;
  requirements: string[];
  deadline: string;
  status: 'available' | 'applied' | 'awarded' | 'rejected';
  description: string;
  source: string;
}

export const FinancialTools: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: '1',
      title: 'Equipamentos de Futebol Americano',
      description: 'Chuteira, capacete, shoulder pads',
      amount: 1200,
      category: 'equipment',
      date: '2024-02-15',
      isRecurring: false,
      isPaid: true,
      priority: 'high',
      createdAt: '2024-02-01'
    },
    {
      id: '2',
      title: 'Personal Trainer',
      description: 'Sessões de treinamento personalizado',
      amount: 300,
      category: 'training',
      date: '2024-03-01',
      isRecurring: true,
      isPaid: false,
      priority: 'medium',
      createdAt: '2024-02-15'
    },
    {
      id: '3',
      title: 'Viagem para Showcase',
      description: 'Passagem e hospedagem para evento em SP',
      amount: 800,
      category: 'travel',
      date: '2024-03-15',
      isRecurring: false,
      isPaid: false,
      priority: 'high',
      createdAt: '2024-02-20'
    },
    {
      id: '4',
      title: 'Curso de Inglês',
      description: 'Preparação para testes de proficiência',
      amount: 500,
      category: 'education',
      date: '2024-03-10',
      isRecurring: false,
      isPaid: true,
      priority: 'medium',
      createdAt: '2024-02-10'
    }
  ]);

  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: '1',
      name: 'Orçamento Mensal - Março',
      category: 'Geral',
      totalAmount: 5000,
      spentAmount: 3200,
      period: 'monthly',
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      isActive: true
    },
    {
      id: '2',
      name: 'Equipamentos 2024',
      category: 'Equipamentos',
      totalAmount: 3000,
      spentAmount: 1200,
      period: 'yearly',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      isActive: true
    }
  ]);

  const [scholarships, setScholarships] = useState<Scholarship[]>([
    {
      id: '1',
      name: 'Bolsa de Estudos - Universidade X',
      amount: 50000,
      requirements: ['GPA mínimo 3.5', 'Teste SAT 1200+', 'Vídeo de demonstração'],
      deadline: '2024-04-30',
      status: 'available',
      description: 'Bolsa integral para atletas de futebol americano',
      source: 'Universidade X'
    },
    {
      id: '2',
      name: 'Programa de Apoio - Federação',
      amount: 10000,
      requirements: ['Participação em competições', 'Relatório de desempenho'],
      deadline: '2024-05-15',
      status: 'applied',
      description: 'Apoio financeiro para atletas em desenvolvimento',
      source: 'Federação Brasileira'
    }
  ]);

  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const [isBudgetDialogOpen, setIsBudgetDialogOpen] = useState(false);

  const [newExpense, setNewExpense] = useState({
    title: '',
    description: '',
    amount: 0,
    category: 'equipment' as const,
    date: '',
    isRecurring: false,
    priority: 'medium' as const
  });

  const [newBudget, setNewBudget] = useState({
    name: '',
    category: '',
    totalAmount: 0,
    period: 'monthly' as const,
    startDate: '',
    endDate: ''
  });


  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'equipment': return 'bg-blue-100 text-blue-800';
      case 'training': return 'bg-green-100 text-green-800';
      case 'travel': return 'bg-purple-100 text-purple-800';
      case 'competition': return 'bg-red-100 text-red-800';
      case 'education': return 'bg-yellow-100 text-yellow-800';
      case 'health': return 'bg-pink-100 text-pink-800';
      default: return 'bg-muted text-muted-foreground';
    }
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
      case 'available': return 'bg-green-100 text-green-800';
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'awarded': return 'bg-purple-100 text-purple-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return 'Disponível';
      case 'applied': return 'Candidatado';
      case 'awarded': return 'Concedida';
      case 'rejected': return 'Rejeitada';
      default: return 'Desconhecido';
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const paidExpenses = expenses.filter(expense => expense.isPaid).reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = totalExpenses - paidExpenses;
  const recurringExpenses = expenses.filter(expense => expense.isRecurring).reduce((sum, expense) => sum + expense.amount, 0);

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.totalAmount, 0);
  const spentBudget = budgets.reduce((sum, budget) => sum + budget.spentAmount, 0);
  const remainingBudget = totalBudget - spentBudget;

  const availableScholarships = scholarships.filter(s => s.status === 'available').reduce((sum, scholarship) => sum + scholarship.amount, 0);

  const handleCreateExpense = () => {
    const expense: Expense = {
      id: Date.now().toString(),
      ...newExpense,
      isPaid: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setExpenses([...expenses, expense]);
    setNewExpense({
      title: '',
      description: '',
      amount: 0,
      category: 'equipment',
      date: '',
      isRecurring: false,
      priority: 'medium'
    });
    setIsExpenseDialogOpen(false);
  };

  const handleCreateBudget = () => {
    const budget: Budget = {
      id: Date.now().toString(),
      ...newBudget,
      spentAmount: 0,
      isActive: true
    };
    setBudgets([...budgets, budget]);
    setNewBudget({
      name: '',
      category: '',
      totalAmount: 0,
      period: 'monthly',
      startDate: '',
      endDate: ''
    });
    setIsBudgetDialogOpen(false);
  };

  const handleUpdateExpense = (expenseId: string, updates: Partial<Expense>) => {
    setExpenses(expenses.map(expense => 
      expense.id === expenseId ? { ...expense, ...updates } : expense
    ));
  };

  const handleDeleteExpense = (expenseId: string) => {
    setExpenses(expenses.filter(expense => expense.id !== expenseId));
  };

  const handleUpdateScholarship = (scholarshipId: string, updates: Partial<Scholarship>) => {
    setScholarships(scholarships.map(scholarship => 
      scholarship.id === scholarshipId ? { ...scholarship, ...updates } : scholarship
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Finanças & Orçamento</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie custos, orçamentos e oportunidades de bolsas
          </p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Despesa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Despesa</DialogTitle>
                <DialogDescription>
                  Adicione uma nova despesa ao seu orçamento
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={newExpense.title}
                    onChange={(e) => setNewExpense({...newExpense, title: e.target.value})}
                    placeholder="Nome da despesa"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    placeholder="Descrição da despesa"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Valor (R$)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({...newExpense, amount: parseFloat(e.target.value)})}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Data</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={newExpense.category}
                      onValueChange={(value: any) => setNewExpense({...newExpense, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equipment">Equipamentos</SelectItem>
                        <SelectItem value="training">Treinamento</SelectItem>
                        <SelectItem value="travel">Viagens</SelectItem>
                        <SelectItem value="competition">Competições</SelectItem>
                        <SelectItem value="education">Educação</SelectItem>
                        <SelectItem value="health">Saúde</SelectItem>
                        <SelectItem value="other">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Prioridade</Label>
                    <Select
                      value={newExpense.priority}
                      onValueChange={(value: any) => setNewExpense({...newExpense, priority: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Baixa</SelectItem>
                        <SelectItem value="medium">Média</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isRecurring"
                    checked={newExpense.isRecurring}
                    onChange={(e) => setNewExpense({...newExpense, isRecurring: e.target.checked})}
                    className="rounded"
                  />
                  <Label htmlFor="isRecurring">Despesa Recorrente</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsExpenseDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateExpense}>
                  Criar Despesa
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isBudgetDialogOpen} onOpenChange={setIsBudgetDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Novo Orçamento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Orçamento</DialogTitle>
                <DialogDescription>
                  Defina um novo orçamento para acompanhar gastos
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="budgetName">Nome do Orçamento</Label>
                  <Input
                    id="budgetName"
                    value={newBudget.name}
                    onChange={(e) => setNewBudget({...newBudget, name: e.target.value})}
                    placeholder="Ex: Orçamento Mensal - Março"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="budgetCategory">Categoria</Label>
                    <Input
                      id="budgetCategory"
                      value={newBudget.category}
                      onChange={(e) => setNewBudget({...newBudget, category: e.target.value})}
                      placeholder="Ex: Geral, Equipamentos"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budgetAmount">Valor Total (R$)</Label>
                    <Input
                      id="budgetAmount"
                      type="number"
                      value={newBudget.totalAmount}
                      onChange={(e) => setNewBudget({...newBudget, totalAmount: parseFloat(e.target.value)})}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="period">Período</Label>
                    <Select
                      value={newBudget.period}
                      onValueChange={(value: any) => setNewBudget({...newBudget, period: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Mensal</SelectItem>
                        <SelectItem value="quarterly">Trimestral</SelectItem>
                        <SelectItem value="yearly">Anual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="startDate">Data Início</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newBudget.startDate}
                      onChange={(e) => setNewBudget({...newBudget, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">Data Fim</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newBudget.endDate}
                      onChange={(e) => setNewBudget({...newBudget, endDate: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsBudgetDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateBudget}>
                  Criar Orçamento
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Despesas
            </CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Orçamento Disponível
            </CardTitle>
            <Wallet className="h-4 w-4 text-green-600" />
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bolsas Disponíveis
            </CardTitle>
            <PiggyBank className="h-4 w-4 text-purple-600" />
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
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Despesas Recorrentes
            </CardTitle>
            <CreditCard className="h-4 w-4 text-orange-600" />
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

      {/* Tabs */}
      <Tabs defaultValue="expenses" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="expenses">Despesas</TabsTrigger>
          <TabsTrigger value="budgets">Orçamentos</TabsTrigger>
          <TabsTrigger value="scholarships">Bolsas</TabsTrigger>
        </TabsList>

        {/* Tab Despesas */}
        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Despesas</CardTitle>
              <CardDescription>
                Gerencie todas as suas despesas e custos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{expense.title}</div>
                          <div className="text-sm text-muted-foreground">{expense.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getCategoryColor(expense.category)}>
                          {getCategoryLabel(expense.category)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        R$ {expense.amount.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        {new Date(expense.date).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {expense.isPaid ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                          )}
                          <span className="text-sm">
                            {expense.isPaid ? 'Pago' : 'Pendente'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`text-sm font-medium ${getPriorityColor(expense.priority)}`}>
                          {expense.priority.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateExpense(expense.id, { isPaid: !expense.isPaid })}
                          >
                            {expense.isPaid ? 'Marcar Pendente' : 'Marcar Pago'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteExpense(expense.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Orçamentos */}
        <TabsContent value="budgets">
          <div className="space-y-4">
            {budgets.map((budget) => (
              <Card key={budget.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{budget.name}</CardTitle>
                      <CardDescription>{budget.category}</CardDescription>
                    </div>
                    <Badge variant={budget.isActive ? "default" : "secondary"}>
                      {budget.isActive ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        R$ {budget.spentAmount.toLocaleString('pt-BR')} / R$ {budget.totalAmount.toLocaleString('pt-BR')}
                      </span>
                      <span>
                        {Math.round((budget.spentAmount / budget.totalAmount) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(budget.spentAmount / budget.totalAmount) * 100} 
                      className="h-2"
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        {budget.period === 'monthly' ? 'Mensal' :
                         budget.period === 'quarterly' ? 'Trimestral' : 'Anual'}
                      </span>
                      <span>
                        {new Date(budget.startDate).toLocaleDateString('pt-BR')} - {new Date(budget.endDate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab Bolsas */}
        <TabsContent value="scholarships">
          <div className="space-y-4">
            {scholarships.map((scholarship) => (
              <Card key={scholarship.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{scholarship.name}</CardTitle>
                      <CardDescription>{scholarship.source}</CardDescription>
                    </div>
                    <Badge variant="outline" className={getStatusColor(scholarship.status)}>
                      {getStatusLabel(scholarship.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">
                        R$ {scholarship.amount.toLocaleString('pt-BR')}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Prazo: {new Date(scholarship.deadline).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{scholarship.description}</p>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Requisitos:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {scholarship.requirements.map((req, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex space-x-2">
                      {scholarship.status === 'available' && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateScholarship(scholarship.id, { status: 'applied' })}
                        >
                          Candidatar-se
                        </Button>
                      )}
                      {scholarship.status === 'applied' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateScholarship(scholarship.id, { status: 'available' })}
                        >
                          Cancelar Candidatura
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
