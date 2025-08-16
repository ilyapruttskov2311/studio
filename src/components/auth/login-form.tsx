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
  emailOrPhone: z.string().min(1, { message: 'Email or phone number is required.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrPhone: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    // =================================================================
    // TODO: Implement actual TikTok authentication here.
    // This function should call the TikTok API to verify credentials.
    // If successful, it should return the user's account data.
    //
    // Example:
    // const accountData = await tiktokApi.login(values.emailOrPhone, values.password);
    // if (!accountData) {
    //   form.setError('emailOrPhone', { type: 'manual', message: 'Invalid credentials.' });
    //   setIsLoading(false);
    //   return;
    // }
    // =================================================================
    console.log("Simulating authentication for:", values.emailOrPhone);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const username = values.emailOrPhone.includes('@')
        ? values.emailOrPhone.split('@')[0]
        : values.emailOrPhone;

      // Placeholder account data
      const newAccount: AccountData = {
        id: `id_${new Date().getTime()}`,
        username: `@${username}`,
        profilePicture: `https://placehold.co/150x150.png?text=${username.charAt(0).toUpperCase()}`,
        followers: Math.floor(Math.random() * 200000),
        following: Math.floor(Math.random() * 1000),
        likes: Math.floor(Math.random() * 2000000),
        bio: `Bio for ${username}`,
      };

      const existingAccountsRaw = localStorage.getItem('tiktok_accounts');
      const existingAccounts = existingAccountsRaw ? JSON.parse(existingAccountsRaw) : [];
      
      if (existingAccounts.some((acc: AccountData) => acc.username === newAccount.username)) {
          form.setError('emailOrPhone', { type: 'manual', message: 'This account has already been added.' });
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
      form.setError('root', { type: 'manual', message: 'An unexpected error occurred.' });
    }
  };

  return (
    <Card className="shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            <FormField
              control={form.control}
              name="emailOrPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com or phone number" {...field} disabled={isLoading} />
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
