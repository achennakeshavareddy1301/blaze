import { Inngest } from "inngest";

// Create a client to send and receive events
// For server-side usage, we need to ensure proper initialization
export const inngest = new Inngest({ 
  id: "blaze-dev",
  // Add any additional configuration needed for your environment
});

// Ensure the client is properly initialized
if (!inngest) {
  throw new Error("Failed to initialize Inngest client");
}