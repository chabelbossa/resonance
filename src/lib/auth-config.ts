export const LOCAL_DEMO_USER_ID = "local-demo-user";
export const LOCAL_DEMO_ORG_ID = "local-demo-org";

export const isLocalDemoAuthEnabled =
  process.env.NEXT_PUBLIC_LOCAL_DEMO_AUTH === "true" ||
  process.env.LOCAL_DEMO_AUTH === "true";

export const isClerkPublicConfigured = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim(),
);
