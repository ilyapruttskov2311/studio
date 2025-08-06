"use client";

import * as React from 'react';
import { Header } from '@/components/dashboard/header';
import { ControlPanel } from '@/components/dashboard/control-panel';
import { ActivityLog, type Log } from '@/components/dashboard/activity-log';
import { useToast } from '@/hooks/use-toast';

const COMMENT_TEXT = "፪፩፩፰፪፪፱፪፰፯፱፰፪፱፱፩፰፱፪፪፩፱፰፪፰፯፱да ебать, в тг tmmsk25 дохуя темок, всё об арбитраже, целый гайд по манипуляциям, постоянный доступ к ворку и всё это абсолютно бесплатно 😩፯፪፰፱፱፱፪፱፰፩፪፩፰፩፪፪፱፰፱፪፰፱፩፪፯፪፰";

const shuffleText = (text: string): string => {
  const prefix = text.substring(0, 27).split('').sort(() => 0.5 - Math.random()).join('');
  const suffix = text.substring(text.length - 27).split('').sort(() => 0.5 - Math.random()).join('');
  const middle = text.substring(27, text.length - 27);
  return prefix + middle + suffix;
};

export default function DashboardPage() {
  const [isRunning, setIsRunning] = React.useState(false);
  const [logs, setLogs] = React.useState<Log[]>([]);
  const [stats, setStats] = React.useState({ videos: 0, comments: 0 });
  const { toast } = useToast();
  
  const botIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const commentTimeoutsRef = React.useRef<NodeJS.Timeout[]>([]);

  const addLog = React.useCallback((type: Log['type'], message: string) => {
    setLogs(prev => [{ type, message, timestamp: new Date() }, ...prev]);
  }, []);

  const runBotCycle = React.useCallback(async () => {
    addLog('info', 'Searching for a suitable video...');
    
    // Simulate API call to get video
    await new Promise(res => setTimeout(res, 1500));
    const videoId = `vid_${Math.random().toString(36).substring(2, 9)}`;
    const isOld = Math.random() > 0.8; // Simulate finding an old video

    if (isOld) {
        addLog('warning', `Video ${videoId} is older than 18 months, skipping.`);
        return;
    }

    addLog('success', `Video found: ${videoId}. Watching for 3-6 seconds.`);
    setStats(prev => ({ ...prev, videos: prev.videos + 1 }));

    const viewDelay = Math.random() * (6000 - 3000) + 3000;
    await new Promise(res => setTimeout(res, viewDelay));

    addLog('info', `[${videoId}] Analyzing comments...`);
    const totalComments = Math.floor(Math.random() * 50);
    let commentsToPost = Math.floor(Math.random() * 8) + 2; // 2-10 comments

    if (totalComments < 20) {
        commentsToPost = Math.floor(totalComments / 2);
    }
    if(commentsToPost === 0) {
        addLog('warning', `[${videoId}] No comments to reply to.`);
        return;
    }

    addLog('info', `[${videoId}] Found ${commentsToPost} new comments to reply to.`);

    for (let i = 0; i < commentsToPost; i++) {
        const commentDelay = Math.random() * (6000 - 4000) + 4000;
        const timeoutId = setTimeout(() => {
            const currentCommentCount = stats.comments + i + 1;
            const replyText = currentCommentCount % 10 === 0 ? shuffleText(COMMENT_TEXT) : COMMENT_TEXT;
            
            addLog('success', `[${videoId}] Replied to comment #${i+1}.`);
            setStats(prev => ({ ...prev, comments: prev.comments + 1 }));

            if(currentCommentCount % 10 === 0) {
                addLog('info', 'Shuffled comment text for variety.');
            }

        }, (i + 1) * commentDelay);
        commentTimeoutsRef.current.push(timeoutId);
    }
  }, [addLog, stats.comments]);


  const handleStart = () => {
    setIsRunning(true);
    addLog('info', 'Bot started.');
    toast({ title: "Bot Started", description: "The automator is now running.", variant: 'default' });
    runBotCycle(); // Run first cycle immediately
    botIntervalRef.current = setInterval(runBotCycle, 25000); // Subsequent cycles
  };

  const handleStop = () => {
    setIsRunning(false);
    if (botIntervalRef.current) {
      clearInterval(botIntervalRef.current);
      botIntervalRef.current = null;
    }
    commentTimeoutsRef.current.forEach(clearTimeout);
    commentTimeoutsRef.current = [];
    addLog('info', 'Bot stopped.');
    toast({ title: "Bot Stopped", description: "The automator has been paused.", variant: 'default' });
  };
  
  React.useEffect(() => {
    addLog('info', 'Dashboard loaded. Bot is ready.');
    return () => {
        if (botIntervalRef.current) clearInterval(botIntervalRef.current);
        commentTimeoutsRef.current.forEach(clearTimeout);
    };
  }, [addLog]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ControlPanel
            isRunning={isRunning}
            stats={stats}
            onStart={handleStart}
            onStop={handleStop}
          />
          <div className="lg:col-span-2">
            <ActivityLog logs={logs} />
          </div>
        </div>
      </main>
    </div>
  );
}
