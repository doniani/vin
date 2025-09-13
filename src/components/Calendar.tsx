import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'recruitment' | 'showcase' | 'camp' | 'test' | 'deadline' | 'personal';
  priority: 'low' | 'medium' | 'high';
  location?: string;
  description?: string;
  isCompleted?: boolean;
}

interface CalendarProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: string) => void;
  onAddEvent?: (date: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  events,
  onEventClick,
  onDateClick,
  onAddEvent
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getEventsForDate = (day: number) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'recruitment': return 'bg-blue-100 text-blue-800';
      case 'showcase': return 'bg-green-100 text-green-800';
      case 'camp': return 'bg-purple-100 text-purple-800';
      case 'test': return 'bg-red-100 text-red-800';
      case 'deadline': return 'bg-orange-100 text-orange-800';
      case 'personal': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };


  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();
  const isToday = (day: number) => {
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
            >
              Hoje
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {dayNames.map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dayEvents = day ? getEventsForDate(day) : [];
            const isCurrentDay = day && isToday(day);
            
            return (
              <div
                key={index}
                className={`
                  min-h-[100px] p-1 border border-gray-200 rounded cursor-pointer
                  ${day ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'}
                  ${isCurrentDay ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
                `}
                onClick={() => {
                  if (day) {
                    onDateClick?.(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
                  }
                }}
              >
                {day && (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium ${isCurrentDay ? 'text-blue-600' : 'text-foreground'}`}>
                        {day}
                      </span>
                      {dayEvents.length > 0 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddEvent?.(`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map(event => (
                        <div
                          key={event.id}
                          className={`
                            text-xs p-1 rounded cursor-pointer truncate
                            ${getEventTypeColor(event.type)}
                            ${event.isCompleted ? 'opacity-60 line-through' : ''}
                          `}
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventClick?.(event);
                          }}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-muted-foreground text-center">
                          +{dayEvents.length - 3} mais
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
