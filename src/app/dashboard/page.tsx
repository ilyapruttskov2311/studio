"use client";

import * as React from 'react';
import { Header } from '@/components/dashboard/header';
import { ControlPanel } from '@/components/dashboard/control-panel';
import { ActivityLog, type Log } from '@/components/dashboard/activity-log';
import { Settings, type BotSettings } from '@/components/dashboard/settings';
import { Account, type AccountData } from '@/components/dashboard/account';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

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
  tag: '',
};

const shuffleText = (text: string, count: number): string => {
  if (count <= 0) return text;
  if (text.length < count * 2) return text.split('').sort(() => 0.5 - Math.random()).join('');
  
  const prefix = text.substring(0, count).split('').sort(() => 0.5 - Math.random()).join('');
  const suffix = text.substring(text.length - count).split('').sort(() => 0.5 - Math.random()).join('');
  const middle = text.substring(count, text.length - count);
  return prefix + middle + suffix;
};

const translations = {
    en: {
      bot: 'Bot',
      settings: 'Settings',
      account: 'Account',
      noAccounts: 'No accounts found.',
      addAccountPrompt: 'Please add an account to get started.',
      goToLogin: 'Add Account',
    },
    ru: {
      bot: 'Бот',
      settings: 'Настройки',
      account: 'Аккаунт',
      noAccounts: 'Аккаунты не найдены.',
      addAccountPrompt: 'Пожалуйста, добавьте аккаунт, чтобы начать.',
      goToLogin: 'Добавить аккаунт',
    },
};

export default function DashboardPage() {
  const [isRunning, setIsRunning] = React.useState(false);
  const [logs, setLogs] = React.useState<Log[]>([]);
  const [stats, setStats] = React.useState({ videos: 0, comments: 0 });
  const [settings, setSettings] = React.useState<BotSettings>(INITIAL_SETTINGS);
  
  const [accounts, setAccounts] = React.useState<AccountData[]>([]);
  const [activeAccountId, setActiveAccountId] = React.useState<string | null>(null);

  const { toast } = useToast();
  const router = useRouter();
  
  const botIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const commentTimeoutsRef = React.useRef<NodeJS.Timeout[]>([]);

  // Load accounts from localStorage on initial render
  React.useEffect(() => {
    try {
      const savedAccounts = localStorage.getItem('tiktok_accounts');
      const savedActiveId = localStorage.getItem('active_tiktok_account_id');
      if (savedAccounts) {
        const parsedAccounts = JSON.parse(savedAccounts);
        setAccounts(parsedAccounts);
        if (savedActiveId && parsedAccounts.find((a: AccountData) => a.id === savedActiveId)) {
          setActiveAccountId(savedActiveId);
        } else if (parsedAccounts.length > 0) {
          setActiveAccountId(parsedAccounts[0].id);
        }
      }
    } catch (error) {
      console.error("Failed to parse accounts from localStorage", error);
    }
  }, []);

  // Save accounts to localStorage whenever they change
  React.useEffect(() => {
    if (accounts.length > 0) {
      localStorage.setItem('tiktok_accounts', JSON.stringify(accounts));
    } else {
      localStorage.removeItem('tiktok_accounts');
    }
    if (activeAccountId) {
      localStorage.setItem('active_tiktok_account_id', activeAccountId);
    } else {
      localStorage.removeItem('active_tiktok_account_id');
    }
  }, [accounts, activeAccountId]);
  
  const activeAccount = React.useMemo(() => {
    return accounts.find(acc => acc.id === activeAccountId);
  }, [accounts, activeAccountId]);

  const t = translations[settings.language];

  const addLog = React.useCallback((type: Log['type'], message: string, link?: string) => {
    setLogs(prev => [{ type, message, timestamp: new Date(), link }, ...prev]);
  }, []);

  const runBotCycle = React.useCallback(async () => {
    if (!activeAccount) {
      addLog('error', 'No active account selected.');
      return;
    }

    let logMessage = `[${activeAccount.username}] `;
    if (settings.tag) {
        logMessage += `Searching for a suitable video with tag #${settings.tag}...`;
    } else {
        logMessage += 'Searching for a suitable video...';
    }
    addLog('info', logMessage);
    
    // =================================================================
    // TODO: Implement TikTok API call to find a video
    // This should return an object with video details: { id, author, url, views, likes, comments, isOld }
    //
    // Example:
    // const video = await tiktokApi.findVideo({
    //   tag: settings.tag,
    //   minViews: settings.minViews,
    //   maxViews: settings.maxViews,
    //   // ... other params
    // });
    // =================================================================
    addLog('warning', 'Video search is not implemented. Using placeholder data.');
    await new Promise(res => setTimeout(res, 1500));
    const video = {
        id: `7${Math.random().toString().substring(2, 20)}`,
        author: `user_${Math.random().toString(36).substring(2, 9)}`,
        url: `https://www.tiktok.com/@user/video/12345`,
        views: Math.floor(Math.random() * 1500000),
        likes: Math.floor(Math.random() * 150000),
        comments: Math.floor(Math.random() * 1500),
        isOld: Math.random() > 0.8,
    };
    
    if (!video) {
        addLog('warning', `No suitable videos found for ${activeAccount.username}.`);
        return;
    }

    if (video.isOld) {
        addLog('warning', `Video from @${video.author} is older than 18 months, skipping.`, video.url);
        return;
    }

    addLog('success', `Video from @${video.author} found. Watching for ${settings.viewDelayMin/1000}-${settings.viewDelayMax/1000} seconds.`, video.url);
    setStats(prev => ({ ...prev, videos: prev.videos + 1 }));

    const viewDelay = Math.random() * (settings.viewDelayMax - settings.viewDelayMin) + settings.viewDelayMin;
    await new Promise(res => setTimeout(res, viewDelay));

    addLog('info', `[${video.id}] Analyzing comments...`);
    
    // =================================================================
    // TODO: Implement TikTok API call to get comments for the video
    // This should return an array of comment objects that haven't been replied to.
    //
    // Example:
    // const commentsToReply = await tiktokApi.getComments(video.id);
    // =================================================================
    const commentsToReply = Array.from({ length: Math.floor(Math.random() * 10) });

    if(commentsToReply.length === 0) {
        addLog('warning', `[${video.id}] No new comments to reply to.`);
        return;
    }

    addLog('info', `[${video.id}] Found ${commentsToReply.length} new comments to reply to.`);

    for (let i = 0; i < commentsToReply.length; i++) {
        const commentDelay = Math.random() * (settings.commentDelayMax - settings.commentDelayMin) + settings.commentDelayMin;
        const timeoutId = setTimeout(() => {
            const currentCommentCount = stats.comments + i + 1;
            const useShuffle = settings.shuffleEnabled && (currentCommentCount % 10 === 0);
            let commentToPost = settings.commentText;

            if (useShuffle) {
                commentToPost = shuffleText(commentToPost, settings.shuffleCharacterCount);
                addLog('info', 'Shuffled comment text for variety.');
            }
            
            // =================================================================
            // TODO: Implement TikTok API call to post a comment reply
            //
            // Example:
            // await tiktokApi.postComment({
            //   videoId: video.id,
            //   commentId: commentsToReply[i].id,
            //   text: commentToPost,
            // });
            // =================================================================

            addLog('success', `[${video.id}] Replied to comment #${i+1}.`);
            setStats(prev => ({ ...prev, comments: prev.comments + 1 }));

        }, (i + 1) * commentDelay);
        commentTimeoutsRef.current.push(timeoutId);
    }
  }, [addLog, stats.comments, settings, activeAccount]);


  const handleStart = () => {
    if (!activeAccount) {
      toast({ title: "Error", description: "No active account selected. Please select an account first.", variant: 'destructive' });
      return;
    }
    setIsRunning(true);
    addLog('info', `Bot started for ${activeAccount.username}.`);
    toast({ title: "Bot Started", description: "The automator is now running.", variant: 'default' });
    runBotCycle();
    botIntervalRef.current = setInterval(runBotCycle, settings.cycleInterval);
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

  if (accounts.length === 0) {
    return (
       <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background text-center p-4">
         <h1 className="text-2xl font-bold mb-2">{t.noAccounts}</h1>
         <p className="text-muted-foreground mb-4">{t.addAccountPrompt}</p>
         <Button onClick={() => router.push('/login')}>{t.goToLogin}</Button>
       </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header
        onThemeChange={(theme) => setSettings(s => ({...s, theme}))}
        currentTheme={settings.theme}
        accounts={accounts}
        activeAccountId={activeAccountId}
        onAccountChange={setActiveAccountId}
        onAddAccount={() => router.push('/login')}
      />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Tabs defaultValue="bot" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto border">
            <TabsTrigger value="bot">{t.bot}</TabsTrigger>
            <TabsTrigger value="settings">{t.settings}</TabsTrigger>
            <TabsTrigger value="account">{t.account}</TabsTrigger>
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
            <Account data={activeAccount!} language={settings.language} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
