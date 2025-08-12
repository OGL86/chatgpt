const express = require('express');
const router = express.Router();
const { addUser, addMagicLinkRequest } = require('../db');
const { createUser } = require('../models/user');

router.post('/magic-link', (req, res) => {
  const deviceId = req.headers['x-device-id'] || req.body.deviceId;
  const email = req.body.email || null;
  if (!deviceId) {
    return res.status(400).json({ error: 'deviceId required' });
  }
  const user = createUser({ email, deviceId });
  addUser(user);
  const request = {
    id: Date.now().toString(),
    deviceId,
    email,
    userId: user.id,
    createdAt: new Date().toISOString(),
  };
  addMagicLinkRequest(request);
  if (process.env.NODE_ENV !== 'production') {
    console.log('Magic link request:', request);
  }
  return res.status(202).json({ status: 'stored' });
});

module.exports = router;
