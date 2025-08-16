import { LoginForm } from '@/components/auth/login-form';
import { TikTokIcon } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="w-full max-w-md p-8">
        <div className="mb-8 flex flex-col items-center justify-center space-y-4">
          <div className="rounded-full bg-primary/10 p-4 text-primary">
            <TikTokIcon className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold font-headline text-center">Add TikTok Account</h1>
          <p className="text-muted-foreground text-center">
            Enter your credentials to add a new account to the automator.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
