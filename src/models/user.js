const { v4: uuidv4 } = require('uuid');

function createUser({ email = null, deviceId }) {
  return {
    id: uuidv4(),
    email,
    deviceId,
    createdAt: new Date().toISOString(),
  };
}

module.exports = { createUser };
