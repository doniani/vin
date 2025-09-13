import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Info,
  Plus,
  Trash2,
  BookOpen,
  Trophy,
  Users,
  Calendar,
  FileText,
  Award,
  Clock,
  AlertCircle
} from 'lucide-react';

interface ComplianceRule {
  id: string;
  title: string;
  description: string;
  organization: 'NCAA' | 'NAIA' | 'NJCAA' | 'NIL' | 'General';
  category: 'academic' | 'athletic' | 'eligibility' | 'recruitment' | 'financial' | 'behavioral';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'compliant' | 'non-compliant' | 'warning' | 'pending';
  requirements: string[];
  deadline?: string;
  isActive: boolean;
  createdAt: string;
}

interface EligibilityCheck {
  id: string;
  name: string;
  description: string;
  organization: string;
  requirements: EligibilityRequirement[];
  status: 'eligible' | 'ineligible' | 'pending' | 'warning';
  lastChecked: string;
  nextCheck: string;
}

interface EligibilityRequirement {
  id: string;
  name: string;
  description: string;
  isMet: boolean;
  value?: string;
  targetValue?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface NILInfo {
  id: string;
  title: string;
  description: string;
  state: string;
  rules: string[];
  restrictions: string[];
  opportunities: string[];
  lastUpdated: string;
}

export const ComplianceMonitoring: React.FC = () => {
  const [rules, setRules] = useState<ComplianceRule[]>([
    {
      id: '1',
      title: 'GPA Mínimo para Elegibilidade',
      description: 'Manter GPA mínimo de 2.3 para elegibilidade NCAA',
      organization: 'NCAA',
      category: 'academic',
      priority: 'critical',
      status: 'compliant',
      requirements: ['GPA mínimo 2.3', '16 créditos core', 'Progresso acadêmico'],
      deadline: '2024-12-31',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      title: 'Teste SAT/ACT Obrigatório',
      description: 'Pontuação mínima no SAT (1000) ou ACT (21)',
      organization: 'NCAA',
      category: 'academic',
      priority: 'high',
      status: 'warning',
      requirements: ['SAT 1000+ ou ACT 21+', 'Teste válido por 5 anos'],
      deadline: '2024-06-30',
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      title: 'Regras de Recrutamento',
      description: 'Cumprir janelas de contato permitidas',
      organization: 'NCAA',
      category: 'recruitment',
      priority: 'high',
      status: 'compliant',
      requirements: ['Respeitar janelas de contato', 'Não aceitar benefícios indevidos'],
      isActive: true,
      createdAt: '2024-01-01'
    },
    {
      id: '4',
      title: 'Regras NIL - Califórnia',
      description: 'Direitos de Name, Image, Likeness no estado da Califórnia',
      organization: 'NIL',
      category: 'financial',
      priority: 'medium',
      status: 'pending',
      requirements: ['Contrato com agente licenciado', 'Aprovação da universidade'],
      isActive: true,
      createdAt: '2024-01-01'
    }
  ]);

  const [eligibilityChecks, setEligibilityChecks] = useState<EligibilityCheck[]>([
    {
      id: '1',
      name: 'Elegibilidade NCAA Div I',
      description: 'Verificação completa de elegibilidade para NCAA Division I',
      organization: 'NCAA',
      status: 'eligible',
      lastChecked: '2024-02-15',
      nextCheck: '2024-03-15',
      requirements: [
        {
          id: '1',
          name: 'GPA Mínimo',
          description: 'GPA de 2.3 ou superior',
          isMet: true,
          value: '3.2',
          targetValue: '2.3',
          priority: 'critical'
        },
        {
          id: '2',
          name: 'Teste SAT',
          description: 'Pontuação SAT de 1000 ou superior',
          isMet: false,
          value: '950',
          targetValue: '1000',
          priority: 'high'
        },
        {
          id: '3',
          name: 'Créditos Core',
          description: '16 créditos em disciplinas core',
          isMet: true,
          value: '18',
          targetValue: '16',
          priority: 'high'
        }
      ]
    },
    {
      id: '2',
      name: 'Elegibilidade NAIA',
      description: 'Verificação de elegibilidade para NAIA',
      organization: 'NAIA',
      status: 'warning',
      lastChecked: '2024-02-10',
      nextCheck: '2024-03-10',
      requirements: [
        {
          id: '1',
          name: 'GPA Mínimo',
          description: 'GPA de 2.0 ou superior',
          isMet: true,
          value: '3.2',
          targetValue: '2.0',
          priority: 'critical'
        },
        {
          id: '2',
          name: 'Teste ACT',
          description: 'Pontuação ACT de 18 ou superior',
          isMet: true,
          value: '22',
          targetValue: '18',
          priority: 'high'
        }
      ]
    }
  ]);

  const [nilInfo] = useState<NILInfo[]>([
    {
      id: '1',
      title: 'NIL - Califórnia',
      description: 'Regulamentação de Name, Image, Likeness no estado da Califórnia',
      state: 'Califórnia',
      rules: [
        'Atletas podem monetizar sua imagem',
        'Contratos devem ser aprovados pela universidade',
        'Agentes devem ser licenciados',
        'Não pode usar símbolos da universidade'
      ],
      restrictions: [
        'Não pode promover álcool ou tabaco',
        'Não pode usar uniforme da universidade',
        'Deve cumprir horários acadêmicos',
        'Não pode afetar elegibilidade esportiva'
      ],
      opportunities: [
        'Endorsements de marcas',
        'Aparências em eventos',
        'Redes sociais patrocinadas',
        'Criação de conteúdo'
      ],
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      title: 'NIL - Texas',
      description: 'Regulamentação de Name, Image, Likeness no estado do Texas',
      state: 'Texas',
      rules: [
        'Atletas podem assinar contratos NIL',
        'Universidade deve ser notificada',
        'Agentes devem ser registrados',
        'Contratos não podem exceder valor justo'
      ],
      restrictions: [
        'Não pode promover substâncias controladas',
        'Deve manter elegibilidade acadêmica',
        'Não pode usar propriedade intelectual da universidade',
        'Deve cumprir regras de conduta'
      ],
      opportunities: [
        'Patrocínios locais',
        'Aulas particulares',
        'Camps de verão',
        'Merchandising pessoal'
      ],
      lastUpdated: '2024-01-20'
    }
  ]);

  const [isRuleDialogOpen, setIsRuleDialogOpen] = useState(false);

  const [newRule, setNewRule] = useState({
    title: '',
    description: '',
    organization: 'NCAA' as const,
    category: 'academic' as const,
    priority: 'medium' as const,
    requirements: [] as string[],
    deadline: ''
  });


  const getOrganizationColor = (organization: string) => {
    switch (organization) {
      case 'NCAA': return 'bg-blue-100 text-blue-800';
      case 'NAIA': return 'bg-green-100 text-green-800';
      case 'NJCAA': return 'bg-purple-100 text-purple-800';
      case 'NIL': return 'bg-orange-100 text-orange-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return <BookOpen className="h-4 w-4" />;
      case 'athletic': return <Trophy className="h-4 w-4" />;
      case 'eligibility': return <CheckCircle className="h-4 w-4" />;
      case 'recruitment': return <Users className="h-4 w-4" />;
      case 'financial': return <Award className="h-4 w-4" />;
      case 'behavioral': return <Shield className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'athletic': return 'bg-green-100 text-green-800';
      case 'eligibility': return 'bg-purple-100 text-purple-800';
      case 'recruitment': return 'bg-yellow-100 text-yellow-800';
      case 'financial': return 'bg-orange-100 text-orange-800';
      case 'behavioral': return 'bg-red-100 text-red-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'non-compliant': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-blue-600" />;
      default: return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800';
      case 'non-compliant': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-muted-foreground';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'academic': return 'Acadêmico';
      case 'athletic': return 'Esportivo';
      case 'eligibility': return 'Elegibilidade';
      case 'recruitment': return 'Recrutamento';
      case 'financial': return 'Financeiro';
      case 'behavioral': return 'Comportamental';
      default: return 'Geral';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'compliant': return 'Conforme';
      case 'non-compliant': return 'Não Conforme';
      case 'warning': return 'Atenção';
      case 'pending': return 'Pendente';
      default: return 'Desconhecido';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'critical': return 'Crítica';
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'Desconhecida';
    }
  };

  const handleCreateRule = () => {
    const rule: ComplianceRule = {
      id: Date.now().toString(),
      ...newRule,
      status: 'pending',
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setRules([...rules, rule]);
    setNewRule({
      title: '',
      description: '',
      organization: 'NCAA',
      category: 'academic',
      priority: 'medium',
      requirements: [],
      deadline: ''
    });
    setIsRuleDialogOpen(false);
  };

  const handleUpdateRule = (ruleId: string, updates: Partial<ComplianceRule>) => {
    setRules(rules.map(rule => 
      rule.id === ruleId ? { ...rule, ...updates } : rule
    ));
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
  };

  const handleUpdateEligibility = (checkId: string, requirementId: string, isMet: boolean) => {
    setEligibilityChecks(eligibilityChecks.map(check => 
      check.id === checkId 
        ? {
            ...check,
            requirements: check.requirements.map(req =>
              req.id === requirementId ? { ...req, isMet } : req
            )
          }
        : check
    ));
  };

  const getComplianceScore = () => {
    const totalRules = rules.length;
    const compliantRules = rules.filter(rule => rule.status === 'compliant').length;
    return totalRules > 0 ? Math.round((compliantRules / totalRules) * 100) : 0;
  };

  const getEligibilityScore = () => {
    const totalChecks = eligibilityChecks.length;
    const eligibleChecks = eligibilityChecks.filter(check => check.status === 'eligible').length;
    return totalChecks > 0 ? Math.round((eligibleChecks / totalChecks) * 100) : 0;
  };

  const getCriticalIssues = () => {
    return rules.filter(rule => 
      rule.priority === 'critical' && rule.status !== 'compliant'
    );
  };

  const getUpcomingDeadlines = () => {
    const today = new Date();
    return rules
      .filter(rule => rule.deadline && new Date(rule.deadline) >= today)
      .sort((a, b) => new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime())
      .slice(0, 5);
  };

  const complianceScore = getComplianceScore();
  const eligibilityScore = getEligibilityScore();
  const criticalIssues = getCriticalIssues();
  const upcomingDeadlines = getUpcomingDeadlines();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Compliance & Regras</h1>
          <p className="text-muted-foreground mt-2">
            Monitore elegibilidade e regras das organizações esportivas
          </p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isRuleDialogOpen} onOpenChange={setIsRuleDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Regra
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Regra</DialogTitle>
                <DialogDescription>
                  Adicione uma nova regra de compliance para monitorar
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Título da Regra</Label>
                  <Input
                    id="title"
                    value={newRule.title}
                    onChange={(e) => setNewRule({...newRule, title: e.target.value})}
                    placeholder="Ex: GPA Mínimo para Elegibilidade"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newRule.description}
                    onChange={(e) => setNewRule({...newRule, description: e.target.value})}
                    placeholder="Descreva a regra em detalhes"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="organization">Organização</Label>
                    <Select
                      value={newRule.organization}
                      onValueChange={(value: any) => setNewRule({...newRule, organization: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NCAA">NCAA</SelectItem>
                        <SelectItem value="NAIA">NAIA</SelectItem>
                        <SelectItem value="NJCAA">NJCAA</SelectItem>
                        <SelectItem value="NIL">NIL</SelectItem>
                        <SelectItem value="General">Geral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Categoria</Label>
                    <Select
                      value={newRule.category}
                      onValueChange={(value: any) => setNewRule({...newRule, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Acadêmico</SelectItem>
                        <SelectItem value="athletic">Esportivo</SelectItem>
                        <SelectItem value="eligibility">Elegibilidade</SelectItem>
                        <SelectItem value="recruitment">Recrutamento</SelectItem>
                        <SelectItem value="financial">Financeiro</SelectItem>
                        <SelectItem value="behavioral">Comportamental</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="priority">Prioridade</Label>
                    <Select
                      value={newRule.priority}
                      onValueChange={(value: any) => setNewRule({...newRule, priority: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Baixa</SelectItem>
                        <SelectItem value="medium">Média</SelectItem>
                        <SelectItem value="high">Alta</SelectItem>
                        <SelectItem value="critical">Crítica</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="deadline">Prazo (opcional)</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={newRule.deadline}
                      onChange={(e) => setNewRule({...newRule, deadline: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRuleDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateRule}>
                  Criar Regra
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
              Score de Compliance
            </CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{complianceScore}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {rules.filter(rule => rule.status === 'compliant').length} de {rules.length} regras
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Elegibilidade
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{eligibilityScore}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {eligibilityChecks.filter(check => check.status === 'eligible').length} de {eligibilityChecks.length} verificações
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Problemas Críticos
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{criticalIssues.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              regras críticas não conformes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Próximos Prazos
            </CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{upcomingDeadlines.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              prazos próximos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {criticalIssues.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Atenção: Problemas Críticos</AlertTitle>
          <AlertDescription>
            Você tem {criticalIssues.length} regra(s) crítica(s) que precisam de atenção imediata.
          </AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rules">Regras</TabsTrigger>
          <TabsTrigger value="eligibility">Elegibilidade</TabsTrigger>
          <TabsTrigger value="nil">NIL</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>

        {/* Tab Regras */}
        <TabsContent value="rules">
          <Card>
            <CardHeader>
              <CardTitle>Regras de Compliance</CardTitle>
              <CardDescription>
                Monitore todas as regras e regulamentações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Regra</TableHead>
                    <TableHead>Organização</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{rule.title}</div>
                          <div className="text-sm text-muted-foreground">{rule.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getOrganizationColor(rule.organization)}>
                          {rule.organization}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getCategoryColor(rule.category)}>
                          {getCategoryLabel(rule.category)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`text-sm font-medium ${getPriorityColor(rule.priority)}`}>
                          {getPriorityLabel(rule.priority)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(rule.status)}
                          <span className="text-sm">{getStatusLabel(rule.status)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {rule.deadline ? (
                          <span className="text-sm">
                            {new Date(rule.deadline).toLocaleDateString('pt-BR')}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleUpdateRule(rule.id, { 
                              status: rule.status === 'compliant' ? 'non-compliant' : 'compliant' 
                            })}
                          >
                            {rule.status === 'compliant' ? 'Marcar Não Conforme' : 'Marcar Conforme'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteRule(rule.id)}
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

        {/* Tab Elegibilidade */}
        <TabsContent value="eligibility">
          <div className="space-y-4">
            {eligibilityChecks.map((check) => (
              <Card key={check.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{check.name}</CardTitle>
                      <CardDescription>{check.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className={getStatusColor(check.status)}>
                      {getStatusLabel(check.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Organização: {check.organization}</span>
                      <span>Última verificação: {new Date(check.lastChecked).toLocaleDateString('pt-BR')}</span>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Requisitos:</h4>
                      {check.requirements.map((requirement) => (
                        <div key={requirement.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={requirement.isMet}
                              onChange={(e) => handleUpdateEligibility(check.id, requirement.id, e.target.checked)}
                              className="rounded"
                            />
                            <div>
                              <div className="font-medium text-sm">{requirement.name}</div>
                              <div className="text-xs text-muted-foreground">{requirement.description}</div>
                              {requirement.value && requirement.targetValue && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  {requirement.value} / {requirement.targetValue}
                                </div>
                              )}
                            </div>
                          </div>
                          <span className={`text-xs font-medium ${getPriorityColor(requirement.priority)}`}>
                            {getPriorityLabel(requirement.priority)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab NIL */}
        <TabsContent value="nil">
          <div className="space-y-4">
            {nilInfo.map((info) => (
              <Card key={info.id}>
                <CardHeader>
                  <CardTitle>{info.title}</CardTitle>
                  <CardDescription>{info.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium text-sm mb-3 text-green-600">Regras</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          {info.rules.map((rule, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="w-1 h-1 bg-green-500 rounded-full mt-2"></span>
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-3 text-red-600">Restrições</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          {info.restrictions.map((restriction, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="w-1 h-1 bg-red-500 rounded-full mt-2"></span>
                              <span>{restriction}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-sm mb-3 text-blue-600">Oportunidades</h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                          {info.opportunities.map((opportunity, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="w-1 h-1 bg-blue-500 rounded-full mt-2"></span>
                              <span>{opportunity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t">
                      <span>Estado: {info.state}</span>
                      <span>Atualizado: {new Date(info.lastUpdated).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab Dashboard */}
        <TabsContent value="dashboard">
          <div className="space-y-6">
            {/* Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Progresso de Compliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Score Geral</span>
                      <span className="text-sm text-muted-foreground">{complianceScore}%</span>
                    </div>
                    <Progress value={complianceScore} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Elegibilidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Score Geral</span>
                      <span className="text-sm text-muted-foreground">{eligibilityScore}%</span>
                    </div>
                    <Progress value={eligibilityScore} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Próximos Prazos */}
            <Card>
              <CardHeader>
                <CardTitle>Próximos Prazos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDeadlines.length > 0 ? (
                    upcomingDeadlines.map((rule) => (
                      <div key={rule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${getCategoryColor(rule.category)}`}>
                            {getCategoryIcon(rule.category)}
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{rule.title}</h4>
                            <p className="text-xs text-muted-foreground">{rule.organization}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {new Date(rule.deadline!).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {getPriorityLabel(rule.priority)}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      Nenhum prazo próximo
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
