import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { promises as fs } from 'fs';
import path from 'path';

const router = Router();
const usersPath = path.resolve('src/data/users.json');
const refreshTokensPath = path.resolve('src/data/refreshTokens.json');

// Hardcoded secrets and intervals for demo
const JWT_SECRET = 'super_secret_access_key';
const JWT_REFRESH_SECRET = 'super_secret_refresh_key';
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

// Helper: Read JSON file
async function readJson(filePath) {
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}
// Helper: Write JSON file
async function writeJson(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

// Register
router.post('/register', async (req, res) => {
  const { username, password, fullName } = req.body;
  if (!username || !password || !fullName) return res.status(400).json({ error: 'Username, password, and full name required' });
  const users = await readJson(usersPath);
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), username, fullName, password: hashedPassword };
  users.push(newUser);
  await writeJson(usersPath, users);
  res.status(201).json({ message: 'User registered' });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  const users = await readJson(usersPath);
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  const accessToken = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  const refreshToken = jwt.sign({ id: user.id, username: user.username }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
  // Store refresh token
  const refreshTokens = await readJson(refreshTokensPath);
  refreshTokens.push(refreshToken);
  await writeJson(refreshTokensPath, refreshTokens);
  res.json({ accessToken, refreshToken });
});

// Refresh
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });
  const refreshTokens = await readJson(refreshTokensPath);
  if (!refreshTokens.includes(refreshToken)) return res.status(403).json({ error: 'Invalid refresh token' });
  try {
    const user = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const accessToken = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
    res.json({ accessToken });
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });
  let refreshTokens = await readJson(refreshTokensPath);
  refreshTokens = refreshTokens.filter(token => token !== refreshToken);
  await writeJson(refreshTokensPath, refreshTokens);
  res.json({ message: 'Logged out' });
});

export default router; 