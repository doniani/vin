import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Trophy, 
  GraduationCap, 
  Heart, 
  Target, 
  Users,
  Calendar,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Trophy,
      title: "Estatísticas Esportivas",
      description: "Acompanhe performance, velocidade, força e resultados de jogos",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: GraduationCap,
      title: "Progresso Acadêmico",
      description: "Monitore notas, GPA e elegibilidade universitária",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Heart,
      title: "Saúde e Bem-estar",
      description: "Registre sono, lesões e níveis de fadiga",
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      icon: Target,
      title: "Metas e Oportunidades",
      description: "Defina objetivos e acompanhe oportunidades de recrutamento",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: Calendar,
      title: "Calendário Inteligente",
      description: "Deadlines de recrutamento, SAT/ACT e showcases",
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      icon: Users,
      title: "Comunicação",
      description: "Conecte-se com treinadores e recrutadores",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    }
  ];

  const stats = [
    { number: "500+", label: "Atletas Ativos" },
    { number: "50+", label: "Universidades Parceiras" },
    { number: "95%", label: "Taxa de Satisfação" },
    { number: "24/7", label: "Suporte Disponível" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero Section */}
          <div className="space-y-8 text-white">
            {/* Logo and Title */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Trophy className="h-7 w-7 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  Vin
                </h1>
              </div>
              <h2 className="text-5xl font-bold leading-tight">
                O futuro dos{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  atletas estudantis
                </span>{' '}
                começa aqui
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                A plataforma completa para acompanhar a evolução esportiva e acadêmica, 
                conectando atletas com oportunidades universitárias através de insights acionáveis.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className={`p-2 rounded-lg ${feature.bgColor}`}>
                    <feature.icon className={`h-5 w-5 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                    <p className="text-xs text-blue-200 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">100% Gratuito para começar</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-400">
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium">Sem compromisso</span>
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader className="text-center space-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Bem-vindo de volta!</CardTitle>
                <CardDescription className="text-gray-600">
                  Acesse sua conta para continuar acompanhando a evolução do seu atleta
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="seu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Senha
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 h-12 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        id="remember"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <Label htmlFor="remember" className="text-sm text-gray-600">
                        Lembrar de mim
                      </Label>
                    </div>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                      Esqueceu a senha?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-base transition-all duration-300 transform hover:scale-[1.02]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Entrando...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Entrar</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </form>


                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Não tem uma conta?{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                      Cadastre-se gratuitamente
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};