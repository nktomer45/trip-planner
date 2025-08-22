import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Hardcoded credentials for demo
const DEMO_USERS = [
  {
    id: '1',
    username: 'admin',
    password: '$2b$10$K7L/8Y.5cJlBKf.2sKzEQ.ZpGQoF0xQk9Ql7C8B0N.vN4K9mQ2p1e' // 'password123'
  },
  {
    id: '2',
    username: 'user',
    password: '$2b$10$abcdefghijklmnopqrstuvwxyz' // 'demo123'
  }
];

export const generateToken = (userId: string, username: string): string => {
  return jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = (token: string): { userId: string; username: string } | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; username: string };
  } catch {
    return null;
  }
};

export const validateCredentials = async (username: string, password: string) => {
  const user = DEMO_USERS.find(u => u.username === username);
  if (!user) return null;
  
  // For demo purposes, we'll use a simple comparison
  // In production, use bcrypt.compare(password, user.password)
  const isValid = username === 'admin' && password === 'password123' ||
                  username === 'user' && password === 'demo123';
  
  return isValid ? { id: user.id, username: user.username } : null;
};