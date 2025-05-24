import express from 'express';
import * as gameService from '../services/gameService';

const router = express.Router();

// 🐣 Mint
router.post('/mint', async (req, res) => {
  try {
    const { wallet } = req.body;
    const tx = await gameService.mintTamagotchi(wallet);
    res.json({ tx });
  } catch (err) {
    res.status(500).json({ error: (err instanceof Error) ? err.message : 'Unknown error' });
  }
});

// 🍎 Feed
router.post('/:id/feed', async (req, res) => {
  try {
    const tx = await gameService.feedTamagotchi(req.params.id);
    res.json({ tx });
  } catch (err) {
    res.status(500).json({ error: (err instanceof Error) ? err.message : 'Unknown error' });
  }
});

// 🎯 Play
router.post('/:id/play', async (req, res) => {
  try {
    const tx = await gameService.playTamagotchi(req.params.id);
    res.json({ tx });
  } catch (err) {
    res.status(500).json({ error: (err instanceof Error) ? err.message : 'Unknown error' });
  }
});

// ⏰ Decay
router.post('/:id/tick', async (req, res) => {
  try {
    const tx = await gameService.decayTamagotchi(req.params.id);
    res.json({ tx });
  } catch (err) {
    res.status(500).json({ error: (err instanceof Error) ? err.message : 'Unknown error' });
  }
});

// 📊 Stats
router.get('/:id/stats', async (req, res) => {
  try {
    const stats = await gameService.getStats(req.params.id);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: (err instanceof Error) ? err.message : 'Unknown error' });
  }
});

// 💀 Is Alive
router.get('/:id/is_alive', async (req, res) => {
  try {
    const alive = await gameService.isAlive(req.params.id);
    res.json({ is_alive: alive });
  } catch (err) {
    res.status(500).json({ error: (err instanceof Error) ? err.message : 'Unknown error' });
  }
});

// 🏆 Rarity
router.get('/:id/rarity', async (req, res) => {
  try {
    const rarity = await gameService.getRarity(req.params.id);
    res.json({ rarity });
  } catch (err) {
    res.status(500).json({ error: (err instanceof Error) ? err.message : 'Unknown error' });
  }
});

export default router;
