import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Palette, 
  Bell, 
  Shield, 
  Smartphone, 
  Lock, 
  Settings as SettingsIcon,
  Save,
  Download,
  Upload as UploadIcon,
  WifiOff,
  CheckCircle,
  Moon,
  Sun,
  Monitor,
  Globe,
  Mail,
  MessageSquare,
  Calendar,
  Target,
  DollarSign,
  Trophy,
  Heart,
  Activity,
  Database,
  Watch
} from 'lucide-react';

interface UserSettings {
  // Perfil
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  timezone: string;
  language: string;
  
  // Aparência
  theme: 'light' | 'dark' | 'system';
  primaryColor: string;
  sidebarCollapsed: boolean;
  compactMode: boolean;
  
  // Notificações
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  academicAlerts: boolean;
  athleticAlerts: boolean;
  healthAlerts: boolean;
  financialAlerts: boolean;
  opportunityAlerts: boolean;
  complianceAlerts: boolean;
  goalReminders: boolean;
  eventReminders: boolean;
  
  // Privacidade
  profileVisibility: 'public' | 'private' | 'contacts-only';
  showContactInfo: boolean;
  showAcademicInfo: boolean;
  showAthleticInfo: boolean;
  showHealthInfo: boolean;
  showFinancialInfo: boolean;
  allowDirectContact: boolean;
  showInSearch: boolean;
  showInDirectory: boolean;
  
  // Integrações
  appleWatchConnected: boolean;
  garminConnected: boolean;
  whoopConnected: boolean;
  stravaConnected: boolean;
  googleFitConnected: boolean;
  myFitnessPalConnected: boolean;
  
  // Segurança
  twoFactorEnabled: boolean;
  loginAlerts: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  
  // Sistema
  autoSave: boolean;
  dataRetention: number;
  backupFrequency: string;
  exportFormat: string;
  defaultView: string;
  refreshInterval: number;
}

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>({
    // Perfil
    name: 'João Silva',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-9999',
    avatar: '',
    bio: 'Atleta de futebol americano focado em conquistar uma bolsa universitária.',
    timezone: 'America/Sao_Paulo',
    language: 'pt-BR',
    
    // Aparência
    theme: 'system',
    primaryColor: 'blue',
    sidebarCollapsed: false,
    compactMode: false,
    
    // Notificações
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    academicAlerts: true,
    athleticAlerts: true,
    healthAlerts: true,
    financialAlerts: false,
    opportunityAlerts: true,
    complianceAlerts: true,
    goalReminders: true,
    eventReminders: true,
    
    // Privacidade
    profileVisibility: 'contacts-only',
    showContactInfo: true,
    showAcademicInfo: true,
    showAthleticInfo: true,
    showHealthInfo: false,
    showFinancialInfo: false,
    allowDirectContact: true,
    showInSearch: true,
    showInDirectory: false,
    
    // Integrações
    appleWatchConnected: false,
    garminConnected: false,
    whoopConnected: false,
    stravaConnected: false,
    googleFitConnected: false,
    myFitnessPalConnected: false,
    
    // Segurança
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordExpiry: 90,
    
    // Sistema
    autoSave: true,
    dataRetention: 365,
    backupFrequency: 'weekly',
    exportFormat: 'json',
    defaultView: 'dashboard',
    refreshInterval: 5
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('appearance');

  const handleSettingChange = (key: keyof UserSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Aqui seria feita a chamada para a API
    console.log('Salvando configurações:', settings);
    setIsEditing(false);
  };

  const handleReset = () => {
    // Reset para configurações padrão
    setSettings({
      ...settings,
      theme: 'system',
      primaryColor: 'blue',
      sidebarCollapsed: false,
      compactMode: false
    });
  };


  const getConnectionStatus = (connected: boolean) => {
    return connected ? (
      <Badge variant="outline" className="bg-green-100 text-green-800">
        <CheckCircle className="h-3 w-3 mr-1" />
        Conectado
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-muted text-muted-foreground">
        <WifiOff className="h-3 w-3 mr-1" />
        Desconectado
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground mt-2">
            Personalize sua experiência na plataforma
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleReset}>
            Resetar
          </Button>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? 'Cancelar' : 'Editar'}
          </Button>
          {isEditing && (
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
          <TabsTrigger value="privacy">Privacidade</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>


        {/* Tab Aparência */}
        <TabsContent value="appearance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  Tema e Cores
                </CardTitle>
                <CardDescription>
                  Personalize a aparência da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="theme">Tema</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) => handleSettingChange('theme', value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center">
                          <Sun className="h-4 w-4 mr-2" />
                          Claro
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center">
                          <Moon className="h-4 w-4 mr-2" />
                          Escuro
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center">
                          <Monitor className="h-4 w-4 mr-2" />
                          Sistema
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="primaryColor">Cor Primária</Label>
                  <Select
                    value={settings.primaryColor}
                    onValueChange={(value) => handleSettingChange('primaryColor', value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Azul</SelectItem>
                      <SelectItem value="green">Verde</SelectItem>
                      <SelectItem value="purple">Roxo</SelectItem>
                      <SelectItem value="orange">Laranja</SelectItem>
                      <SelectItem value="red">Vermelho</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <SettingsIcon className="h-5 w-5 mr-2" />
                  Layout e Interface
                </CardTitle>
                <CardDescription>
                  Configure o layout da interface
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sidebarCollapsed">Sidebar Recolhida</Label>
                    <p className="text-sm text-muted-foreground">Mostrar sidebar em modo compacto</p>
                  </div>
                  <Switch
                    checked={settings.sidebarCollapsed}
                    onCheckedChange={(checked) => handleSettingChange('sidebarCollapsed', checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compactMode">Modo Compacto</Label>
                    <p className="text-sm text-muted-foreground">Reduzir espaçamentos na interface</p>
                  </div>
                  <Switch
                    checked={settings.compactMode}
                    onCheckedChange={(checked) => handleSettingChange('compactMode', checked)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Notificações */}
        <TabsContent value="notifications">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Canais de Notificação
                </CardTitle>
                <CardDescription>
                  Configure como receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <span>Push Notifications</span>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>SMS</span>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Tipos de Alertas
                </CardTitle>
                <CardDescription>
                  Escolha quais tipos de alertas receber
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span>Acadêmicos</span>
                  </div>
                  <Switch
                    checked={settings.academicAlerts}
                    onCheckedChange={(checked) => handleSettingChange('academicAlerts', checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-4 w-4" />
                    <span>Esportivos</span>
                  </div>
                  <Switch
                    checked={settings.athleticAlerts}
                    onCheckedChange={(checked) => handleSettingChange('athleticAlerts', checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4" />
                    <span>Saúde</span>
                  </div>
                  <Switch
                    checked={settings.healthAlerts}
                    onCheckedChange={(checked) => handleSettingChange('healthAlerts', checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Financeiros</span>
                  </div>
                  <Switch
                    checked={settings.financialAlerts}
                    onCheckedChange={(checked) => handleSettingChange('financialAlerts', checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Oportunidades</span>
                  </div>
                  <Switch
                    checked={settings.opportunityAlerts}
                    onCheckedChange={(checked) => handleSettingChange('opportunityAlerts', checked)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Privacidade */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Controle de Privacidade
              </CardTitle>
              <CardDescription>
                Configure quem pode ver suas informações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="profileVisibility">Visibilidade do Perfil</Label>
                <Select
                  value={settings.profileVisibility}
                  onValueChange={(value) => handleSettingChange('profileVisibility', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">
                      <div className="flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        Público
                      </div>
                    </SelectItem>
                    <SelectItem value="contacts-only">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Apenas Contatos
                      </div>
                    </SelectItem>
                    <SelectItem value="private">
                      <div className="flex items-center">
                        <Lock className="h-4 w-4 mr-2" />
                        Privado
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Informações Visíveis</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Informações de Contato</Label>
                    <p className="text-sm text-muted-foreground">Mostrar email e telefone</p>
                  </div>
                  <Switch
                    checked={settings.showContactInfo}
                    onCheckedChange={(checked) => handleSettingChange('showContactInfo', checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Informações Acadêmicas</Label>
                    <p className="text-sm text-muted-foreground">Mostrar notas e GPA</p>
                  </div>
                  <Switch
                    checked={settings.showAcademicInfo}
                    onCheckedChange={(checked) => handleSettingChange('showAcademicInfo', checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Informações Esportivas</Label>
                    <p className="text-sm text-muted-foreground">Mostrar estatísticas esportivas</p>
                  </div>
                  <Switch
                    checked={settings.showAthleticInfo}
                    onCheckedChange={(checked) => handleSettingChange('showAthleticInfo', checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Informações de Saúde</Label>
                    <p className="text-sm text-muted-foreground">Mostrar dados de saúde</p>
                  </div>
                  <Switch
                    checked={settings.showHealthInfo}
                    onCheckedChange={(checked) => handleSettingChange('showHealthInfo', checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Informações Financeiras</Label>
                    <p className="text-sm text-muted-foreground">Mostrar dados financeiros</p>
                  </div>
                  <Switch
                    checked={settings.showFinancialInfo}
                    onCheckedChange={(checked) => handleSettingChange('showFinancialInfo', checked)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Integrações */}
        <TabsContent value="integrations">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="h-5 w-5 mr-2" />
                  Wearables
                </CardTitle>
                <CardDescription>
                  Conecte seus dispositivos de monitoramento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Watch className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Apple Watch</p>
                      <p className="text-sm text-muted-foreground">Monitoramento de saúde</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getConnectionStatus(settings.appleWatchConnected)}
                    <Button size="sm" variant="outline">
                      {settings.appleWatchConnected ? 'Desconectar' : 'Conectar'}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Activity className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Garmin</p>
                      <p className="text-sm text-muted-foreground">Atividade física</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getConnectionStatus(settings.garminConnected)}
                    <Button size="sm" variant="outline">
                      {settings.garminConnected ? 'Desconectar' : 'Conectar'}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Whoop</p>
                      <p className="text-sm text-muted-foreground">Recuperação e sono</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getConnectionStatus(settings.whoopConnected)}
                    <Button size="sm" variant="outline">
                      {settings.whoopConnected ? 'Desconectar' : 'Conectar'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Aplicativos Externos
                </CardTitle>
                <CardDescription>
                  Integre com outras plataformas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Activity className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Strava</p>
                      <p className="text-sm text-muted-foreground">Atividades esportivas</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getConnectionStatus(settings.stravaConnected)}
                    <Button size="sm" variant="outline">
                      {settings.stravaConnected ? 'Desconectar' : 'Conectar'}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Google Fit</p>
                      <p className="text-sm text-muted-foreground">Dados de saúde</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getConnectionStatus(settings.googleFitConnected)}
                    <Button size="sm" variant="outline">
                      {settings.googleFitConnected ? 'Desconectar' : 'Conectar'}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5" />
                    <div>
                      <p className="font-medium">MyFitnessPal</p>
                      <p className="text-sm text-muted-foreground">Nutrição e calorias</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getConnectionStatus(settings.myFitnessPalConnected)}
                    <Button size="sm" variant="outline">
                      {settings.myFitnessPalConnected ? 'Desconectar' : 'Conectar'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Segurança */}
        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2" />
                  Autenticação
                </CardTitle>
                <CardDescription>
                  Configure a segurança da sua conta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorEnabled}
                    onCheckedChange={(checked) => handleSettingChange('twoFactorEnabled', checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Alertas de Login</Label>
                    <p className="text-sm text-muted-foreground">Receber notificações de novos logins</p>
                  </div>
                  <Switch
                    checked={settings.loginAlerts}
                    onCheckedChange={(checked) => handleSettingChange('loginAlerts', checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="sessionTimeout">Timeout da Sessão (minutos)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="passwordExpiry">Expiração da Senha (dias)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    value={settings.passwordExpiry}
                    onChange={(e) => handleSettingChange('passwordExpiry', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Dados e Backup
                </CardTitle>
                <CardDescription>
                  Gerencie seus dados e backups
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Salvamento Automático</Label>
                    <p className="text-sm text-muted-foreground">Salvar alterações automaticamente</p>
                  </div>
                  <Switch
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="dataRetention">Retenção de Dados (dias)</Label>
                  <Input
                    id="dataRetention"
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div>
                  <Label htmlFor="backupFrequency">Frequência de Backup</Label>
                  <Select
                    value={settings.backupFrequency}
                    onValueChange={(value) => handleSettingChange('backupFrequency', value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diário</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Dados
                  </Button>
                  <Button variant="outline" size="sm">
                    <UploadIcon className="h-4 w-4 mr-2" />
                    Importar Dados
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
