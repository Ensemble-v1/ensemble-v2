/**
 * Development Clerk Configuration
 * This file sets up development keys for Clerk authentication
 */

// For development, we'll use a mock/development setup
export const clerkConfig = {
  // Development mode settings
  isDevelopment: process.env.NODE_ENV === 'development',
  
  // Mock user for development
  mockUser: {
    id: 'user_dev_123',
    firstName: 'Dev',
    lastName: 'User',
    emailAddresses: [{ emailAddress: 'dev@ensemble.com' }],
  },
  
  // Development publishable key format
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_development_key',
  
  // Check if we have valid clerk keys
  hasValidKeys: function() {
    const pubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    const secretKey = process.env.CLERK_SECRET_KEY;
    
    return pubKey && secretKey && 
           pubKey.startsWith('pk_') && 
           secretKey.startsWith('sk_') &&
           !pubKey.includes('sample') &&
           !secretKey.includes('sample');
  }
};

export default clerkConfig;
