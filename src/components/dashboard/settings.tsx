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
import { Save, Timer, Bot, MessageCircle, Eye } from 'lucide-react';
import { Input } from '../ui/input';

export interface BotSettings {
    commentText: string;
    cycleInterval: number;
    viewDelayMin: number;
    viewDelayMax: number;
    commentDelayMin: number;
    commentDelayMax: number;
}

interface SettingsProps {
  settings: BotSettings;
  onSettingsChange: (newSettings: BotSettings) => void;
  isBotRunning: boolean;
}

export function Settings({ settings, onSettingsChange, isBotRunning }: SettingsProps) {
  const [localSettings, setLocalSettings] = React.useState(settings);
  const { toast } = useToast();

  const handleSave = () => {
    onSettingsChange(localSettings);
    toast({
      title: 'Settings Saved',
      description: 'Your new settings have been saved.',
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
  
  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Settings</CardTitle>
        <CardDescription>
          Configure the bot's behavior and comments.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="commentText" className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> Comment Text</Label>
          <Textarea
            id="commentText"
            placeholder="Enter the comment you want to post."
            value={localSettings.commentText}
            onChange={handleInputChange}
            className="min-h-[100px] text-sm"
            disabled={isBotRunning}
          />
        </div>

        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="cycleInterval" className="flex items-center gap-2"><Bot className="h-4 w-4" /> Cycle Interval (ms)</Label>
                <Input id="cycleInterval" type="number" value={localSettings.cycleInterval} onChange={handleNumberInputChange} placeholder="e.g., 25000" disabled={isBotRunning} />
                <p className="text-xs text-muted-foreground">Time between searching for new videos.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="viewDelayMin" className="flex items-center gap-2"><Eye className="h-4 w-4" /> View Delay Min (ms)</Label>
                    <Input id="viewDelayMin" type="number" value={localSettings.viewDelayMin} onChange={handleNumberInputChange} placeholder="e.g., 3000" disabled={isBotRunning}/>
                </div>
                <div className="space-y-2">
                     <Label htmlFor="viewDelayMax" className="flex items-center gap-2"><Eye className="h-4 w-4" /> View Delay Max (ms)</Label>
                    <Input id="viewDelayMax" type="number" value={localSettings.viewDelayMax} onChange={handleNumberInputChange} placeholder="e.g., 6000" disabled={isBotRunning} />
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="commentDelayMin" className="flex items-center gap-2"><Timer className="h-4 w-4" /> Reply Delay Min (ms)</Label>
                    <Input id="commentDelayMin" type="number" value={localSettings.commentDelayMin} onChange={handleNumberInputChange} placeholder="e.g., 4000" disabled={isBotRunning}/>
                </div>
                <div className="space-y-2">
                     <Label htmlFor="commentDelayMax" className="flex items-center gap-2"><Timer className="h-4 w-4" /> Reply Delay Max (ms)</Label>
                    <Input id="commentDelayMax" type="number" value={localSettings.commentDelayMax} onChange={handleNumberInputChange} placeholder="e.g., 6000" disabled={isBotRunning}/>
                </div>
            </div>
        </div>

      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="w-full" disabled={isBotRunning}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </CardFooter>
    </Card>
  );
}
