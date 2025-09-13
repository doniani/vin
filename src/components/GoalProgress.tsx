import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, TrendingUp, Calendar, Award } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  category: 'academic' | 'athletic' | 'health' | 'personal';
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
}

interface GoalProgressProps {
  goals: Goal[];
}

export const GoalProgress: React.FC<GoalProgressProps> = ({ goals }) => {
  const activeGoals = goals.filter(goal => goal.status === 'active');
  const completedGoals = goals.filter(goal => goal.status === 'completed');
  
  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getCategoryStats = () => {
    const categories = ['academic', 'athletic', 'health', 'personal'];
    return categories.map(category => {
      const categoryGoals = activeGoals.filter(goal => goal.category === category);
      const avgProgress = categoryGoals.length > 0 
        ? categoryGoals.reduce((acc, goal) => 
            acc + calculateProgress(goal.currentValue, goal.targetValue), 0) / categoryGoals.length
        : 0;
      
      return {
        category,
        count: categoryGoals.length,
        avgProgress: Math.round(avgProgress)
      };
    });
  };

  const getUpcomingDeadlines = () => {
    const now = new Date();
    const upcoming = activeGoals
      .filter(goal => new Date(goal.deadline) > now)
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      .slice(0, 3);
    
    return upcoming;
  };

  const getPriorityStats = () => {
    const priorities = ['high', 'medium', 'low'];
    return priorities.map(priority => {
      const priorityGoals = activeGoals.filter(goal => goal.priority === priority);
      return {
        priority,
        count: priorityGoals.length,
        completed: priorityGoals.filter(goal => 
          calculateProgress(goal.currentValue, goal.targetValue) >= 100
        ).length
      };
    });
  };

  const categoryStats = getCategoryStats();
  const upcomingDeadlines = getUpcomingDeadlines();
  const priorityStats = getPriorityStats();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return <Award className="h-4 w-4" />;
      case 'athletic': return <Target className="h-4 w-4" />;
      case 'health': return <TrendingUp className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
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

  return (
    <div className="space-y-6">
      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Metas Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activeGoals.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {completedGoals.length} concluídas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Progresso Médio
            </CardTitle>
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
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Próximo Prazo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {upcomingDeadlines.length > 0 
                ? new Date(upcomingDeadlines[0].deadline)
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

      {/* Progresso por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryStats.map((stat) => (
              <div key={stat.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded ${getCategoryColor(stat.category)}`}>
                      {getCategoryIcon(stat.category)}
                    </div>
                    <span className="text-sm font-medium capitalize">
                      {stat.category === 'academic' ? 'Acadêmico' :
                       stat.category === 'athletic' ? 'Esportivo' :
                       stat.category === 'health' ? 'Saúde' : 'Pessoal'}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stat.count} metas • {stat.avgProgress}% médio
                  </span>
                </div>
                <Progress value={stat.avgProgress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Próximos Prazos */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos Prazos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingDeadlines.length > 0 ? (
              upcomingDeadlines.map((goal) => {
                const daysLeft = Math.ceil(
                  (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                );
                const progress = calculateProgress(goal.currentValue, goal.targetValue);
                
                return (
                  <div key={goal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{goal.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {goal.currentValue}{goal.unit} / {goal.targetValue}{goal.unit}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-20">
                        <Progress value={progress} className="h-2" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {daysLeft} dias
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {progress.toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Nenhuma meta com prazo próximo
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas por Prioridade */}
      <Card>
        <CardHeader>
          <CardTitle>Metas por Prioridade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {priorityStats.map((stat) => (
              <div key={stat.priority} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${getPriorityColor(stat.priority)}`}>
                    {stat.priority === 'high' ? 'Alta' :
                     stat.priority === 'medium' ? 'Média' : 'Baixa'}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    {stat.completed} / {stat.count} concluídas
                  </span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ 
                        width: stat.count > 0 ? `${(stat.completed / stat.count) * 100}%` : '0%' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
