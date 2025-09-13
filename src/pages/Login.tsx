import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, GraduationCap, Heart, Target } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Features */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Vin
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              A plataforma completa para acompanhar a evolução esportiva e acadêmica do seu filho
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Estatísticas Esportivas</h3>
                <p className="text-sm text-muted-foreground">Acompanhe performance, velocidade, força e resultados</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Progresso Acadêmico</h3>
                <p className="text-sm text-muted-foreground">Monitore notas, GPA e elegibilidade universitária</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-red-100 p-3 rounded-lg">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Saúde e Bem-estar</h3>
                <p className="text-sm text-muted-foreground">Registre sono, lesões e níveis de fadiga</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Metas e Oportunidades</h3>
                <p className="text-sm text-muted-foreground">Defina objetivos e acompanhe oportunidades de recrutamento</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Entrar</CardTitle>
              <CardDescription>
                Acesse sua conta para acompanhar a evolução do seu atleta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                    {error}
                  </div>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-1">
                    Senha
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Não tem uma conta?{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                      Cadastre-se
                    </a>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
