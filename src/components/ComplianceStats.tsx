import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock,
  Trophy,
  Award,
  Target,
  Users,
  BookOpen,
  AlertCircle
} from 'lucide-react';

interface ComplianceRule {
  id: string;
  title: string;
  organization: 'NCAA' | 'NAIA' | 'NJCAA' | 'NIL' | 'General';
  category: 'academic' | 'athletic' | 'eligibility' | 'recruitment' | 'financial' | 'behavioral';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'compliant' | 'non-compliant' | 'warning' | 'pending';
  deadline?: string;
}

interface EligibilityCheck {
  id: string;
  name: string;
  organization: string;
  status: 'eligible' | 'ineligible' | 'pending' | 'warning';
  requirements: {
    id: string;
    name: string;
    isMet: boolean;
    priority: 'low' | 'medium' | 'high' | 'critical';
  }[];
}

interface ComplianceStatsProps {
  rules: ComplianceRule[];
  eligibilityChecks: EligibilityCheck[];
}

export const ComplianceStats: React.FC<ComplianceStatsProps> = ({ 
  rules, 
  eligibilityChecks 
}) => {
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

  const getOrganizationStats = () => {
    const organizations = ['NCAA', 'NAIA', 'NJCAA', 'NIL', 'General'];
    return organizations.map(org => {
      const orgRules = rules.filter(rule => rule.organization === org);
      const compliant = orgRules.filter(rule => rule.status === 'compliant').length;
      const total = orgRules.length;
      return {
        organization: org,
        total,
        compliant,
        percentage: total > 0 ? Math.round((compliant / total) * 100) : 0
      };
    }).filter(stat => stat.total > 0);
  };

  const getCategoryStats = () => {
    const categories = ['academic', 'athletic', 'eligibility', 'recruitment', 'financial', 'behavioral'];
    return categories.map(category => {
      const categoryRules = rules.filter(rule => rule.category === category);
      const compliant = categoryRules.filter(rule => rule.status === 'compliant').length;
      const total = categoryRules.length;
      return {
        category,
        total,
        compliant,
        percentage: total > 0 ? Math.round((compliant / total) * 100) : 0
      };
    }).filter(stat => stat.total > 0);
  };


  const getStatusBreakdown = () => {
    const statuses = ['compliant', 'non-compliant', 'warning', 'pending'];
    return statuses.map(status => {
      const count = rules.filter(rule => rule.status === status).length;
      return {
        status,
        count,
        percentage: rules.length > 0 ? Math.round((count / rules.length) * 100) : 0
      };
    }).filter(stat => stat.count > 0);
  };

  const getEligibilityBreakdown = () => {
    const statuses = ['eligible', 'ineligible', 'warning', 'pending'];
    return statuses.map(status => {
      const count = eligibilityChecks.filter(check => check.status === status).length;
      return {
        status,
        count,
        percentage: eligibilityChecks.length > 0 ? Math.round((count / eligibilityChecks.length) * 100) : 0
      };
    }).filter(stat => stat.count > 0);
  };

  const getRequirementStats = () => {
    const allRequirements = eligibilityChecks.flatMap(check => check.requirements);
    const total = allRequirements.length;
    const met = allRequirements.filter(req => req.isMet).length;
    return {
      total,
      met,
      percentage: total > 0 ? Math.round((met / total) * 100) : 0
    };
  };

  const getOrganizationIcon = (organization: string) => {
    switch (organization) {
      case 'NCAA': return <Trophy className="h-4 w-4" />;
      case 'NAIA': return <Award className="h-4 w-4" />;
      case 'NJCAA': return <Target className="h-4 w-4" />;
      case 'NIL': return <Users className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

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
      default: return <Target className="h-4 w-4" />;
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
      default: return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
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
      case 'eligible': return 'Elegível';
      case 'ineligible': return 'Não Elegível';
      default: return 'Desconhecido';
    }
  };

  const complianceScore = getComplianceScore();
  const eligibilityScore = getEligibilityScore();
  const criticalIssues = getCriticalIssues();
  const upcomingDeadlines = getUpcomingDeadlines();
  const organizationStats = getOrganizationStats();
  const categoryStats = getCategoryStats();
  const statusBreakdown = getStatusBreakdown();
  const eligibilityBreakdown = getEligibilityBreakdown();
  const requirementStats = getRequirementStats();

  return (
    <div className="space-y-6">
      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Score de Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{complianceScore}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {rules.filter(rule => rule.status === 'compliant').length} de {rules.length} regras
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Elegibilidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{eligibilityScore}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {eligibilityChecks.filter(check => check.status === 'eligible').length} de {eligibilityChecks.length} verificações
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Requisitos Atendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{requirementStats.percentage}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {requirementStats.met} de {requirementStats.total} requisitos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Problemas Críticos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{criticalIssues.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              regras críticas não conformes
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

      {/* Estatísticas por Organização */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance por Organização</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {organizationStats.map((stat) => (
              <div key={stat.organization} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg ${getOrganizationColor(stat.organization)}`}>
                      {getOrganizationIcon(stat.organization)}
                    </div>
                    <span className="text-sm font-medium">{stat.organization}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stat.compliant} / {stat.total} ({stat.percentage}%)
                  </span>
                </div>
                <Progress value={stat.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryStats.map((stat) => (
              <div key={stat.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg ${getCategoryColor(stat.category)}`}>
                      {getCategoryIcon(stat.category)}
                    </div>
                    <span className="text-sm font-medium">
                      {getCategoryLabel(stat.category)}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stat.compliant} / {stat.total} ({stat.percentage}%)
                  </span>
                </div>
                <Progress value={stat.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Breakdown por Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Status das Regras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {statusBreakdown.map((stat) => (
                <div key={stat.status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(stat.status)}
                    <span className="text-sm font-medium">
                      {getStatusLabel(stat.status)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{stat.count}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status de Elegibilidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {eligibilityBreakdown.map((stat) => (
                <div key={stat.status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(stat.status)}
                    <span className="text-sm font-medium">
                      {getStatusLabel(stat.status)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{stat.count}</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
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
                      {rule.priority === 'critical' ? 'Crítica' :
                       rule.priority === 'high' ? 'Alta' :
                       rule.priority === 'medium' ? 'Média' : 'Baixa'}
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
  );
};
