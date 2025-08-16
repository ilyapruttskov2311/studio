
"use client";

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Users, Heart, UserPlus } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

const translations = {
    en: {
      accountDetails: 'Account Details',
      bio: 'Bio',
      followers: 'Followers',
      following: 'Following',
      likes: 'Likes',
    },
    ru: {
      accountDetails: 'Информация об аккаунте',
      bio: 'Биография',
      followers: 'Подписчики',
      following: 'Подписки',
      likes: 'Лайки',
    },
};

export interface AccountData {
    id: string;
    username: string;
    profilePicture: string;
    followers: number;
    following: number;
    likes: number;
    bio: string;
}

interface AccountProps {
    data: AccountData;
    language: 'en' | 'ru';
}

function AccountSkeleton() {
    return (
        <Card className="max-w-2xl mx-auto mt-4 shadow-lg">
            <CardHeader>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-64 mt-2" />
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="space-y-2 text-center sm:text-left">
                        <Skeleton className="h-8 w-40" />
                        <Skeleton className="h-4 w-72 mt-2" />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-center">
                    <Skeleton className="h-28 w-full rounded-lg" />
                    <Skeleton className="h-28 w-full rounded-lg" />
                    <Skeleton className="h-28 w-full rounded-lg" />
                </div>
            </CardContent>
        </Card>
    );
}


export function Account({ data, language }: AccountProps) {
    const t = translations[language];

    if (!data) {
        return <AccountSkeleton />;
    }

    return (
        <Card className="max-w-2xl mx-auto mt-4 shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline">{t.accountDetails}</CardTitle>
                <CardDescription>Your TikTok profile overview for {data.username}.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8">
                    <Avatar className="h-24 w-24 border">
                        <AvatarImage src={data.profilePicture} alt={data.username} data-ai-hint="profile avatar" />
                        <AvatarFallback>{data.username.charAt(1).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="text-center sm:text-left">
                        <h2 className="text-2xl font-bold">{data.username}</h2>
                        <p className="text-muted-foreground mt-2">{t.bio}: {data.bio}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 text-center">
                    <div className="flex flex-col items-center justify-center p-4 rounded-lg border">
                        <Users className="h-6 w-6 text-primary mb-2" />
                        <p className="text-xl font-bold">{data.followers.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{t.followers}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 rounded-lg border">
                        <UserPlus className="h-6 w-6 text-primary mb-2" />
                        <p className="text-xl font-bold">{data.following.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{t.following}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 rounded-lg border">
                        <Heart className="h-6 w-6 text-primary mb-2" />
                        <p className="text-xl font-bold">{data.likes.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{t.likes}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
