import { OrganizationList } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isClerkPublicConfigured, isLocalDemoAuthEnabled } from "@/lib/auth-config";

export default function OrgSelectionPage() {
  if (isLocalDemoAuthEnabled && !isClerkPublicConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="w-full max-w-sm space-y-4 rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight">
              Demo workspace selected
            </h1>
            <p className="text-sm text-muted-foreground">
              Organization selection is skipped while local demo auth is active.
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
      <OrganizationList
        hidePersonal
        afterCreateOrganizationUrl="/"
        afterSelectOrganizationUrl="/"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg",
          },
        }}
      />
    </div>
  );
};
