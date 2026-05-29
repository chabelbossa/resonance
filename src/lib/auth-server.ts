import { auth } from "@clerk/nextjs/server";

import {
  isClerkPublicConfigured,
  isLocalDemoAuthEnabled,
  LOCAL_DEMO_ORG_ID,
  LOCAL_DEMO_USER_ID,
} from "@/lib/auth-config";

export function isClerkServerConfigured() {
  return (
    isClerkPublicConfigured && Boolean(process.env.CLERK_SECRET_KEY?.trim())
  );
}

export function shouldUseLocalDemoAuth() {
  return isLocalDemoAuthEnabled && !isClerkServerConfigured();
}

export async function getAuthContext() {
  if (shouldUseLocalDemoAuth()) {
    return {
      userId: LOCAL_DEMO_USER_ID,
      orgId: LOCAL_DEMO_ORG_ID,
    };
  }

  return auth();
}
