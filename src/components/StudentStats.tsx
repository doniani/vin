import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, GraduationCap, Heart, Target } from 'lucide-react';

interface StudentStatsProps {
  gpa: number;
  height: number;
  weight: number;
  jerseyNumber: number;
  sport: string;
}

export const StudentStats: React.FC<StudentStatsProps> = ({
  gpa,
  height,
  weight,
  jerseyNumber
}) => {
  const stats = [
    {
      title: 'GPA',
      value: gpa.toFixed(1),
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Altura',
      value: `${height}cm`,
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Peso',
      value: `${weight}kg`,
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Número',
      value: `#${jerseyNumber}`,
      icon: Trophy,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center space-x-2">
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
