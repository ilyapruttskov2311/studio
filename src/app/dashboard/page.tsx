"use client";

import * as React from 'react';
import { Header } from '@/components/dashboard/header';
import { ControlPanel } from '@/components/dashboard/control-panel';
import { ActivityLog, type Log } from '@/components/dashboard/activity-log';
import { Settings, type BotSettings } from '@/components/dashboard/settings';
import { Account, type AccountData } from '@/components/dashboard/account';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const INITIAL_SETTINGS: BotSettings = {
  commentText: "፪፩፩፰፪፪፱፪፰፯፱፰፪፱፱፩፰፱፪፪፩፱፰፪፰፯፱да ебать, в тг tmmsk25 дохуя темок, всё об арбитраже, целый гайд по манипуляциям, постоянный доступ к ворку и всё это абсолютно бесплатно 😩፯፪፰፱፱፱፪፱፰፩፪፩፰፩፪፪፱፰፱፪፰፱፩፪፯፪፰",
  cycleInterval: 25000,
  viewDelayMin: 3000,
  viewDelayMax: 6000,
  commentDelayMin: 4000,
  commentDelayMax: 6000,
  shuffleEnabled: true,
  shuffleCharacterCount: 27,
  language: 'ru',
  theme: 'light',
  minViews: 1000,
  maxViews: 1000000,
  minLikes: 100,
  maxLikes: 100000,
  minComments: 10,
  maxComments: 1000,
};

const MOCK_ACCOUNT_DATA: AccountData = {
    username: '@username',
    profilePicture: 'https://placehold.co/150x150.png',
    followers: 125800,
    following: 450,
    likes: 1200000,
    bio: 'Just a user having fun on TikTok!',
};

const shuffleText = (text: string, count: number): string => {
  if (count <= 0) return text;
  if (text.length < count * 2) return text.split('').sort(() => 0.5 - Math.random()).join('');
  
  const prefix = text.substring(0, count).split('').sort(() => 0.5 - Math.random()).join('');
  const suffix = text.substring(text.length - count).split('').sort(() => 0.5 - Math.random()).join('');
  const middle = text.substring(count, text.length - count);
  return prefix + middle + suffix;
};

export default function DashboardPage() {
  const [isRunning, setIsRunning] = React.useState(false);
  const [logs, setLogs] = React.useState<Log[]>([]);
  const [stats, setStats] = React.useState({ videos: 0, comments: 0 });
  const [settings, setSettings] = React.useState<BotSettings>(INITIAL_SETTINGS);
  const { toast } = useToast();
  
  const botIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const commentTimeoutsRef = React.useRef<NodeJS.Timeout[]>([]);

  const addLog = React.useCallback((type: Log['type'], message: string, link?: string) => {
    setLogs(prev => [{ type, message, timestamp: new Date(), link }, ...prev]);
  }, []);

  const runBotCycle = React.useCallback(async () => {
    addLog('info', 'Searching for a suitable video...');
    
    // Simulate API call to get video
    await new Promise(res => setTimeout(res, 1500));
    const videoId = `7${Math.random().toString().substring(2, 20)}`;
    const author = `user_${Math.random().toString(36).substring(2, 9)}`;
    const videoUrl = `https://www.tiktok.com/@${author}/video/${videoId}`;
    
    // Simulate video stats
    const videoStats = {
      views: Math.floor(Math.random() * 1500000),
      likes: Math.floor(Math.random() * 150000),
      comments: Math.floor(Math.random() * 1500),
      isOld: Math.random() > 0.8,
    };

    const isSuitable = 
      videoStats.views >= settings.minViews && videoStats.views <= settings.maxViews &&
      videoStats.likes >= settings.minLikes && videoStats.likes <= settings.maxLikes &&
      videoStats.comments >= settings.minComments && videoStats.comments <= settings.maxComments;

    if (videoStats.isOld) {
        addLog('warning', `Video from @${author} is older than 18 months, skipping.`, videoUrl);
        return;
    }
    
    if (!isSuitable) {
      addLog('warning', `Video from @${author} does not match criteria, skipping. (V: ${videoStats.views}, L: ${videoStats.likes}, C: ${videoStats.comments})`, videoUrl);
      return;
    }

    addLog('success', `Video from @${author} found. Watching for ${settings.viewDelayMin/1000}-${settings.viewDelayMax/1000} seconds.`, videoUrl);
    setStats(prev => ({ ...prev, videos: prev.videos + 1 }));

    const viewDelay = Math.random() * (settings.viewDelayMax - settings.viewDelayMin) + settings.viewDelayMin;
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
        const commentDelay = Math.random() * (settings.commentDelayMax - settings.commentDelayMin) + settings.commentDelayMin;
        const timeoutId = setTimeout(() => {
            const currentCommentCount = stats.comments + i + 1;
            const useShuffle = settings.shuffleEnabled && (currentCommentCount % 10 === 0);
            const replyText = useShuffle ? shuffleText(settings.commentText, settings.shuffleCharacterCount) : settings.commentText;
            
            addLog('success', `[${videoId}] Replied to comment #${i+1}.`);
            setStats(prev => ({ ...prev, comments: prev.comments + 1 }));

            if(useShuffle) {
                addLog('info', 'Shuffled comment text for variety.');
            }

        }, (i + 1) * commentDelay);
        commentTimeoutsRef.current.push(timeoutId);
    }
  }, [addLog, stats.comments, settings]);


  const handleStart = () => {
    setIsRunning(true);
    addLog('info', 'Bot started.');
    toast({ title: "Bot Started", description: "The automator is now running.", variant: 'default' });
    runBotCycle(); // Run first cycle immediately
    botIntervalRef.current = setInterval(runBotCycle, settings.cycleInterval); // Subsequent cycles
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

  React.useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(settings.theme);
  }, [settings.theme]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header onThemeChange={(theme) => setSettings(s => ({...s, theme}))} currentTheme={settings.theme}/>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Tabs defaultValue="bot" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto">
            <TabsTrigger value="bot">Bot</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          <TabsContent value="bot">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
              <div className="grid gap-4 auto-rows-max">
                <ControlPanel
                  isRunning={isRunning}
                  stats={stats}
                  onStart={handleStart}
                  onStop={handleStop}
                  language={settings.language}
                />
              </div>
              <div className="lg:col-span-2">
                <ActivityLog logs={logs} language={settings.language}/>
              </div>
            </div>
          </TabsContent>
           <TabsContent value="settings">
            <div className="max-w-2xl mx-auto">
               <Settings 
                settings={settings}
                onSettingsChange={setSettings}
                isBotRunning={isRunning}
              />
            </div>
          </TabsContent>
          <TabsContent value="account">
            <Account data={MOCK_ACCOUNT_DATA} language={settings.language} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
