"use client";

import { LogOut, User, Moon, Sun, PlusCircle, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TikTokIcon } from '../icons';
import { type AccountData } from './account';

interface HeaderProps {
    onThemeChange: (theme: 'light' | 'dark') => void;
    currentTheme: 'light' | 'dark';
    accounts: AccountData[];
    activeAccountId: string | null;
    onAccountChange: (accountId: string) => void;
    onAddAccount: () => void;
}

export function Header({ 
  onThemeChange, 
  currentTheme,
  accounts,
  activeAccountId,
  onAccountChange,
  onAddAccount
}: HeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you'd clear all auth state
    localStorage.removeItem('tiktok_accounts');
    localStorage.removeItem('active_tiktok_account_id');
    router.push('/login');
  };

  const activeAccount = accounts.find(acc => acc.id === activeAccountId);

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 z-10">
      <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 w-full">
        <a href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base font-headline">
          <TikTokIcon className="h-6 w-6 text-primary" />
          <span className="sr-only">TikTok Automator</span>
          <span className="hidden sm:inline">TikTok Arbitrage Automator</span>
        </a>
      </nav>
      <div className="flex items-center gap-2 md:ml-auto">
        <Button variant="ghost" size="icon" onClick={() => onThemeChange(currentTheme === 'light' ? 'dark' : 'light')}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activeAccount?.profilePicture} alt={activeAccount?.username} data-ai-hint="profile avatar" />
                <AvatarFallback>{activeAccount?.username?.charAt(1)?.toUpperCase() || '?'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{activeAccount?.username || "No Account"}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {activeAccount ? "Logged in" : "No account selected"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={activeAccountId || ''} onValueChange={onAccountChange}>
              <DropdownMenuLabel>Switch Account</DropdownMenuLabel>
              {accounts.map(account => (
                <DropdownMenuRadioItem key={account.id} value={account.id} className="cursor-pointer">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={account.profilePicture} alt={account.username} />
                    <AvatarFallback>{account.username.charAt(1).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span>{account.username}</span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onAddAccount} className="cursor-pointer">
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>Add Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out of all accounts</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
