import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Target, 
  Users,
  Sparkles,
  Heart,
  BookOpen,
  Activity
} from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  category: 'academic' | 'athletic' | 'health' | 'social' | 'achievement' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  isUnlocked: boolean;
  progress: number;
  maxProgress: number;
  unlockedAt?: string;
}

interface Achievement {
  id: string;
  name: string;
  category: string;
  points: number;
  isCompleted: boolean;
  progress: number;
  maxProgress: number;
  completedAt?: string;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  totalPoints: number;
  level: number;
  badges: number;
  achievements: number;
  rank: number;
  isCurrentUser: boolean;
}

interface GamificationStatsProps {
  badges: Badge[];
  achievements: Achievement[];
  leaderboard: LeaderboardEntry[];
}

export const GamificationStats: React.FC<GamificationStatsProps> = ({ 
  badges, 
  achievements, 
  leaderboard 
}) => {
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

  const getCurrentLevel = () => {
    const currentUser = leaderboard.find(entry => entry.isCurrentUser);
    return currentUser?.level || 1;
  };

  const getCurrentRank = () => {
    const currentUser = leaderboard.find(entry => entry.isCurrentUser);
    return currentUser?.rank || 0;
  };

  const getCategoryStats = () => {
    const categories = ['academic', 'athletic', 'health', 'social', 'achievement', 'special'];
    return categories.map(category => {
      const categoryBadges = badges.filter(badge => badge.category === category);
      const unlocked = categoryBadges.filter(badge => badge.isUnlocked).length;
      const total = categoryBadges.length;
      return {
        category,
        unlocked,
        total,
        percentage: total > 0 ? Math.round((unlocked / total) * 100) : 0
      };
    }).filter(stat => stat.total > 0);
  };

  const getRarityStats = () => {
    const rarities = ['common', 'rare', 'epic', 'legendary'];
    return rarities.map(rarity => {
      const rarityBadges = badges.filter(badge => badge.rarity === rarity);
      const unlocked = rarityBadges.filter(badge => badge.isUnlocked).length;
      const total = rarityBadges.length;
      return {
        rarity,
        unlocked,
        total,
        percentage: total > 0 ? Math.round((unlocked / total) * 100) : 0
      };
    }).filter(stat => stat.total > 0);
  };

  const getAchievementStats = () => {
    const categories = ['Treinamento', 'Acadêmico', 'Liderança', 'Social'];
    return categories.map(category => {
      const categoryAchievements = achievements.filter(achievement => achievement.category === category);
      const completed = categoryAchievements.filter(achievement => achievement.isCompleted).length;
      const total = categoryAchievements.length;
      return {
        category,
        completed,
        total,
        percentage: total > 0 ? Math.round((completed / total) * 100) : 0
      };
    }).filter(stat => stat.total > 0);
  };

  const getProgressStats = () => {
    const inProgressBadges = badges.filter(badge => !badge.isUnlocked && badge.progress > 0);
    const inProgressAchievements = achievements.filter(achievement => !achievement.isCompleted && achievement.progress > 0);
    
    return {
      badges: inProgressBadges.length,
      achievements: inProgressAchievements.length,
      total: inProgressBadges.length + inProgressAchievements.length
    };
  };

  const getRecentActivity = () => {
    const recentBadges = badges
      .filter(badge => badge.isUnlocked)
      .sort((a, b) => new Date(b.unlockedAt || '').getTime() - new Date(a.unlockedAt || '').getTime())
      .slice(0, 3);
    
    const recentAchievements = achievements
      .filter(achievement => achievement.isCompleted)
      .sort((a, b) => new Date(b.completedAt || '').getTime() - new Date(a.completedAt || '').getTime())
      .slice(0, 3);
    
    return [...recentBadges, ...recentAchievements]
      .sort((a, b) => {
        const dateA = ('unlockedAt' in a ? a.unlockedAt : ('completedAt' in a ? a.completedAt : '')) || '';
        const dateB = ('unlockedAt' in b ? b.unlockedAt : ('completedAt' in b ? b.completedAt : '')) || '';
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      })
      .slice(0, 5);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic': return <BookOpen className="h-4 w-4" />;
      case 'athletic': return <Activity className="h-4 w-4" />;
      case 'health': return <Heart className="h-4 w-4" />;
      case 'social': return <Users className="h-4 w-4" />;
      case 'achievement': return <Trophy className="h-4 w-4" />;
      case 'special': return <Sparkles className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

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

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-muted-foreground';
      case 'rare': return 'text-blue-600';
      case 'epic': return 'text-purple-600';
      case 'legendary': return 'text-yellow-600';
      default: return 'text-muted-foreground';
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

  const totalPoints = getTotalPoints();
  const unlockedBadges = getUnlockedBadges();
  const completedAchievements = getCompletedAchievements();
  const currentLevel = getCurrentLevel();
  const currentRank = getCurrentRank();
  const categoryStats = getCategoryStats();
  const rarityStats = getRarityStats();
  const achievementStats = getAchievementStats();
  const progressStats = getProgressStats();
  const recentActivity = getRecentActivity();

  return (
    <div className="space-y-6">
      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pontos Totais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalPoints.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Nível {currentLevel}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Badges Desbloqueados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{unlockedBadges}</div>
            <p className="text-xs text-muted-foreground mt-1">
              de {badges.length} badges
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{completedAchievements}</div>
            <p className="text-xs text-muted-foreground mt-1">
              de {achievements.length} achievements
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ranking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">#{currentRank}</div>
            <p className="text-xs text-muted-foreground mt-1">
              de {leaderboard.length} atletas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progresso por Categoria - Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso de Badges por Categoria</CardTitle>
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
                    {stat.unlocked} / {stat.total} ({stat.percentage}%)
                  </span>
                </div>
                <Progress value={stat.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progresso por Raridade */}
      <Card>
        <CardHeader>
          <CardTitle>Badges por Raridade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rarityStats.map((stat) => (
              <div key={stat.rarity} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${getRarityColor(stat.rarity)}`}>
                      {getRarityLabel(stat.rarity)}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stat.unlocked} / {stat.total} ({stat.percentage}%)
                  </span>
                </div>
                <Progress value={stat.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progresso de Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievementStats.map((stat) => (
              <div key={stat.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{stat.category}</span>
                  <span className="text-sm text-muted-foreground">
                    {stat.completed} / {stat.total} ({stat.percentage}%)
                  </span>
                </div>
                <Progress value={stat.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Em Progresso */}
      <Card>
        <CardHeader>
          <CardTitle>Em Progresso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Badges</span>
                <span className="text-sm text-muted-foreground">{progressStats.badges}</span>
              </div>
              <Progress value={(progressStats.badges / badges.length) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Achievements</span>
                <span className="text-sm text-muted-foreground">{progressStats.achievements}</span>
              </div>
              <Progress value={(progressStats.achievements / achievements.length) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Atividade Recente */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.length > 0 ? (
              recentActivity.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">
                    {'icon' in item ? String(item.icon) : '🏆'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">
                      {'name' in item ? item.name : 'Achievement'}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {'description' in item ? String(item.description) : 'Conquista desbloqueada'}
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
              <p className="text-muted-foreground text-center py-4">
                Nenhuma atividade recente
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
