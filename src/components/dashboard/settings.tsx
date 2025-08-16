"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Save, Timer, Bot, MessageCircle, Eye, Languages, Shuffle } from 'lucide-react';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from '../ui/switch';


const translations = {
  en: {
    title: 'Settings',
    description: "Configure the bot's behavior and comments.",
    commentText: 'Comment Text',
    cycleInterval: 'Cycle Interval (ms)',
    cycleIntervalDesc: 'Time between searching for new videos.',
    viewDelayMin: 'View Delay Min (ms)',
    viewDelayMax: 'View Delay Max (ms)',
    replyDelayMin: 'Reply Delay Min (ms)',
    replyDelayMax: 'Reply Delay Max (ms)',
    saveSettings: 'Save Settings',
    settingsSaved: 'Settings Saved',
    settingsSavedDesc: 'Your new settings have been saved.',
    language: 'Language',
    russian: 'Russian',
    english: 'English',
    shuffle: 'Shuffle symbols',
    shuffleDesc: 'Randomize symbols in comment text for uniqueness.'
  },
  ru: {
    title: 'Настройки',
    description: 'Настройте поведение и комментарии бота.',
    commentText: 'Текст комментария',
    cycleInterval: 'Интервал циклов (мс)',
    cycleIntervalDesc: 'Время между поиском новых видео.',
    viewDelayMin: 'Мин. задержка просмотра (мс)',
    viewDelayMax: 'Макс. задержка просмотра (мс)',
    replyDelayMin: 'Мин. задержка ответа (мс)',
    replyDelayMax: 'Макс. задержка ответа (мс)',
    saveSettings: 'Сохранить настройки',
    settingsSaved: 'Настройки сохранены',
    settingsSavedDesc: 'Ваши новые настройки были сохранены.',
    language: 'Язык',
    russian: 'Русский',
    english: 'Английский',
    shuffle: 'Перемешивать символы',
    shuffleDesc: 'Перемешивать символы в тексте комментария для уникальности.'
  },
};

export interface BotSettings {
    commentText: string;
    cycleInterval: number;
    viewDelayMin: number;
    viewDelayMax: number;
    commentDelayMin: number;
    commentDelayMax: number;
    shuffleEnabled: boolean;
    language: 'en' | 'ru';
    theme: 'light' | 'dark';
}

interface SettingsProps {
  settings: BotSettings;
  onSettingsChange: (newSettings: BotSettings) => void;
  isBotRunning: boolean;
}

export function Settings({ settings, onSettingsChange, isBotRunning }: SettingsProps) {
  const [localSettings, setLocalSettings] = React.useState(settings);
  const { toast } = useToast();
  const t = translations[localSettings.language];

  const handleSave = () => {
    onSettingsChange(localSettings);
    toast({
      title: t.settingsSaved,
      description: t.settingsSavedDesc,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setLocalSettings(prev => ({ ...prev, [id]: value }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLocalSettings(prev => ({ ...prev, [id]: Number(value) }));
  }

  const handleSwitchChange = (checked: boolean) => {
    setLocalSettings(prev => ({ ...prev, shuffleEnabled: checked }));
  }

  const handleLanguageChange = (value: 'en' | 'ru') => {
    setLocalSettings(prev => ({ ...prev, language: value }));
  }
  
  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">{t.title}</CardTitle>
        <CardDescription>
          {t.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="language" className="flex items-center gap-2"><Languages className="h-4 w-4" /> {t.language}</Label>
            <RadioGroup 
                defaultValue={localSettings.language} 
                className="flex space-x-4" 
                onValueChange={handleLanguageChange}
                disabled={isBotRunning}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ru" id="ru" />
                    <Label htmlFor="ru">{t.russian}</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="en" id="en" />
                    <Label htmlFor="en">{t.english}</Label>
                </div>
            </RadioGroup>
        </div>
      
        <div className="space-y-2">
          <Label htmlFor="commentText" className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> {t.commentText}</Label>
          <Textarea
            id="commentText"
            placeholder="Enter the comment you want to post."
            value={localSettings.commentText}
            onChange={handleInputChange}
            className="min-h-[100px] text-sm"
            disabled={isBotRunning}
          />
        </div>

        <div className="flex items-center space-x-2">
            <Switch id="shuffle-enabled" checked={localSettings.shuffleEnabled} onCheckedChange={handleSwitchChange} disabled={isBotRunning}/>
            <div className='grid gap-1.5'>
                <Label htmlFor="shuffle-enabled" className='flex items-center gap-2'><Shuffle className="h-4 w-4" />{t.shuffle}</Label>
                <p className="text-xs text-muted-foreground">{t.shuffleDesc}</p>
            </div>
        </div>

        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="cycleInterval" className="flex items-center gap-2"><Bot className="h-4 w-4" /> {t.cycleInterval}</Label>
                <Input id="cycleInterval" type="number" value={localSettings.cycleInterval} onChange={handleNumberInputChange} placeholder="e.g., 25000" disabled={isBotRunning} />
                <p className="text-xs text-muted-foreground">{t.cycleIntervalDesc}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="viewDelayMin" className="flex items-center gap-2"><Eye className="h-4 w-4" /> {t.viewDelayMin}</Label>
                    <Input id="viewDelayMin" type="number" value={localSettings.viewDelayMin} onChange={handleNumberInputChange} placeholder="e.g., 3000" disabled={isBotRunning}/>
                </div>
                <div className="space-y-2">
                     <Label htmlFor="viewDelayMax" className="flex items-center gap-2"><Eye className="h-4 w-4" /> {t.viewDelayMax}</Label>
                    <Input id="viewDelayMax" type="number" value={localSettings.viewDelayMax} onChange={handleNumberInputChange} placeholder="e.g., 6000" disabled={isBotRunning} />
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="commentDelayMin" className="flex items-center gap-2"><Timer className="h-4 w-4" /> {t.replyDelayMin}</Label>
                    <Input id="commentDelayMin" type="number" value={localSettings.commentDelayMin} onChange={handleNumberInputChange} placeholder="e.g., 4000" disabled={isBotRunning}/>
                </div>
                <div className="space-y-2">
                     <Label htmlFor="commentDelayMax" className="flex items-center gap-2"><Timer className="h-4 w-4" /> {t.replyDelayMax}</Label>
                    <Input id="commentDelayMax" type="number" value={localSettings.commentDelayMax} onChange={handleNumberInputChange} placeholder="e.g., 6000" disabled={isBotRunning}/>
                </div>
            </div>
        </div>

      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="w-full" disabled={isBotRunning}>
          <Save className="mr-2 h-4 w-4" />
          {t.saveSettings}
        </Button>
      </CardFooter>
    </Card>
  );
}
