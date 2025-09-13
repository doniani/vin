import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomLineChart } from '@/components/charts/LineChart';
import { CustomBarChart } from '@/components/charts/BarChart';
import { CustomAreaChart } from '@/components/charts/AreaChart';
import { CustomRadarChart } from '@/components/charts/RadarChart';
import { 
  TrendingUp, 
  Target, 
  Award,
  Activity,
  Zap,
  Heart,
  Brain
} from 'lucide-react';

export const EvolutionDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // Dados mockados para demonstração
  const performanceData = [
    { name: 'Jan', velocidade: 4.8, força: 85, resistencia: 75, agilidade: 80 },
    { name: 'Fev', velocidade: 4.7, força: 87, resistencia: 78, agilidade: 82 },
    { name: 'Mar', velocidade: 4.6, força: 90, resistencia: 80, agilidade: 85 },
    { name: 'Abr', velocidade: 4.5, força: 92, resistencia: 82, agilidade: 87 },
    { name: 'Mai', velocidade: 4.4, força: 95, resistencia: 85, agilidade: 90 },
    { name: 'Jun', velocidade: 4.3, força: 98, resistencia: 88, agilidade: 92 },
  ];

  const academicData = [
    { name: 'Q1', gpa: 3.2, sat: 1100, act: 24 },
    { name: 'Q2', gpa: 3.4, sat: 1150, act: 26 },
    { name: 'Q3', gpa: 3.6, sat: 1200, act: 28 },
    { name: 'Q4', gpa: 3.8, sat: 1250, act: 30 },
  ];

  const healthData = [
    { name: 'Sem 1', sono: 7.5, fadiga: 3, lesoes: 0 },
    { name: 'Sem 2', sono: 8.0, fadiga: 2, lesoes: 0 },
    { name: 'Sem 3', sono: 7.8, fadiga: 4, lesoes: 1 },
    { name: 'Sem 4', sono: 8.2, fadiga: 2, lesoes: 0 },
    { name: 'Sem 5', sono: 7.9, fadiga: 3, lesoes: 0 },
    { name: 'Sem 6', sono: 8.1, fadiga: 2, lesoes: 0 },
  ];

  const radarData = [
    { subject: 'Velocidade', A: 92, B: 85 },
    { subject: 'Força', A: 88, B: 80 },
    { subject: 'Resistência', A: 85, B: 90 },
    { subject: 'Agilidade', A: 90, B: 85 },
    { subject: 'Coordenação', A: 87, B: 88 },
    { subject: 'Flexibilidade', A: 80, B: 85 },
  ];

  const achievements = [
    {
      title: 'Novo Recorde Pessoal',
      description: '40yd em 4.3s - Melhor tempo da temporada',
      date: '15 de Junho',
      type: 'speed',
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'GPA Excelente',
      description: '3.8 no último trimestre - Acima da média',
      date: '10 de Junho',
      type: 'academic',
      icon: Brain,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Zero Lesões',
      description: '3 meses sem lesões - Excelente condicionamento',
      date: '1 de Junho',
      type: 'health',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Treinos Consecutivos',
      description: '30 dias de treino sem faltas - Dedicação exemplar',
      date: '25 de Maio',
      type: 'consistency',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const benchmarks = [
    { category: 'Velocidade 40yd', current: '4.3s', target: '4.2s', progress: 85, status: 'good' },
    { category: 'GPA', current: '3.8', target: '3.5', progress: 100, status: 'excellent' },
    { category: 'SAT Score', current: '1250', target: '1200', progress: 100, status: 'excellent' },
    { category: 'Treinos/Mês', current: '24', target: '20', progress: 100, status: 'excellent' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard de Evolução</h1>
          <p className="text-muted-foreground mt-2">
            Acompanhe o progresso completo do seu atleta
          </p>
        </div>
        <div className="flex space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Último Mês</SelectItem>
              <SelectItem value="3months">3 Meses</SelectItem>
              <SelectItem value="6months">6 Meses</SelectItem>
              <SelectItem value="1year">1 Ano</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Métricas</SelectItem>
              <SelectItem value="athletic">Esportivas</SelectItem>
              <SelectItem value="academic">Acadêmicas</SelectItem>
              <SelectItem value="health">Saúde</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Velocidade 40yd
            </CardTitle>
            <Zap className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4.3s</div>
            <p className="text-xs text-green-600 mt-1">
              -0.1s vs. mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              GPA Atual
            </CardTitle>
            <Brain className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3.8</div>
            <p className="text-xs text-green-600 mt-1">
              +0.2 vs. trimestre anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Treinos Concluídos
            </CardTitle>
            <Activity className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">24</div>
            <p className="text-xs text-green-600 mt-1">
              +3 vs. mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Horas de Sono
            </CardTitle>
            <Heart className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8.1h</div>
            <p className="text-xs text-green-600 mt-1">
              +0.3h vs. semana anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs para diferentes visualizações */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance" className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="academic" className="flex items-center">
            <Brain className="h-4 w-4 mr-2" />
            Acadêmico
          </TabsTrigger>
          <TabsTrigger value="health" className="flex items-center">
            <Heart className="h-4 w-4 mr-2" />
            Saúde
          </TabsTrigger>
          <TabsTrigger value="radar" className="flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Radar
          </TabsTrigger>
        </TabsList>

        {/* Tab Performance */}
        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Evolução da Velocidade</CardTitle>
                <CardDescription>
                  Tempo em 40yd ao longo dos meses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomLineChart
                  data={performanceData}
                  dataKey="velocidade"
                  name="Velocidade (s)"
                  color="#3b82f6"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Desenvolvimento Físico</CardTitle>
                <CardDescription>
                  Força, resistência e agilidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomBarChart
                  data={performanceData}
                  dataKey="força"
                  name="Força (%)"
                  color="#10b981"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Acadêmico */}
        <TabsContent value="academic">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Progresso Acadêmico</CardTitle>
                <CardDescription>
                  GPA e pontuações de testes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomAreaChart
                  data={academicData}
                  dataKey="gpa"
                  name="GPA"
                  color="#8b5cf6"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pontuações SAT/ACT</CardTitle>
                <CardDescription>
                  Evolução dos testes padronizados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomLineChart
                  data={academicData}
                  dataKey="sat"
                  name="SAT Score"
                  color="#f59e0b"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Saúde */}
        <TabsContent value="health">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Qualidade do Sono</CardTitle>
                <CardDescription>
                  Horas de sono por semana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomAreaChart
                  data={healthData}
                  dataKey="sono"
                  name="Horas de Sono"
                  color="#ef4444"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Níveis de Fadiga</CardTitle>
                <CardDescription>
                  Escala de 1-10 (menor = melhor)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomLineChart
                  data={healthData}
                  dataKey="fadiga"
                  name="Fadiga"
                  color="#f97316"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Radar */}
        <TabsContent value="radar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Perfil Atual vs. Meta</CardTitle>
                <CardDescription>
                  Comparação com objetivos estabelecidos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomRadarChart
                  data={radarData}
                  dataKey="A"
                  name="Atual"
                  color="#3b82f6"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Benchmarks da NCAA</CardTitle>
                <CardDescription>
                  Comparação com padrões universitários
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomRadarChart
                  data={radarData}
                  dataKey="B"
                  name="NCAA Mínimo"
                  color="#10b981"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Conquistas Recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Conquistas Recentes
          </CardTitle>
          <CardDescription>
            Principais marcos alcançados este mês
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${achievement.bgColor}`}>
                  <achievement.icon className={`h-5 w-5 ${achievement.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benchmarks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Benchmarks e Metas
          </CardTitle>
          <CardDescription>
            Progresso em relação aos objetivos estabelecidos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {benchmarks.map((benchmark, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{benchmark.category}</h4>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-muted-foreground">
                      Atual: <span className="font-medium">{benchmark.current}</span>
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Meta: <span className="font-medium">{benchmark.target}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        benchmark.status === 'excellent' ? 'bg-green-500' :
                        benchmark.status === 'good' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${benchmark.progress}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-medium ${
                    benchmark.status === 'excellent' ? 'text-green-600' :
                    benchmark.status === 'good' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {benchmark.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
