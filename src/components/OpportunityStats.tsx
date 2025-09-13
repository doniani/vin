import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  AlertCircle, 
  Star,
  MapPin
} from 'lucide-react';

interface Opportunity {
  id: string;
  title: string;
  date: string;
  type: 'recruitment' | 'showcase' | 'camp' | 'test' | 'deadline' | 'personal';
  priority: 'low' | 'medium' | 'high';
  location?: string;
  isCompleted: boolean;
  isImportant: boolean;
  cost?: number;
}

interface OpportunityStatsProps {
  opportunities: Opportunity[];
}

export const OpportunityStats: React.FC<OpportunityStatsProps> = ({ opportunities }) => {
  const getTypeStats = () => {
    const types = ['recruitment', 'showcase', 'camp', 'test', 'deadline', 'personal'];
    return types.map(type => {
      const count = opportunities.filter(opp => opp.type === type).length;
      const completed = opportunities.filter(opp => opp.type === type && opp.isCompleted).length;
      return {
        type,
        count,
        completed,
        percentage: count > 0 ? Math.round((completed / count) * 100) : 0
      };
    });
  };

  const getPriorityStats = () => {
    const priorities = ['high', 'medium', 'low'];
    return priorities.map(priority => {
      const count = opportunities.filter(opp => opp.priority === priority).length;
      const completed = opportunities.filter(opp => opp.priority === priority && opp.isCompleted).length;
      return {
        priority,
        count,
        completed,
        percentage: count > 0 ? Math.round((completed / count) * 100) : 0
      };
    });
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    const next30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    return opportunities
      .filter(opp => 
        !opp.isCompleted && 
        new Date(opp.date) >= today && 
        new Date(opp.date) <= next30Days
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  };

  const getOverdueEvents = () => {
    const today = new Date();
    return opportunities.filter(opp => 
      !opp.isCompleted && 
      new Date(opp.date) < today
    );
  };

  const getTotalCost = () => {
    return opportunities
      .filter(opp => opp.cost && opp.cost > 0)
      .reduce((total, opp) => total + (opp.cost || 0), 0);
  };

  const getImportantEvents = () => {
    return opportunities.filter(opp => opp.isImportant && !opp.isCompleted);
  };

  const typeStats = getTypeStats();
  const priorityStats = getPriorityStats();
  const upcomingEvents = getUpcomingEvents();
  const overdueEvents = getOverdueEvents();
  const totalCost = getTotalCost();
  const importantEvents = getImportantEvents();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'recruitment': return <Star className="h-4 w-4" />;
      case 'showcase': return <CalendarIcon className="h-4 w-4" />;
      case 'camp': return <MapPin className="h-4 w-4" />;
      case 'test': return <AlertCircle className="h-4 w-4" />;
      case 'deadline': return <Clock className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'recruitment': return 'bg-blue-100 text-blue-800';
      case 'showcase': return 'bg-green-100 text-green-800';
      case 'camp': return 'bg-purple-100 text-purple-800';
      case 'test': return 'bg-red-100 text-red-800';
      case 'deadline': return 'bg-orange-100 text-orange-800';
      case 'personal': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'recruitment': return 'Recrutamento';
      case 'showcase': return 'Showcase';
      case 'camp': return 'Camp';
      case 'test': return 'Teste';
      case 'deadline': return 'Prazo';
      case 'personal': return 'Pessoal';
      default: return 'Evento';
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Eventos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{opportunities.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {opportunities.filter(opp => !opp.isCompleted).length} pendentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Próximos 30 dias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{upcomingEvents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              eventos próximos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Atrasados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{overdueEvents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              eventos atrasados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Custo Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              R$ {totalCost.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              investimento total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas por Tipo */}
      <Card>
        <CardHeader>
          <CardTitle>Eventos por Tipo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {typeStats.map((stat) => (
              <div key={stat.type} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(stat.type)}`}>
                    {getTypeIcon(stat.type)}
                  </div>
                  <div>
                    <span className="text-sm font-medium">
                      {getTypeLabel(stat.type)}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {stat.completed} / {stat.count} concluídos
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${stat.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {stat.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas por Prioridade */}
      <Card>
        <CardHeader>
          <CardTitle>Eventos por Prioridade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {priorityStats.map((stat) => (
              <div key={stat.priority} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    stat.priority === 'high' ? 'bg-red-100 text-red-800' :
                    stat.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    <AlertCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <span className={`text-sm font-medium ${getPriorityColor(stat.priority)}`}>
                      {stat.priority === 'high' ? 'Alta' :
                       stat.priority === 'medium' ? 'Média' : 'Baixa'}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {stat.completed} / {stat.count} concluídos
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${stat.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {stat.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Próximos Eventos */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(event.type)}`}>
                      {getTypeIcon(event.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {event.isImportant && (
                      <Star className="h-4 w-4 text-yellow-500" />
                    )}
                    <Badge variant="outline" className={getTypeColor(event.type)}>
                      {getTypeLabel(event.type)}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Nenhum evento próximo nos próximos 30 dias
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Eventos Importantes */}
      <Card>
        <CardHeader>
          <CardTitle>Eventos Importantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {importantEvents.length > 0 ? (
              importantEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getTypeColor(event.type)}>
                    {getTypeLabel(event.type)}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                Nenhum evento marcado como importante
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
