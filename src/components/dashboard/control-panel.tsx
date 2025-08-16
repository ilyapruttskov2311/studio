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

interface ControlPanelProps {
  isRunning: boolean;
  stats: {
    videos: number;
    comments: number;
  };
  onStart: () => void;
  onStop: () => void;
}

export function ControlPanel({ isRunning, stats, onStart, onStop }: ControlPanelProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Control Panel</CardTitle>
        <CardDescription>Start or stop the bot and monitor its activity.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Status</span>
            {isRunning ? (
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="font-medium text-green-600">Running</span>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                     <span className="relative flex h-3 w-3">
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-400"></span>
                    </span>
                    <span className="font-medium text-muted-foreground">Stopped</span>
                </div>
            )}
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1 rounded-lg border p-3">
                <p className="text-sm font-medium text-muted-foreground">Videos Processed</p>
                <div className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-primary" />
                    <p className="text-2xl font-bold">{stats.videos}</p>
                </div>
            </div>
            <div className="flex flex-col space-y-1 rounded-lg border p-3">
                <p className="text-sm font-medium text-muted-foreground">Comments Posted</p>
                <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <p className="text-2xl font-bold">{stats.comments}</p>
                </div>
            </div>
        </div>

      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={onStart} disabled={isRunning} className="w-full bg-green-500 text-white hover:bg-green-600">
          <Play className="mr-2 h-4 w-4" /> Start Bot
        </Button>
        <Button onClick={onStop} disabled={!isRunning} variant="destructive" className="w-full">
           <Square className="mr-2 h-4 w-4" />
           Stop Bot
        </Button>
      </CardFooter>
    </Card>
  );
}
