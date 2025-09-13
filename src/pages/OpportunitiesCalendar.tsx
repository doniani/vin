import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/Calendar';
import { 
  Calendar as CalendarIcon,
  Plus, 
  MapPin, 
  Clock,
  AlertCircle,
  CheckCircle,
  Star,
  Filter,
  Search
} from 'lucide-react';

interface Opportunity {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'recruitment' | 'showcase' | 'camp' | 'test' | 'deadline' | 'personal';
  priority: 'low' | 'medium' | 'high';
  location?: string;
  cost?: number;
  requirements: string[];
  isCompleted: boolean;
  isImportant: boolean;
  createdAt: string;
}

export const OpportunitiesCalendar: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: '1',
      title: 'Showcase de Futebol Americano',
      description: 'Evento de demonstração para recrutadores universitários',
      date: '2024-03-15',
      type: 'showcase',
      priority: 'high',
      location: 'São Paulo, SP',
      cost: 150,
      requirements: ['GPA mínimo 3.0', 'Teste físico obrigatório'],
      isCompleted: false,
      isImportant: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Teste SAT',
      description: 'Exame padronizado para admissão universitária',
      date: '2024-03-22',
      type: 'test',
      priority: 'high',
      location: 'Centro de Testes - SP',
      cost: 100,
      requirements: ['Inscrição prévia', 'Documento de identidade'],
      isCompleted: false,
      isImportant: true,
      createdAt: '2024-01-20'
    },
    {
      id: '3',
      title: 'Camp de Verão - Universidade X',
      description: 'Programa de desenvolvimento atlético e acadêmico',
      date: '2024-07-05',
      type: 'camp',
      priority: 'medium',
      location: 'Campus Universitário',
      cost: 500,
      requirements: ['Aplicação online', 'Vídeo de demonstração'],
      isCompleted: false,
      isImportant: false,
      createdAt: '2024-02-01'
    },
    {
      id: '4',
      title: 'Deadline Aplicação NCAA',
      description: 'Prazo final para envio de documentos para elegibilidade',
      date: '2024-04-30',
      type: 'deadline',
      priority: 'high',
      requirements: ['Documentos acadêmicos', 'Histórico esportivo'],
      isCompleted: false,
      isImportant: true,
      createdAt: '2024-01-10'
    },
    {
      id: '5',
      title: 'Consulta Médica',
      description: 'Check-up físico obrigatório para temporada',
      date: '2024-03-10',
      type: 'personal',
      priority: 'medium',
      location: 'Clínica Médica',
      cost: 80,
      requirements: ['Agendamento prévio'],
      isCompleted: true,
      isImportant: false,
      createdAt: '2024-02-15'
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState<Opportunity | null>(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    type: 'personal' as const,
    priority: 'medium' as const,
    location: '',
    cost: 0,
    requirements: [] as string[],
    isImportant: false
  });


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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-muted-foreground';
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


  const upcomingOpportunities = opportunities
    .filter(opp => !opp.isCompleted && new Date(opp.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const handleCreateEvent = () => {
    const event: Opportunity = {
      id: Date.now().toString(),
      ...newEvent,
      isCompleted: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setOpportunities([...opportunities, event]);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      type: 'personal',
      priority: 'medium',
      location: '',
      cost: 0,
      requirements: [],
      isImportant: false
    });
    setIsEventDialogOpen(false);
  };

  const handleUpdateEvent = (eventId: string, updates: Partial<Opportunity>) => {
    setOpportunities(opportunities.map(event => 
      event.id === eventId ? { ...event, ...updates } : event
    ));
  };


  const handleEventClick = (event: any) => {
    // Find the original opportunity from the events array
    const originalEvent = opportunities.find(opp => opp.id === event.id);
    if (originalEvent) {
      setSelectedEvent(originalEvent);
      setIsEditing(true);
      setIsEventDialogOpen(true);
    }
  };

  const handleDateClick = (date: string) => {
    setNewEvent(prev => ({ ...prev, date }));
    setIsEditing(false);
    setIsEventDialogOpen(true);
  };

  const handleAddEvent = (date: string) => {
    setNewEvent(prev => ({ ...prev, date }));
    setIsEditing(false);
    setIsEventDialogOpen(true);
  };

  const getUpcomingCount = () => {
    const today = new Date();
    return opportunities.filter(opp => 
      !opp.isCompleted && 
      new Date(opp.date) >= today &&
      new Date(opp.date) <= new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
    ).length;
  };

  const getOverdueCount = () => {
    const today = new Date();
    return opportunities.filter(opp => 
      !opp.isCompleted && 
      new Date(opp.date) < today
    ).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calendário de Oportunidades</h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe eventos, deadlines e oportunidades importantes
          </p>
        </div>
        <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {isEditing ? 'Editar Evento' : 'Criar Novo Evento'}
              </DialogTitle>
              <DialogDescription>
                {isEditing ? 'Atualize as informações do evento' : 'Adicione um novo evento ao calendário'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={isEditing ? selectedEvent?.title || '' : newEvent.title}
                    onChange={(e) => {
                      if (isEditing && selectedEvent) {
                        setSelectedEvent({...selectedEvent, title: e.target.value});
                      } else {
                        setNewEvent({...newEvent, title: e.target.value});
                      }
                    }}
                    placeholder="Nome do evento"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={isEditing ? selectedEvent?.date || '' : newEvent.date}
                    onChange={(e) => {
                      if (isEditing && selectedEvent) {
                        setSelectedEvent({...selectedEvent, date: e.target.value});
                      } else {
                        setNewEvent({...newEvent, date: e.target.value});
                      }
                    }}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={isEditing ? selectedEvent?.description || '' : newEvent.description}
                  onChange={(e) => {
                    if (isEditing && selectedEvent) {
                      setSelectedEvent({...selectedEvent, description: e.target.value});
                    } else {
                      setNewEvent({...newEvent, description: e.target.value});
                    }
                  }}
                  placeholder="Descrição do evento"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="type">Tipo</Label>
                  <Select
                    value={isEditing ? selectedEvent?.type || 'personal' : newEvent.type}
                    onValueChange={(value: any) => {
                      if (isEditing && selectedEvent) {
                        setSelectedEvent({...selectedEvent, type: value});
                      } else {
                        setNewEvent({...newEvent, type: value});
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recruitment">Recrutamento</SelectItem>
                      <SelectItem value="showcase">Showcase</SelectItem>
                      <SelectItem value="camp">Camp</SelectItem>
                      <SelectItem value="test">Teste</SelectItem>
                      <SelectItem value="deadline">Prazo</SelectItem>
                      <SelectItem value="personal">Pessoal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select
                    value={isEditing ? selectedEvent?.priority || 'medium' : newEvent.priority}
                    onValueChange={(value: any) => {
                      if (isEditing && selectedEvent) {
                        setSelectedEvent({...selectedEvent, priority: value});
                      } else {
                        setNewEvent({...newEvent, priority: value});
                      }
                    }}
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
                <div>
                  <Label htmlFor="location">Local</Label>
                  <Input
                    id="location"
                    value={isEditing ? selectedEvent?.location || '' : newEvent.location}
                    onChange={(e) => {
                      if (isEditing && selectedEvent) {
                        setSelectedEvent({...selectedEvent, location: e.target.value});
                      } else {
                        setNewEvent({...newEvent, location: e.target.value});
                      }
                    }}
                    placeholder="Local do evento"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cost">Custo (R$)</Label>
                  <Input
                    id="cost"
                    type="number"
                    value={isEditing ? selectedEvent?.cost || 0 : newEvent.cost}
                    onChange={(e) => {
                      if (isEditing && selectedEvent) {
                        setSelectedEvent({...selectedEvent, cost: parseFloat(e.target.value)});
                      } else {
                        setNewEvent({...newEvent, cost: parseFloat(e.target.value)});
                      }
                    }}
                    placeholder="0"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="isImportant"
                    checked={isEditing ? selectedEvent?.isImportant || false : newEvent.isImportant}
                    onChange={(e) => {
                      if (isEditing && selectedEvent) {
                        setSelectedEvent({...selectedEvent, isImportant: e.target.checked});
                      } else {
                        setNewEvent({...newEvent, isImportant: e.target.checked});
                      }
                    }}
                    className="rounded"
                  />
                  <Label htmlFor="isImportant">Evento Importante</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEventDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                if (isEditing && selectedEvent) {
                  handleUpdateEvent(selectedEvent.id, selectedEvent);
                  setIsEventDialogOpen(false);
                } else {
                  handleCreateEvent();
                }
              }}>
                {isEditing ? 'Salvar' : 'Criar'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Eventos
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{opportunities.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {opportunities.filter(opp => !opp.isCompleted).length} pendentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Próximos 30 dias
            </CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{getUpcomingCount()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              eventos próximos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Atrasados
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{getOverdueCount()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              eventos atrasados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Concluídos
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {opportunities.filter(opp => opp.isCompleted).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              eventos finalizados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="search">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="min-w-[150px]">
              <Label htmlFor="typeFilter">Tipo</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="recruitment">Recrutamento</SelectItem>
                  <SelectItem value="showcase">Showcase</SelectItem>
                  <SelectItem value="camp">Camp</SelectItem>
                  <SelectItem value="test">Teste</SelectItem>
                  <SelectItem value="deadline">Prazo</SelectItem>
                  <SelectItem value="personal">Pessoal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="min-w-[150px]">
              <Label htmlFor="priorityFilter">Prioridade</Label>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="low">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar and List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Calendar
            events={opportunities}
            onEventClick={handleEventClick}
            onDateClick={handleDateClick}
            onAddEvent={handleAddEvent}
          />
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Eventos</CardTitle>
              <CardDescription>
                Eventos mais próximos do calendário
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingOpportunities.map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => handleEventClick(opportunity)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline" className={getTypeColor(opportunity.type)}>
                            {getTypeLabel(opportunity.type)}
                          </Badge>
                          {opportunity.isImportant && (
                            <Star className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                        <h4 className="font-medium text-sm">{opportunity.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(opportunity.date).toLocaleDateString('pt-BR')}
                        </p>
                        {opportunity.location && (
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {opportunity.location}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className={`text-xs font-medium ${getPriorityColor(opportunity.priority)}`}>
                          {opportunity.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setFilterType('deadline')}
              >
                <Clock className="h-4 w-4 mr-2" />
                Ver Prazos
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setFilterType('recruitment')}
              >
                <Star className="h-4 w-4 mr-2" />
                Ver Recrutamentos
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setFilterPriority('high')}
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Ver Prioridade Alta
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
