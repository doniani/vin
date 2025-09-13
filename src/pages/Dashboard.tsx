import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Trophy, 
  BookOpen, 
  Heart, 
  AlertTriangle, 
  Calendar,
  Target,
  Users
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  // Dados mockados para demonstração
  const stats = [
    {
      title: 'GPA Atual',
      value: '3.8',
      change: '+0.2',
      changeType: 'positive' as const,
      icon: BookOpen,
      description: 'Acima da média da NCAA'
    },
    {
      title: 'Velocidade 40yd',
      value: '4.6s',
      change: '-0.1s',
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: 'Melhor tempo da temporada'
    },
    {
      title: 'Treinos Concluídos',
      value: '24',
      change: '+3',
      changeType: 'positive' as const,
      icon: Trophy,
      description: 'Esta semana'
    },
    {
      title: 'Horas de Sono',
      value: '8.2h',
      change: '+0.5h',
      changeType: 'positive' as const,
      icon: Heart,
      description: 'Média dos últimos 7 dias'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Novo recorde pessoal em 40yd',
      description: '4.6s - Melhor tempo da temporada',
      time: '2 horas atrás',
      type: 'achievement'
    },
    {
      id: 2,
      title: 'Treino de força concluído',
      description: 'Peso morto: 315lbs x 3 reps',
      time: '4 horas atrás',
      type: 'workout'
    },
    {
      id: 3,
      title: 'Nota de Matemática atualizada',
      description: 'A+ em Cálculo Avançado',
      time: '1 dia atrás',
      type: 'academic'
    },
    {
      id: 4,
      title: 'Consulta médica agendada',
      description: 'Check-up físico - Próxima semana',
      time: '2 dias atrás',
      type: 'health'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Showcase de Futebol Americano',
      date: '15 de Março',
      location: 'São Paulo, SP',
      type: 'showcase'
    },
    {
      title: 'Teste SAT',
      date: '22 de Março',
      location: 'Centro de Testes',
      type: 'test'
    },
    {
      title: 'Camp de Verão - Universidade X',
      date: '5 de Julho',
      location: 'Campus Universitário',
      type: 'camp'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Acompanhe a evolução completa do seu atleta
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span className={`font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="ml-1">vs. período anterior</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Target className="h-5 w-5 mr-2" />
              Atividades Recentes
            </CardTitle>
            <CardDescription>
              Últimas atualizações e conquistas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'achievement' ? 'bg-green-500' :
                    activity.type === 'workout' ? 'bg-blue-500' :
                    activity.type === 'academic' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver todas as atividades
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Calendar className="h-5 w-5 mr-2" />
              Próximos Eventos
            </CardTitle>
            <CardDescription>
              Oportunidades e deadlines importantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {event.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {event.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {event.date}
                    </p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      event.type === 'showcase' ? 'bg-blue-100 text-blue-800' :
                      event.type === 'test' ? 'bg-red-100 text-red-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {event.type === 'showcase' ? 'Showcase' :
                       event.type === 'test' ? 'Teste' : 'Camp'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver calendário completo
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Users className="h-5 w-5 mr-2" />
              Ações Rápidas
            </CardTitle>
            <CardDescription>
              Acesso rápido às funcionalidades mais utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                <Trophy className="h-6 w-6" />
                <span>Registrar Treino</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <BookOpen className="h-6 w-6" />
                <span>Atualizar Notas</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Heart className="h-6 w-6" />
                <span>Registrar Saúde</span>
              </Button>
            </div>
          </CardContent>
        </Card>

      {/* Alerts */}
      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-800 dark:text-orange-200">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Alertas Importantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-orange-700 dark:text-orange-300">
              ⚠️ Faltam apenas 2 pontos no GPA para atender os requisitos da NCAA
            </p>
            <p className="text-sm text-orange-700 dark:text-orange-300">
              📅 Deadline para inscrição no SAT: 15 de Março
            </p>
            <p className="text-sm text-orange-700 dark:text-orange-300">
              🏥 Consulta médica agendada para próxima semana
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
