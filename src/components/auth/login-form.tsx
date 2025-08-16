"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { TikTokIcon } from '@/components/icons';
import { type AccountData } from '@/components/dashboard/account';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Username is required.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    // Simulate API call for authentication and fetching account data
    setTimeout(() => {
      try {
        const newAccount: AccountData = {
          id: `id_${new Date().getTime()}`,
          username: values.username.startsWith('@') ? values.username : `@${values.username}`,
          profilePicture: `https://placehold.co/150x150.png?text=${values.username.charAt(0).toUpperCase()}`,
          followers: Math.floor(Math.random() * 200000),
          following: Math.floor(Math.random() * 1000),
          likes: Math.floor(Math.random() * 2000000),
          bio: `Bio for ${values.username}`,
        };

        const existingAccountsRaw = localStorage.getItem('tiktok_accounts');
        const existingAccounts = existingAccountsRaw ? JSON.parse(existingAccountsRaw) : [];
        
        // Prevent adding duplicate usernames
        if (existingAccounts.some((acc: AccountData) => acc.username === newAccount.username)) {
            form.setError('username', { type: 'manual', message: 'This account has already been added.' });
            setIsLoading(false);
            return;
        }

        const updatedAccounts = [...existingAccounts, newAccount];

        localStorage.setItem('tiktok_accounts', JSON.stringify(updatedAccounts));
        localStorage.setItem('active_tiktok_account_id', newAccount.id);

        router.push('/dashboard');
      } catch (error) {
        console.error("Failed to add account:", error);
        setIsLoading(false);
        // Here you might want to show a generic error toast to the user
      }
    }, 1500);
  };

  return (
    <Card className="shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TikTok Username</FormLabel>
                  <FormControl>
                    <Input placeholder="@username" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className='flex-col gap-4'>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <TikTokIcon className="mr-2 h-4 w-4" />
                  Add Account
                </>
              )}
            </Button>
            <Button variant="outline" className="w-full" onClick={() => router.push('/dashboard')} disabled={isLoading}>
                Cancel
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
