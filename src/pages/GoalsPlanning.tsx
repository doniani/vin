import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Calendar,
  TrendingUp,
  Activity,
  Brain,
  Heart,
  Trophy,
  X
} from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'academic' | 'athletic' | 'health' | 'personal';
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  duration: number; // em semanas
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
  isActive: boolean;
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number; // em minutos
  completed: boolean;
}

export const GoalsPlanning: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Melhorar Velocidade 40yd',
      description: 'Reduzir tempo de 40yd para 4.2s ou menos',
      category: 'athletic',
      targetValue: 4.2,
      currentValue: 4.3,
      unit: 's',
      deadline: '2024-08-15',
      status: 'active',
      priority: 'high',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Aumentar GPA',
      description: 'Manter GPA acima de 3.5 para elegibilidade NCAA',
      category: 'academic',
      targetValue: 3.5,
      currentValue: 3.8,
      unit: '',
      deadline: '2024-12-31',
      status: 'active',
      priority: 'high',
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      title: 'Melhorar Qualidade do Sono',
      description: 'Dormir pelo menos 8 horas por noite',
      category: 'health',
      targetValue: 8,
      currentValue: 7.5,
      unit: 'h',
      deadline: '2024-06-30',
      status: 'active',
      priority: 'medium',
      createdAt: '2024-02-01'
    }
  ]);

  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([
    {
      id: '1',
      name: 'Plano de Velocidade',
      description: 'Foco em explosão e velocidade para 40yd',
      duration: 8,
      difficulty: 'intermediate',
      isActive: true,
      exercises: [
        { id: '1', name: 'Sprint 40yd', sets: 5, reps: 1, completed: false },
        { id: '2', name: 'Agachamento', sets: 3, reps: 12, weight: 60, completed: true },
        { id: '3', name: 'Prancha', sets: 3, reps: 1, duration: 60, completed: false }
      ]
    },
    {
      id: '2',
      name: 'Plano de Força',
      description: 'Desenvolvimento de força geral',
      duration: 12,
      difficulty: 'advanced',
      isActive: false,
      exercises: [
        { id: '1', name: 'Supino', sets: 4, reps: 8, weight: 80, completed: false },
        { id: '2', name: 'Levantamento Terra', sets: 3, reps: 5, weight: 100, completed: false },
        { id: '3', name: 'Flexões', sets: 3, reps: 15, completed: true }
      ]
    }
  ]);

  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [isWorkoutDialogOpen, setIsWorkoutDialogOpen] = useState(false);

  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'athletic' as const,
    targetValue: 0,
    currentValue: 0,
    unit: '',
    deadline: '',
    priority: 'medium' as const
  });

  const [newWorkout, setNewWorkout] = useState({
    name: '',
    description: '',
    duration: 4,
    difficulty: 'intermediate' as const
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return <Brain className="h-4 w-4" />;
      case 'athletic': return <Trophy className="h-4 w-4" />;
      case 'health': return <Heart className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'text-blue-600 bg-blue-100';
      case 'athletic': return 'text-green-600 bg-green-100';
      case 'health': return 'text-red-600 bg-red-100';
      default: return 'text-muted-foreground bg-gray-100';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'active': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'paused': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'cancelled': return <X className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const handleCreateGoal = () => {
    const goal: Goal = {
      id: Date.now().toString(),
      ...newGoal,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setGoals([...goals, goal]);
    setNewGoal({
      title: '',
      description: '',
      category: 'athletic',
      targetValue: 0,
      currentValue: 0,
      unit: '',
      deadline: '',
      priority: 'medium'
    });
    setIsGoalDialogOpen(false);
  };


  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const handleCreateWorkout = () => {
    const workout: WorkoutPlan = {
      id: Date.now().toString(),
      ...newWorkout,
      isActive: false,
      exercises: []
    };
    setWorkoutPlans([...workoutPlans, workout]);
    setNewWorkout({
      name: '',
      description: '',
      duration: 4,
      difficulty: 'intermediate'
    });
    setIsWorkoutDialogOpen(false);
  };

  const handleToggleExercise = (workoutId: string, exerciseId: string) => {
    setWorkoutPlans(workoutPlans.map(workout => 
      workout.id === workoutId 
        ? {
            ...workout,
            exercises: workout.exercises.map(exercise =>
              exercise.id === exerciseId 
                ? { ...exercise, completed: !exercise.completed }
                : exercise
            )
          }
        : workout
    ));
  };

  const activeGoals = goals.filter(goal => goal.status === 'active');
  const completedGoals = goals.filter(goal => goal.status === 'completed');
  const activeWorkouts = workoutPlans.filter(workout => workout.isActive);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Metas e Planos de Treino</h1>
          <p className="text-muted-foreground mt-2">
            Defina objetivos e acompanhe seu progresso
          </p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isGoalDialogOpen} onOpenChange={setIsGoalDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Meta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Meta</DialogTitle>
                <DialogDescription>
                  Defina um novo objetivo para acompanhar seu progresso
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Título da Meta</Label>
                  <Input
                    id="title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    placeholder="Ex: Melhorar velocidade 40yd"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                    placeholder="Descreva sua meta em detalhes"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={newGoal.category}
                      onValueChange={(value: any) => setNewGoal({...newGoal, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Acadêmico</SelectItem>
                        <SelectItem value="athletic">Esportivo</SelectItem>
                        <SelectItem value="health">Saúde</SelectItem>
                        <SelectItem value="personal">Pessoal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Prioridade</Label>
                    <Select
                      value={newGoal.priority}
                      onValueChange={(value: any) => setNewGoal({...newGoal, priority: value})}
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
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="currentValue">Valor Atual</Label>
                    <Input
                      id="currentValue"
                      type="number"
                      value={newGoal.currentValue}
                      onChange={(e) => setNewGoal({...newGoal, currentValue: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetValue">Valor Meta</Label>
                    <Input
                      id="targetValue"
                      type="number"
                      value={newGoal.targetValue}
                      onChange={(e) => setNewGoal({...newGoal, targetValue: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unidade</Label>
                    <Input
                      id="unit"
                      value={newGoal.unit}
                      onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                      placeholder="s, kg, h, etc"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="deadline">Prazo</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsGoalDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateGoal}>
                  Criar Meta
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isWorkoutDialogOpen} onOpenChange={setIsWorkoutDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Novo Plano
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Plano de Treino</DialogTitle>
                <DialogDescription>
                  Crie um plano de treino personalizado
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="workoutName">Nome do Plano</Label>
                  <Input
                    id="workoutName"
                    value={newWorkout.name}
                    onChange={(e) => setNewWorkout({...newWorkout, name: e.target.value})}
                    placeholder="Ex: Plano de Velocidade"
                  />
                </div>
                <div>
                  <Label htmlFor="workoutDescription">Descrição</Label>
                  <Textarea
                    id="workoutDescription"
                    value={newWorkout.description}
                    onChange={(e) => setNewWorkout({...newWorkout, description: e.target.value})}
                    placeholder="Descreva o plano de treino"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duração (semanas)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newWorkout.duration}
                      onChange={(e) => setNewWorkout({...newWorkout, duration: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="difficulty">Dificuldade</Label>
                    <Select
                      value={newWorkout.difficulty}
                      onValueChange={(value: any) => setNewWorkout({...newWorkout, difficulty: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Iniciante</SelectItem>
                        <SelectItem value="intermediate">Intermediário</SelectItem>
                        <SelectItem value="advanced">Avançado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsWorkoutDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateWorkout}>
                  Criar Plano
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Metas Ativas
            </CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activeGoals.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {completedGoals.length} concluídas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Planos Ativos
            </CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activeWorkouts.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {workoutPlans.length} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Progresso Médio
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {activeGoals.length > 0 
                ? Math.round(activeGoals.reduce((acc, goal) => 
                    acc + calculateProgress(goal.currentValue, goal.targetValue), 0) / activeGoals.length
                  )
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              das metas ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Próximo Prazo
            </CardTitle>
            <Calendar className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {activeGoals.length > 0 
                ? new Date(Math.min(...activeGoals.map(goal => new Date(goal.deadline).getTime())))
                    .toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
                : 'N/A'
              }
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              meta mais próxima
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="goals" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="goals">Metas</TabsTrigger>
          <TabsTrigger value="workouts">Planos de Treino</TabsTrigger>
        </TabsList>

        {/* Tab Metas */}
        <TabsContent value="goals">
          <div className="space-y-4">
            {activeGoals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(goal.category)}`}>
                        {getCategoryIcon(goal.category)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <CardDescription>{goal.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${getPriorityColor(goal.priority)}`}>
                        {goal.priority.toUpperCase()}
                      </span>
                      {getStatusIcon(goal.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        {goal.currentValue}{goal.unit} / {goal.targetValue}{goal.unit}
                      </span>
                      <span>
                        {calculateProgress(goal.currentValue, goal.targetValue).toFixed(0)}%
                      </span>
                    </div>
                    <Progress 
                      value={calculateProgress(goal.currentValue, goal.targetValue)} 
                      className="h-2"
                    />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Prazo: {new Date(goal.deadline).toLocaleDateString('pt-BR')}</span>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteGoal(goal.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab Planos de Treino */}
        <TabsContent value="workouts">
          <div className="space-y-4">
            {workoutPlans.map((workout) => (
              <Card key={workout.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{workout.name}</CardTitle>
                      <CardDescription>{workout.description}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        workout.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                        workout.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {workout.difficulty.toUpperCase()}
                      </span>
                      <Checkbox
                        checked={workout.isActive}
                        onCheckedChange={(checked) => 
                          setWorkoutPlans(workoutPlans.map(w => 
                            w.id === workout.id ? { ...w, isActive: !!checked } : w
                          ))
                        }
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Duração: {workout.duration} semanas</span>
                      <span>
                        {workout.exercises.filter(ex => ex.completed).length} / {workout.exercises.length} exercícios
                      </span>
                    </div>
                    
                    {workout.exercises.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Exercícios:</h4>
                        {workout.exercises.map((exercise) => (
                          <div key={exercise.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                            <Checkbox
                              checked={exercise.completed}
                              onCheckedChange={() => handleToggleExercise(workout.id, exercise.id)}
                            />
                            <div className="flex-1">
                              <span className="text-sm font-medium">{exercise.name}</span>
                              <span className="text-xs text-muted-foreground ml-2">
                                {exercise.sets} séries x {exercise.reps} reps
                                {exercise.weight && ` @ ${exercise.weight}kg`}
                                {exercise.duration && ` (${exercise.duration}min)`}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
