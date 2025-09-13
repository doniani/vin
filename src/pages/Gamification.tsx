import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Trophy, 
  Crown, 
  Medal,
  TrendingUp,
  Plus,
  Trash2
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'academic' | 'athletic' | 'health' | 'social' | 'achievement' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  requirements: string[];
  isUnlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  points: number;
  isCompleted: boolean;
  completedAt?: string;
  progress: number;
  maxProgress: number;
  requirements: string[];
}

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar?: string;
  totalPoints: number;
  level: number;
  badges: number;
  achievements: number;
  rank: number;
  isCurrentUser: boolean;
}

interface Level {
  level: number;
  name: string;
  minPoints: number;
  maxPoints: number;
  color: string;
  icon: string;
}

export const Gamification: React.FC = () => {
  const [badges, setBadges] = useState<Badge[]>([
    {
      id: '1',
      name: 'Primeiro Treino',
      description: 'Complete seu primeiro treino registrado',
      icon: '🏃‍♂️',
      category: 'athletic',
      rarity: 'common',
      points: 10,
      requirements: ['Complete 1 treino'],
      isUnlocked: true,
      unlockedAt: '2024-01-15',
      progress: 1,
      maxProgress: 1
    },
    {
      id: '2',
      name: 'GPA Excelente',
      description: 'Mantenha GPA acima de 3.5 por 3 meses',
      icon: '📚',
      category: 'academic',
      rarity: 'rare',
      points: 50,
      requirements: ['GPA 3.5+ por 3 meses'],
      isUnlocked: false,
      progress: 2,
      maxProgress: 3
    },
    {
      id: '3',
      name: 'Velocista',
      description: 'Melhore seu tempo de 40yd em 0.2s',
      icon: '⚡',
      category: 'athletic',
      rarity: 'epic',
      points: 100,
      requirements: ['Melhore 40yd em 0.2s'],
      isUnlocked: true,
      unlockedAt: '2024-02-10',
      progress: 1,
      maxProgress: 1
    },
    {
      id: '4',
      name: 'Consistência',
      description: 'Complete 30 treinos consecutivos',
      icon: '🔥',
      category: 'athletic',
      rarity: 'legendary',
      points: 200,
      requirements: ['30 treinos consecutivos'],
      isUnlocked: false,
      progress: 15,
      maxProgress: 30
    },
    {
      id: '5',
      name: 'Mentor',
      description: 'Ajude 5 colegas com seus treinos',
      icon: '🤝',
      category: 'social',
      rarity: 'rare',
      points: 75,
      requirements: ['Ajude 5 colegas'],
      isUnlocked: false,
      progress: 2,
      maxProgress: 5
    }
  ]);

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      name: 'Maratonista',
      description: 'Complete 100 treinos no total',
      icon: '🏆',
      category: 'Treinamento',
      points: 500,
      isCompleted: true,
      completedAt: '2024-02-20',
      progress: 100,
      maxProgress: 100,
      requirements: ['100 treinos completados']
    },
    {
      id: '2',
      name: 'Acadêmico Exemplar',
      description: 'Mantenha GPA 3.8+ por 6 meses',
      icon: '🎓',
      category: 'Acadêmico',
      points: 300,
      isCompleted: false,
      progress: 4,
      maxProgress: 6,
      requirements: ['GPA 3.8+ por 6 meses']
    },
    {
      id: '3',
      name: 'Líder',
      description: 'Seja capitão do time por 1 temporada',
      icon: '👑',
      category: 'Liderança',
      points: 400,
      isCompleted: false,
      progress: 0,
      maxProgress: 1,
      requirements: ['Capitão por 1 temporada']
    }
  ]);

  const [leaderboard] = useState<LeaderboardEntry[]>([
    {
      id: '1',
      name: 'João Silva',
      avatar: '',
      totalPoints: 2500,
      level: 15,
      badges: 12,
      achievements: 8,
      rank: 1,
      isCurrentUser: false
    },
    {
      id: '2',
      name: 'Maria Santos',
      avatar: '',
      totalPoints: 2300,
      level: 14,
      badges: 10,
      achievements: 7,
      rank: 2,
      isCurrentUser: false
    },
    {
      id: '3',
      name: 'Você',
      avatar: '',
      totalPoints: 2100,
      level: 13,
      badges: 8,
      achievements: 6,
      rank: 3,
      isCurrentUser: true
    },
    {
      id: '4',
      name: 'Pedro Costa',
      avatar: '',
      totalPoints: 1900,
      level: 12,
      badges: 7,
      achievements: 5,
      rank: 4,
      isCurrentUser: false
    }
  ]);

  const [levels] = useState<Level[]>([
    { level: 1, name: 'Iniciante', minPoints: 0, maxPoints: 100, color: 'bg-gray-500', icon: '🌱' },
    { level: 2, name: 'Novato', minPoints: 100, maxPoints: 250, color: 'bg-green-500', icon: '🌿' },
    { level: 3, name: 'Aprendiz', minPoints: 250, maxPoints: 500, color: 'bg-blue-500', icon: '🌊' },
    { level: 4, name: 'Competente', minPoints: 500, maxPoints: 1000, color: 'bg-purple-500', icon: '💜' },
    { level: 5, name: 'Experiente', minPoints: 1000, maxPoints: 2000, color: 'bg-orange-500', icon: '🧡' },
    { level: 6, name: 'Especialista', minPoints: 2000, maxPoints: 3500, color: 'bg-red-500', icon: '❤️' },
    { level: 7, name: 'Mestre', minPoints: 3500, maxPoints: 5000, color: 'bg-yellow-500', icon: '💛' },
    { level: 8, name: 'Lenda', minPoints: 5000, maxPoints: 10000, color: 'bg-pink-500', icon: '💖' }
  ]);

  const [isBadgeDialogOpen, setIsBadgeDialogOpen] = useState(false);

  const [newBadge, setNewBadge] = useState({
    name: '',
    description: '',
    icon: '🏆',
    category: 'athletic' as const,
    rarity: 'common' as const,
    points: 10,
    requirements: [] as string[],
    maxProgress: 1
  });


  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'academic': return 'bg-blue-100 text-blue-800';
      case 'athletic': return 'bg-green-100 text-green-800';
      case 'health': return 'bg-red-100 text-red-800';
      case 'social': return 'bg-purple-100 text-purple-800';
      case 'achievement': return 'bg-yellow-100 text-yellow-800';
      case 'special': return 'bg-pink-100 text-pink-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };


  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-muted text-muted-foreground';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'academic': return 'Acadêmico';
      case 'athletic': return 'Esportivo';
      case 'health': return 'Saúde';
      case 'social': return 'Social';
      case 'achievement': return 'Conquista';
      case 'special': return 'Especial';
      default: return 'Geral';
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Comum';
      case 'rare': return 'Raro';
      case 'epic': return 'Épico';
      case 'legendary': return 'Lendário';
      default: return 'Desconhecido';
    }
  };

  const getCurrentLevel = () => {
    const currentUser = leaderboard.find(entry => entry.isCurrentUser);
    if (!currentUser) return levels[0];
    
    return levels.find(level => 
      currentUser.totalPoints >= level.minPoints && currentUser.totalPoints < level.maxPoints
    ) || levels[levels.length - 1];
  };

  const getNextLevel = () => {
    const currentLevel = getCurrentLevel();
    const nextLevelIndex = levels.findIndex(level => level.level === currentLevel.level + 1);
    return nextLevelIndex >= 0 ? levels[nextLevelIndex] : null;
  };

  const getProgressToNextLevel = () => {
    const currentLevel = getCurrentLevel();
    const nextLevel = getNextLevel();
    const currentUser = leaderboard.find(entry => entry.isCurrentUser);
    
    if (!currentUser || !nextLevel) return 0;
    
    const progress = currentUser.totalPoints - currentLevel.minPoints;
    const totalNeeded = nextLevel.minPoints - currentLevel.minPoints;
    
    return Math.min((progress / totalNeeded) * 100, 100);
  };

  const getTotalPoints = () => {
    const currentUser = leaderboard.find(entry => entry.isCurrentUser);
    return currentUser?.totalPoints || 0;
  };

  const getUnlockedBadges = () => {
    return badges.filter(badge => badge.isUnlocked).length;
  };

  const getCompletedAchievements = () => {
    return achievements.filter(achievement => achievement.isCompleted).length;
  };

  const getRecentUnlocks = () => {
    const recentBadges = badges
      .filter(badge => badge.isUnlocked && badge.unlockedAt)
      .sort((a, b) => new Date(b.unlockedAt!).getTime() - new Date(a.unlockedAt!).getTime())
      .slice(0, 3);
    
    const recentAchievements = achievements
      .filter(achievement => achievement.isCompleted && achievement.completedAt)
      .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
      .slice(0, 3);
    
    return [...recentBadges, ...recentAchievements]
      .sort((a, b) => {
        const dateA = ('unlockedAt' in a ? a.unlockedAt : ('completedAt' in a ? a.completedAt : '')) || '';
        const dateB = ('unlockedAt' in b ? b.unlockedAt : ('completedAt' in b ? b.completedAt : '')) || '';
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      })
      .slice(0, 5);
  };

  const handleCreateBadge = () => {
    const badge: Badge = {
      id: Date.now().toString(),
      ...newBadge,
      isUnlocked: false,
      progress: 0
    };
    setBadges([...badges, badge]);
    setNewBadge({
      name: '',
      description: '',
      icon: '🏆',
      category: 'athletic',
      rarity: 'common',
      points: 10,
      requirements: [],
      maxProgress: 1
    });
    setIsBadgeDialogOpen(false);
  };

  const handleAddRequirement = () => {
    setNewBadge({
      ...newBadge,
      requirements: [...newBadge.requirements, '']
    });
  };

  const handleUpdateRequirement = (index: number, value: string) => {
    const updatedRequirements = [...newBadge.requirements];
    updatedRequirements[index] = value;
    setNewBadge({
      ...newBadge,
      requirements: updatedRequirements
    });
  };

  const handleRemoveRequirement = (index: number) => {
    const updatedRequirements = newBadge.requirements.filter((_, i) => i !== index);
    setNewBadge({
      ...newBadge,
      requirements: updatedRequirements
    });
  };

  const currentLevel = getCurrentLevel();
  const nextLevel = getNextLevel();
  const progressToNext = getProgressToNextLevel();
  const totalPoints = getTotalPoints();
  const unlockedBadges = getUnlockedBadges();
  const completedAchievements = getCompletedAchievements();
  const recentUnlocks = getRecentUnlocks();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gamificação</h1>
          <p className="text-muted-foreground mt-2">
            Conquiste badges, complete achievements e suba no ranking
          </p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isBadgeDialogOpen} onOpenChange={setIsBadgeDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Badge
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar Novo Badge</DialogTitle>
                <DialogDescription>
                  Adicione um novo badge para motivar os atletas
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="badgeName">Nome do Badge</Label>
                    <Input
                      id="badgeName"
                      value={newBadge.name}
                      onChange={(e) => setNewBadge({...newBadge, name: e.target.value})}
                      placeholder="Ex: Primeiro Treino"
                    />
                  </div>
                  <div>
                    <Label htmlFor="badgeIcon">Ícone (Emoji)</Label>
                    <Input
                      id="badgeIcon"
                      value={newBadge.icon}
                      onChange={(e) => setNewBadge({...newBadge, icon: e.target.value})}
                      placeholder="🏆"
                      maxLength={2}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="badgeDescription">Descrição</Label>
                  <Textarea
                    id="badgeDescription"
                    value={newBadge.description}
                    onChange={(e) => setNewBadge({...newBadge, description: e.target.value})}
                    placeholder="Descreva o que é necessário para conquistar este badge"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="badgeCategory">Categoria</Label>
                    <Select
                      value={newBadge.category}
                      onValueChange={(value: any) => setNewBadge({...newBadge, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academic">Acadêmico</SelectItem>
                        <SelectItem value="athletic">Esportivo</SelectItem>
                        <SelectItem value="health">Saúde</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="achievement">Conquista</SelectItem>
                        <SelectItem value="special">Especial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="badgeRarity">Raridade</Label>
                    <Select
                      value={newBadge.rarity}
                      onValueChange={(value: any) => setNewBadge({...newBadge, rarity: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="common">Comum</SelectItem>
                        <SelectItem value="rare">Raro</SelectItem>
                        <SelectItem value="epic">Épico</SelectItem>
                        <SelectItem value="legendary">Lendário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="badgePoints">Pontos</Label>
                    <Input
                      id="badgePoints"
                      type="number"
                      value={newBadge.points}
                      onChange={(e) => setNewBadge({...newBadge, points: parseInt(e.target.value) || 0})}
                      placeholder="10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="badgeMaxProgress">Progresso Máximo</Label>
                  <Input
                    id="badgeMaxProgress"
                    type="number"
                    value={newBadge.maxProgress}
                    onChange={(e) => setNewBadge({...newBadge, maxProgress: parseInt(e.target.value) || 1})}
                    placeholder="1"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Requisitos</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAddRequirement}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {newBadge.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={requirement}
                          onChange={(e) => handleUpdateRequirement(index, e.target.value)}
                          placeholder="Ex: Complete 10 treinos"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveRequirement(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {newBadge.requirements.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-2">
                        Nenhum requisito adicionado
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsBadgeDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateBadge}>
                  Criar Badge
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
              Nível Atual
            </CardTitle>
            <Crown className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {currentLevel.level} - {currentLevel.name}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalPoints.toLocaleString()} pontos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Badges Desbloqueados
            </CardTitle>
            <Medal className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{unlockedBadges}</div>
            <p className="text-xs text-muted-foreground mt-1">
              de {badges.length} badges
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Achievements
            </CardTitle>
            <Trophy className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{completedAchievements}</div>
            <p className="text-xs text-muted-foreground mt-1">
              de {achievements.length} achievements
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ranking
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              #{leaderboard.find(entry => entry.isCurrentUser)?.rank || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              de {leaderboard.length} atletas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress to Next Level */}
      {nextLevel && (
        <Card>
          <CardHeader>
            <CardTitle>Progresso para o Próximo Nível</CardTitle>
            <CardDescription>
              {nextLevel.level} - {nextLevel.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {totalPoints.toLocaleString()} / {nextLevel.minPoints.toLocaleString()} pontos
                </span>
                <span className="text-sm text-muted-foreground">
                  {progressToNext.toFixed(1)}%
                </span>
              </div>
              <Progress value={progressToNext} className="h-3" />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Faltam {nextLevel.minPoints - totalPoints} pontos</span>
                <span>Nível {nextLevel.level}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs defaultValue="badges" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Ranking</TabsTrigger>
          <TabsTrigger value="recent">Recentes</TabsTrigger>
        </TabsList>

        {/* Tab Badges */}
        <TabsContent value="badges">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge) => (
              <Card key={badge.id} className={`${badge.isUnlocked ? 'ring-2 ring-green-500' : 'opacity-75'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="text-4xl">{badge.icon}</div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge variant="outline" className={getRarityBadgeColor(badge.rarity)}>
                        {getRarityLabel(badge.rarity)}
                      </Badge>
                      <Badge variant="outline" className={getCategoryColor(badge.category)}>
                        {getCategoryLabel(badge.category)}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{badge.name}</CardTitle>
                  <CardDescription>{badge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progresso</span>
                      <span className="text-sm text-muted-foreground">
                        {badge.progress} / {badge.maxProgress}
                      </span>
                    </div>
                    <Progress value={(badge.progress / badge.maxProgress) * 100} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pontos</span>
                      <span className="text-sm font-medium text-yellow-600">
                        {badge.points} pts
                      </span>
                    </div>
                    
                    {badge.isUnlocked && badge.unlockedAt && (
                      <div className="text-xs text-green-600">
                        Desbloqueado em {new Date(badge.unlockedAt).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Requisitos:</h4>
                      {badge.requirements.map((req, index) => (
                        <div key={index} className="text-xs text-muted-foreground flex items-center space-x-2">
                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab Achievements */}
        <TabsContent value="achievements">
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={`${achievement.isCompleted ? 'ring-2 ring-green-500' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{achievement.name}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        {achievement.points} pts
                      </Badge>
                      <Badge variant="outline" className={getCategoryColor(achievement.category)}>
                        {achievement.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progresso</span>
                      <span className="text-sm text-muted-foreground">
                        {achievement.progress} / {achievement.maxProgress}
                      </span>
                    </div>
                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                    
                    {achievement.isCompleted && achievement.completedAt && (
                      <div className="text-sm text-green-600">
                        Concluído em {new Date(achievement.completedAt).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">Requisitos:</h4>
                      {achievement.requirements.map((req, index) => (
                        <div key={index} className="text-sm text-muted-foreground flex items-center space-x-2">
                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab Leaderboard */}
        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle>Ranking de Atletas</CardTitle>
              <CardDescription>
                Classificação baseada em pontos totais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Posição</TableHead>
                    <TableHead>Atleta</TableHead>
                    <TableHead>Nível</TableHead>
                    <TableHead>Pontos</TableHead>
                    <TableHead>Badges</TableHead>
                    <TableHead>Achievements</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboard.map((entry) => (
                    <TableRow key={entry.id} className={entry.isCurrentUser ? 'bg-blue-50' : ''}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {entry.rank <= 3 && (
                            <span className="text-2xl">
                              {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                            </span>
                          )}
                          <span className="font-medium">#{entry.rank}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={entry.avatar} />
                            <AvatarFallback>
                              {entry.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{entry.name}</div>
                            {entry.isCurrentUser && (
                              <Badge variant="outline" className="text-xs">
                                Você
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">Nível {entry.level}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{entry.totalPoints.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{entry.badges}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{entry.achievements}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Recent */}
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Desbloqueios Recentes</CardTitle>
              <CardDescription>
                Suas conquistas mais recentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUnlocks.length > 0 ? (
                  recentUnlocks.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="text-3xl">
                        {'icon' in item ? item.icon : '🏆'}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">
                          {'name' in item ? item.name : 'Achievement'}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {'description' in item ? item.description : 'Conquista desbloqueada'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {('unlockedAt' in item ? item.unlockedAt : ('completedAt' in item ? item.completedAt : '')) &&
                            new Date(('unlockedAt' in item ? item.unlockedAt : ('completedAt' in item ? item.completedAt : ''))!).toLocaleDateString('pt-BR')
                          }
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-yellow-600">
                          {'points' in item ? item.points : 0} pts
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Nenhum desbloqueio recente
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
