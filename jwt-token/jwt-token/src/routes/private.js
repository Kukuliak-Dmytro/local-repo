import { Router } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();
const usersPath = path.resolve('src/data/users.json');

// Helper: Read and write users
async function readUsers() {
  const data = await fs.readFile(usersPath, 'utf-8');
  return JSON.parse(data);
}
async function writeUsers(users) {
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
}

// GET /private/profile - Get current user's profile
router.get('/profile', authenticateToken, async (req, res) => {
  const users = await readUsers();
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  // Exclude password from response
  const { password, ...profile } = user;
  res.json(profile);
});

// PUT /private/profile - Update current user's profile
router.put('/profile', authenticateToken, async (req, res) => {
  const { fullName, phone, age } = req.body;
  const users = await readUsers();
  const idx = users.findIndex(u => u.id === req.user.id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  // Update only allowed fields
  if (fullName !== undefined) users[idx].fullName = fullName;
  if (phone !== undefined) users[idx].phone = phone;
  if (age !== undefined) users[idx].age = age;
  await writeUsers(users);
  const { password, ...profile } = users[idx];
  res.json(profile);
});

// DELETE /private/profile - Delete current user's profile
router.delete('/profile', authenticateToken, async (req, res) => {
  let users = await readUsers();
  const idx = users.findIndex(u => u.id === req.user.id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(idx, 1);
  await writeUsers(users);
  res.json({ message: 'Profile deleted' });
});

// GET /private/friends - Get current user's friends
router.get('/friends', authenticateToken, async (req, res) => {
  const users = await readUsers();
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user.friends || []);
});

// GET /private/friends/:friendId - Get a single friend (with posts/comments)
router.get('/friends/:friendId', authenticateToken, async (req, res) => {
  const users = await readUsers();
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const friend = (user.friends || []).find(f => f.id === Number(req.params.friendId));
  if (!friend) return res.status(404).json({ error: 'Friend not found' });
  res.json(friend);
});

// GET /private/friends/:friendId/posts - Get posts for a friend
router.get('/friends/:friendId/posts', authenticateToken, async (req, res) => {
  const users = await readUsers();
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const friend = (user.friends || []).find(f => f.id === Number(req.params.friendId));
  if (!friend) return res.status(404).json({ error: 'Friend not found' });
  res.json(friend.posts || []);
});

// GET /private/friends/:friendId/posts/:postId/comments - Get comments for a post
router.get('/friends/:friendId/posts/:postId/comments', authenticateToken, async (req, res) => {
  const users = await readUsers();
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const friend = (user.friends || []).find(f => f.id === Number(req.params.friendId));
  if (!friend) return res.status(404).json({ error: 'Friend not found' });
  const post = (friend.posts || []).find(p => p.id === Number(req.params.postId));
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post.comments || []);
});

export default router; 