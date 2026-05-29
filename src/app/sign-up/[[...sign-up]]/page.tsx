import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isClerkPublicConfigured, isLocalDemoAuthEnabled } from "@/lib/auth-config";

export default function SignUpPage() {
  if (isLocalDemoAuthEnabled && !isClerkPublicConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="w-full max-w-sm space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight">
              Local demo mode
            </h1>
            <p className="text-sm text-muted-foreground">
              Clerk is not configured locally, so account creation is replaced
              by a demo workspace.
            </p>
          </div>
          <Button asChild className="w-full">
            <Link href="/">Open dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg",
          },
        }}
      />
    </div>
  );
}
