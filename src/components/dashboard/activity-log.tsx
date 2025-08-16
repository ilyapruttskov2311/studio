"use client";

import { CheckCircle2, Info, XCircle, AlertTriangle, Link } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const translations = {
  en: {
    title: 'Activity Log',
    description: "A real-time stream of the bot's actions and events.",
    noActivity: 'No activity yet. Start the bot to see the logs.',
    viewVideo: 'View Video',
  },
  ru: {
    title: 'Лог Активности',
    description: 'Поток действий и событий бота в реальном времени.',
    noActivity: 'Пока нет активности. Запустите бота, чтобы увидеть логи.',
    viewVideo: 'Посмотреть видео',
  },
};

export interface Log {
  type: 'success' | 'info' | 'error' | 'warning';
  message: string;
  timestamp: Date;
  link?: string;
}

interface ActivityLogProps {
  logs: Log[];
  language: 'en' | 'ru';
}

const logConfig = {
  info: {
    icon: Info,
    color: 'text-blue-500',
  },
  success: {
    icon: CheckCircle2,
    color: 'text-green-500',
  },
  error: {
    icon: XCircle,
    color: 'text-red-500',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-yellow-500',
  },
};

export function ActivityLog({ logs, language }: ActivityLogProps) {
  const t = translations[language];
  return (
    <Card className="shadow-lg h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">{t.title}</CardTitle>
        <CardDescription>
          {t.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-[450px] pr-4">
          <div className="space-y-4">
            {logs.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center">
                    <Info className="h-8 w-8 mb-2"/>
                    <p>{t.noActivity}</p>
                </div>
            )}
            <TooltipProvider>
              {logs.map((log, index) => {
                const Icon = logConfig[log.type].icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className={cn("mt-1", logConfig[log.type].color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{log.message}</p>
                      <div className="flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                             <p className="text-xs text-muted-foreground cursor-default">
                              {log.timestamp.toLocaleTimeString()}
                             </p>
                          </TooltipTrigger>
                          <TooltipContent>
                             <p>{log.timestamp.toLocaleString()}</p>
                          </TooltipContent>
                        </Tooltip>
                        {log.link && (
                          <>
                           <span className="text-xs text-muted-foreground">&middot;</span>
                           <a 
                            href={log.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                          >
                            <Link className="h-3 w-3" />
                            {t.viewVideo}
                           </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </TooltipProvider>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
