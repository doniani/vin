import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  User, 
  BarChart3, 
  Calendar, 
  MessageSquare, 
  Target, 
  DollarSign, 
  Shield, 
  Trophy,
  Settings
} from 'lucide-react';
import { cn } from '@/utils/cn';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Perfil do Atleta', href: '/profile', icon: User },
  { name: 'Evolução', href: '/evolution', icon: BarChart3 },
  { name: 'Oportunidades', href: '/opportunities', icon: Calendar },
  { name: 'Comunicação', href: '/communication', icon: MessageSquare },
  { name: 'Metas', href: '/goals', icon: Target },
  { name: 'Finanças', href: '/finance', icon: DollarSign },
  { name: 'Compliance', href: '/compliance', icon: Shield },
  { name: 'Gamificação', href: '/gamification', icon: Trophy },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

interface SidebarProps {
  onItemClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onItemClick}
              className={({ isActive }) =>
                cn(
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )
              }
            >
              <item.icon
                className={cn(
                  'mr-3 flex-shrink-0 h-5 w-5',
                  'text-muted-foreground group-hover:text-accent-foreground'
                )}
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};
