import { Inngest } from "inngest";

// Create a client to send and receive events
// For server-side usage, we need to ensure proper initialization
export const inngest = new Inngest({ 
  id: "blaze-dev",
  eventKey: process.env.INNGEST_EVENT_KEY, // Add the event key from the environment variables
});

// Ensure the client is properly initialized
if (!inngest) {
  throw new Error("Failed to initialize Inngest client");
}