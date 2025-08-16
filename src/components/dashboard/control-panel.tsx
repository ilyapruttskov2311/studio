"use client";

import { Play, Square, Video, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const translations = {
  en: {
    title: 'Control Panel',
    description: 'Start or stop the bot and monitor its activity.',
    status: 'Status',
    running: 'Running',
    stopped: 'Stopped',
    videosProcessed: 'Videos Processed',
    commentsPosted: 'Comments Posted',
    startBot: 'Start Bot',
    stopBot: 'Stop Bot',
  },
  ru: {
    title: 'Панель управления',
    description: 'Запускайте или останавливайте бота и следите за его активностью.',
    status: 'Статус',
    running: 'Работает',
    stopped: 'Остановлен',
    videosProcessed: 'Обработано видео',
    commentsPosted: 'Опубликовано комментариев',
    startBot: 'Запустить бота',
    stopBot: 'Остановить бота',
  },
};

interface ControlPanelProps {
  isRunning: boolean;
  stats: {
    videos: number;
    comments: number;
  };
  onStart: () => void;
  onStop: () => void;
  language: 'en' | 'ru';
}

export function ControlPanel({ isRunning, stats, onStart, onStop, language }: ControlPanelProps) {
  const t = translations[language];

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">{t.title}</CardTitle>
        <CardDescription>{t.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">{t.status}</span>
            {isRunning ? (
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="font-medium text-green-600">{t.running}</span>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                     <span className="relative flex h-3 w-3">
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-400"></span>
                    </span>
                    <span className="font-medium text-muted-foreground">{t.stopped}</span>
                </div>
            )}
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1 rounded-lg border p-3">
                <p className="text-sm font-medium text-muted-foreground">{t.videosProcessed}</p>
                <div className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-primary" />
                    <p className="text-2xl font-bold">{stats.videos}</p>
                </div>
            </div>
            <div className="flex flex-col space-y-1 rounded-lg border p-3">
                <p className="text-sm font-medium text-muted-foreground">{t.commentsPosted}</p>
                <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <p className="text-2xl font-bold">{stats.comments}</p>
                </div>
            </div>
        </div>

      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={onStart} disabled={isRunning} className="w-full bg-green-500 text-white hover:bg-green-600">
          <Play className="mr-2 h-4 w-4" /> {t.startBot}
        </Button>
        <Button onClick={onStop} disabled={!isRunning} variant="destructive" className="w-full">
           <Square className="mr-2 h-4 w-4" />
           {t.stopBot}
        </Button>
      </CardFooter>
    </Card>
  );
}
