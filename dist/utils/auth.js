"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCredentials = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
const generateToken = (userId, username) => {
    return jsonwebtoken_1.default.sign({ userId, username }, JWT_SECRET, { expiresIn: '24h' });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
    catch {
        return null;
    }
};
exports.verifyToken = verifyToken;
const validateCredentials = async (username, password) => {
    const user = DEMO_USERS.find(u => u.username === username);
    if (!user)
        return null;
    // For demo purposes, we'll use a simple comparison
    // In production, use bcrypt.compare(password, user.password)
    const isValid = username === 'admin' && password === 'password123' ||
        username === 'user' && password === 'demo123';
    return isValid ? { id: user.id, username: user.username } : null;
};
exports.validateCredentials = validateCredentials;
//# sourceMappingURL=auth.js.map