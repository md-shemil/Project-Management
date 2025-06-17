import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const protect = async (req, res, next) => {
  let token;

  // 1. Check if Authorization header is present and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 2. Extract token: "Bearer <token>" --> get only the token part
      token = req.headers.authorization.split(' ')[1];

      // 3. Decode the token using the secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user from the decoded token and attach to request
      req.user = await User.findById(decoded.id).select('-password');

      // 5. Continue to the next middleware or controller
      next();
    } catch (error) {
      console.error('JWT error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // 6. If no token was sent
  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
  }
};

export default protect;
