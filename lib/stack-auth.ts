import "server-only"

const key = process.env.STACK_PUBLISHABLE_CLIENT_KEY
if (!key) {
  throw new Error("STACK_PUBLISHABLE_CLIENT_KEY environment variable is not set.")
}

/** Returns the publishable client key (server-side only) */
export function getStackPublishableKey() {
  return key
}
