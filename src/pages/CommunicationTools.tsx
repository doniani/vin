import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare, 
  Users, 
  Share2, 
  Video, 
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Reply
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  title: string;
  organization: string;
  email: string;
  phone?: string;
  location: string;
  type: 'recruiter' | 'coach' | 'university' | 'agent' | 'other';
  status: 'active' | 'inactive' | 'pending';
  lastContact: string;
  notes: string;
  isFavorite: boolean;
  avatar?: string;
}

interface Message {
  id: string;
  contactId: string;
  contactName: string;
  subject: string;
  content: string;
  type: 'email' | 'phone' | 'meeting' | 'other';
  status: 'sent' | 'received' | 'draft' | 'scheduled';
  sentAt: string;
  isRead: boolean;
  attachments?: string[];
}

interface HighlightReel {
  id: string;
  title: string;
  description: string;
  videos: string[];
  images: string[];
  stats: {
    views: number;
    likes: number;
    shares: number;
    comments: number;
  };
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProfileVisibility {
  isPublic: boolean;
  showContactInfo: boolean;
  showAcademicInfo: boolean;
  showAthleticInfo: boolean;
  showHealthInfo: boolean;
  showFinancialInfo: boolean;
  allowDirectContact: boolean;
  showInSearch: boolean;
  showInDirectory: boolean;
}

export const CommunicationTools: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'João Silva',
      title: 'Recrutador de Futebol Americano',
      organization: 'Universidade de Stanford',
      email: 'joao.silva@stanford.edu',
      phone: '+1 (555) 123-4567',
      location: 'Stanford, CA',
      type: 'recruiter',
      status: 'active',
      lastContact: '2024-02-15',
      notes: 'Interessado em quarterbacks. Muito receptivo.',
      isFavorite: true,
      avatar: ''
    },
    {
      id: '2',
      name: 'Maria Santos',
      title: 'Head Coach',
      organization: 'Universidade de Harvard',
      email: 'maria.santos@harvard.edu',
      phone: '+1 (555) 987-6543',
      location: 'Cambridge, MA',
      type: 'coach',
      status: 'active',
      lastContact: '2024-02-10',
      notes: 'Foco em atletas acadêmicos. GPA importante.',
      isFavorite: false,
      avatar: ''
    },
    {
      id: '3',
      name: 'Pedro Costa',
      title: 'Agente Esportivo',
      organization: 'Sports Management Group',
      email: 'pedro.costa@sportsmg.com',
      location: 'Los Angeles, CA',
      type: 'agent',
      status: 'pending',
      lastContact: '2024-01-20',
      notes: 'Especialista em NIL. Muitas conexões.',
      isFavorite: false,
      avatar: ''
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      contactId: '1',
      contactName: 'João Silva',
      subject: 'Interesse em Recrutamento',
      content: 'Olá! Gostaria de saber mais sobre o processo de recrutamento para quarterbacks na Stanford.',
      type: 'email',
      status: 'sent',
      sentAt: '2024-02-15T10:30:00Z',
      isRead: true
    },
    {
      id: '2',
      contactId: '2',
      contactName: 'Maria Santos',
      subject: 'Reunião Agendada',
      content: 'Confirmando nossa reunião para próxima terça-feira às 14h.',
      type: 'email',
      status: 'received',
      sentAt: '2024-02-10T14:00:00Z',
      isRead: false
    }
  ]);

  const [highlightReels] = useState<HighlightReel[]>([
    {
      id: '1',
      title: 'Melhores Jogadas - Temporada 2024',
      description: 'Compilação das melhores jogadas da temporada 2024',
      videos: ['video1.mp4', 'video2.mp4'],
      images: ['image1.jpg', 'image2.jpg'],
      stats: {
        views: 1250,
        likes: 89,
        shares: 23,
        comments: 15
      },
      isPublic: true,
      createdAt: '2024-02-01',
      updatedAt: '2024-02-15'
    },
    {
      id: '2',
      title: 'Treinos de Velocidade',
      description: 'Progresso nos treinos de velocidade e agilidade',
      videos: ['video3.mp4'],
      images: ['image3.jpg', 'image4.jpg'],
      stats: {
        views: 450,
        likes: 32,
        shares: 8,
        comments: 5
      },
      isPublic: false,
      createdAt: '2024-02-10',
      updatedAt: '2024-02-12'
    }
  ]);

  const [profileVisibility, setProfileVisibility] = useState<ProfileVisibility>({
    isPublic: true,
    showContactInfo: true,
    showAcademicInfo: true,
    showAthleticInfo: true,
    showHealthInfo: false,
    showFinancialInfo: false,
    allowDirectContact: true,
    showInSearch: true,
    showInDirectory: true
  });

  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

  const [newContact, setNewContact] = useState({
    name: '',
    title: '',
    organization: '',
    email: '',
    phone: '',
    location: '',
    type: 'recruiter' as const,
    notes: ''
  });

  const [newMessage, setNewMessage] = useState({
    contactId: '',
    subject: '',
    content: '',
    type: 'email' as const
  });



  const getTypeColor = (type: string) => {
    switch (type) {
      case 'recruiter': return 'bg-blue-100 text-blue-800';
      case 'coach': return 'bg-green-100 text-green-800';
      case 'university': return 'bg-purple-100 text-purple-800';
      case 'agent': return 'bg-orange-100 text-orange-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-muted text-muted-foreground';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'recruiter': return 'Recrutador';
      case 'coach': return 'Treinador';
      case 'university': return 'Universidade';
      case 'agent': return 'Agente';
      default: return 'Outro';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'pending': return 'Pendente';
      default: return 'Desconhecido';
    }
  };

  const handleCreateContact = () => {
    const contact: Contact = {
      id: Date.now().toString(),
      ...newContact,
      status: 'active',
      lastContact: new Date().toISOString().split('T')[0],
      isFavorite: false
    };
    setContacts([...contacts, contact]);
    setNewContact({
      name: '',
      title: '',
      organization: '',
      email: '',
      phone: '',
      location: '',
      type: 'recruiter',
      notes: ''
    });
    setIsContactDialogOpen(false);
  };

  const handleCreateMessage = () => {
    const message: Message = {
      id: Date.now().toString(),
      ...newMessage,
      contactName: contacts.find(c => c.id === newMessage.contactId)?.name || '',
      status: 'sent',
      sentAt: new Date().toISOString(),
      isRead: false
    };
    setMessages([...messages, message]);
    setNewMessage({
      contactId: '',
      subject: '',
      content: '',
      type: 'email'
    });
    setIsMessageDialogOpen(false);
  };


  const handleUpdateVisibility = (key: keyof ProfileVisibility, value: boolean) => {
    setProfileVisibility({
      ...profileVisibility,
      [key]: value
    });
  };

  const getTotalContacts = () => contacts.length;
  const getActiveContacts = () => contacts.filter(c => c.status === 'active').length;
  const getTotalMessages = () => messages.length;
  const getUnreadMessages = () => messages.filter(m => !m.isRead).length;
  const getTotalReels = () => highlightReels.length;
  const getPublicReels = () => highlightReels.filter(r => r.isPublic).length;
  const getTotalViews = () => highlightReels.reduce((sum, reel) => sum + reel.stats.views, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Comunicação & Visibilidade</h1>
          <p className="text-muted-foreground mt-2">
            Conecte-se com recrutadores e aumente sua visibilidade
          </p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Contato
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Contato</DialogTitle>
                <DialogDescription>
                  Adicione um novo contato à sua rede
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactName">Nome</Label>
                    <Input
                      id="contactName"
                      value={newContact.name}
                      onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                      placeholder="Nome completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactTitle">Cargo</Label>
                    <Input
                      id="contactTitle"
                      value={newContact.title}
                      onChange={(e) => setNewContact({...newContact, title: e.target.value})}
                      placeholder="Ex: Recrutador de Futebol Americano"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactOrganization">Organização</Label>
                    <Input
                      id="contactOrganization"
                      value={newContact.organization}
                      onChange={(e) => setNewContact({...newContact, organization: e.target.value})}
                      placeholder="Ex: Universidade de Stanford"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactType">Tipo</Label>
                    <Select
                      value={newContact.type}
                      onValueChange={(value: any) => setNewContact({...newContact, type: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recruiter">Recrutador</SelectItem>
                        <SelectItem value="coach">Treinador</SelectItem>
                        <SelectItem value="university">Universidade</SelectItem>
                        <SelectItem value="agent">Agente</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={newContact.email}
                      onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Telefone (opcional)</Label>
                    <Input
                      id="contactPhone"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contactLocation">Localização</Label>
                  <Input
                    id="contactLocation"
                    value={newContact.location}
                    onChange={(e) => setNewContact({...newContact, location: e.target.value})}
                    placeholder="Ex: Stanford, CA"
                  />
                </div>

                <div>
                  <Label htmlFor="contactNotes">Notas</Label>
                  <Textarea
                    id="contactNotes"
                    value={newContact.notes}
                    onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
                    placeholder="Informações adicionais sobre o contato"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsContactDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateContact}>
                  Adicionar Contato
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Nova Mensagem
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enviar Nova Mensagem</DialogTitle>
                <DialogDescription>
                  Envie uma mensagem para um contato
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="messageContact">Contato</Label>
                  <Select
                    value={newMessage.contactId}
                    onValueChange={(value) => setNewMessage({...newMessage, contactId: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um contato" />
                    </SelectTrigger>
                    <SelectContent>
                      {contacts.map(contact => (
                        <SelectItem key={contact.id} value={contact.id}>
                          {contact.name} - {contact.organization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="messageSubject">Assunto</Label>
                  <Input
                    id="messageSubject"
                    value={newMessage.subject}
                    onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                    placeholder="Assunto da mensagem"
                  />
                </div>

                <div>
                  <Label htmlFor="messageContent">Mensagem</Label>
                  <Textarea
                    id="messageContent"
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                    placeholder="Digite sua mensagem aqui"
                    rows={6}
                  />
                </div>

                <div>
                  <Label htmlFor="messageType">Tipo</Label>
                  <Select
                    value={newMessage.type}
                    onValueChange={(value: any) => setNewMessage({...newMessage, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Telefone</SelectItem>
                      <SelectItem value="meeting">Reunião</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateMessage}>
                  Enviar Mensagem
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
              Total de Contatos
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{getTotalContacts()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {getActiveContacts()} ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Mensagens
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{getTotalMessages()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {getUnreadMessages()} não lidas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Highlight Reels
            </CardTitle>
            <Video className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{getTotalReels()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {getPublicReels()} públicos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Visualizações
            </CardTitle>
            <Eye className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{getTotalViews().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              total de views
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="contacts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contacts">Contatos</TabsTrigger>
          <TabsTrigger value="messages">Mensagens</TabsTrigger>
          <TabsTrigger value="reels">Highlight Reels</TabsTrigger>
          <TabsTrigger value="visibility">Visibilidade</TabsTrigger>
        </TabsList>

        {/* Tab Contatos */}
        <TabsContent value="contacts">
          <Card>
            <CardHeader>
              <CardTitle>Rede de Contatos</CardTitle>
              <CardDescription>
                Gerencie sua rede de contatos profissionais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contato</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Organização</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Último Contato</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={contact.avatar} />
                            <AvatarFallback>
                              {contact.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-muted-foreground">{contact.title}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getTypeColor(contact.type)}>
                          {getTypeLabel(contact.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{contact.organization}</div>
                        <div className="text-xs text-muted-foreground">{contact.location}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(contact.status)}>
                          {getStatusLabel(contact.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(contact.lastContact).toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
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

        {/* Tab Mensagens */}
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Mensagens</CardTitle>
              <CardDescription>
                Histórico de comunicação com contatos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{message.subject}</h4>
                          <Badge variant="outline" className={getStatusColor(message.status)}>
                            {message.status === 'sent' ? 'Enviada' : 
                             message.status === 'received' ? 'Recebida' : 
                             message.status === 'draft' ? 'Rascunho' : 'Agendada'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{message.contactName}</p>
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>{new Date(message.sentAt).toLocaleDateString('pt-BR')}</span>
                          <span>{message.type === 'email' ? 'Email' : 
                                 message.type === 'phone' ? 'Telefone' : 
                                 message.type === 'meeting' ? 'Reunião' : 'Outro'}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!message.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                        <Button size="sm" variant="outline">
                          <Reply className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Highlight Reels */}
        <TabsContent value="reels">
          <div className="space-y-4">
            {highlightReels.map((reel) => (
              <Card key={reel.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{reel.title}</CardTitle>
                      <CardDescription>{reel.description}</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={reel.isPublic ? 'bg-green-100 text-green-800' : 'bg-muted text-muted-foreground'}>
                        {reel.isPublic ? 'Público' : 'Privado'}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{reel.stats.views}</div>
                        <div className="text-xs text-muted-foreground">Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{reel.stats.likes}</div>
                        <div className="text-xs text-muted-foreground">Likes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{reel.stats.shares}</div>
                        <div className="text-xs text-muted-foreground">Shares</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{reel.stats.comments}</div>
                        <div className="text-xs text-muted-foreground">Comentários</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Criado em {new Date(reel.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4 mr-1" />
                          Compartilhar
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab Visibilidade */}
        <TabsContent value="visibility">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Visibilidade</CardTitle>
              <CardDescription>
                Controle o que é visível no seu perfil público
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Perfil Público</h4>
                      <p className="text-sm text-muted-foreground">Tornar perfil visível publicamente</p>
                    </div>
                    <Switch
                      checked={profileVisibility.isPublic}
                      onCheckedChange={(checked) => handleUpdateVisibility('isPublic', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Informações de Contato</h4>
                      <p className="text-sm text-muted-foreground">Mostrar informações de contato</p>
                    </div>
                    <Switch
                      checked={profileVisibility.showContactInfo}
                      onCheckedChange={(checked) => handleUpdateVisibility('showContactInfo', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Informações Acadêmicas</h4>
                      <p className="text-sm text-muted-foreground">Mostrar dados acadêmicos</p>
                    </div>
                    <Switch
                      checked={profileVisibility.showAcademicInfo}
                      onCheckedChange={(checked) => handleUpdateVisibility('showAcademicInfo', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Informações Esportivas</h4>
                      <p className="text-sm text-muted-foreground">Mostrar dados esportivos</p>
                    </div>
                    <Switch
                      checked={profileVisibility.showAthleticInfo}
                      onCheckedChange={(checked) => handleUpdateVisibility('showAthleticInfo', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Informações de Saúde</h4>
                      <p className="text-sm text-muted-foreground">Mostrar dados de saúde</p>
                    </div>
                    <Switch
                      checked={profileVisibility.showHealthInfo}
                      onCheckedChange={(checked) => handleUpdateVisibility('showHealthInfo', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Informações Financeiras</h4>
                      <p className="text-sm text-muted-foreground">Mostrar dados financeiros</p>
                    </div>
                    <Switch
                      checked={profileVisibility.showFinancialInfo}
                      onCheckedChange={(checked) => handleUpdateVisibility('showFinancialInfo', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Contato Direto</h4>
                      <p className="text-sm text-muted-foreground">Permitir contato direto</p>
                    </div>
                    <Switch
                      checked={profileVisibility.allowDirectContact}
                      onCheckedChange={(checked) => handleUpdateVisibility('allowDirectContact', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Aparecer em Buscas</h4>
                      <p className="text-sm text-muted-foreground">Incluir em resultados de busca</p>
                    </div>
                    <Switch
                      checked={profileVisibility.showInSearch}
                      onCheckedChange={(checked) => handleUpdateVisibility('showInSearch', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Aparecer no Diretório</h4>
                      <p className="text-sm text-muted-foreground">Incluir no diretório público</p>
                    </div>
                    <Switch
                      checked={profileVisibility.showInDirectory}
                      onCheckedChange={(checked) => handleUpdateVisibility('showInDirectory', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
