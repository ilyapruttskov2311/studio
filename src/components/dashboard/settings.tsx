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
import { Save } from 'lucide-react';

interface SettingsProps {
  commentText: string;
  onCommentTextChange: (newText: string) => void;
}

export function Settings({ commentText, onCommentTextChange }: SettingsProps) {
  const [localCommentText, setLocalCommentText] = React.useState(commentText);
  const { toast } = useToast();

  const handleSave = () => {
    onCommentTextChange(localCommentText);
    toast({
      title: 'Settings Saved',
      description: 'Your new comment has been saved.',
    });
  };
  
  React.useEffect(() => {
    setLocalCommentText(commentText);
  }, [commentText]);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Settings</CardTitle>
        <CardDescription>
          Configure the bot's behavior and comments.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="comment-text">Comment Text</Label>
          <Textarea
            id="comment-text"
            placeholder="Enter the comment you want to post."
            value={localCommentText}
            onChange={(e) => setLocalCommentText(e.target.value)}
            className="min-h-[120px] text-sm"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save Comment
        </Button>
      </CardFooter>
    </Card>
  );
}