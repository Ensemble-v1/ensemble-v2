const { verifyToken } = require('@clerk/clerk-sdk-node');

/**
 * Authenticate user using Clerk with modern token verification
 */
const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'Please provide a valid authentication token'
      });
    }

    // Extract token from Bearer header
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.slice(7) 
      : authHeader;

    // For development/testing, allow a test token to bypass authentication
    if ((process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') && token === 'test-token-for-development') {
      req.auth = {
        userId: 'dev-user-123',
        sessionId: 'dev-session-123',
        claims: { sub: 'dev-user-123' }
      };
      return next();
    }

    // Verify the token using modern Clerk method
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY
    });
    
    if (!payload) {
      return res.status(401).json({
        error: 'Invalid token',
        message: 'Authentication token is invalid or expired'
      });
    }

    // Add auth information to request
    req.auth = {
      userId: payload.sub,
      sessionId: payload.sid,
      claims: payload
    };
    
    next();
  } catch (error) {
    console.error('Clerk authentication error:', error);
    return res.status(401).json({
      error: 'Authentication failed',
      message: 'Unable to verify authentication token'
    });
  }
};

/**
 * Optional authentication - allows both authenticated and unauthenticated requests
 */
const optionalAuth = async (req, res, next) => {
  // For demo purposes, allow unauthenticated requests
  // In production, you might want to have rate limiting for unauthenticated users
  if (!req.headers.authorization) {
    req.auth = { userId: null };
    return next();
  }
  
  return authenticateUser(req, res, next);
};

module.exports = {
  authenticateUser,
  optionalAuth
};
