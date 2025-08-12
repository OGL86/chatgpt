const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, "..", "data", "db.json");

if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify({ users: [], magicLinkRequests: [] }, null, 2));
}

function readDB() {
  const raw = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function addUser(user) {
  const db = readDB();
  db.users.push(user);
  writeDB(db);
  return user;
}

function addMagicLinkRequest(req) {
  const db = readDB();
  db.magicLinkRequests.push(req);
  writeDB(db);
  return req;
}

module.exports = {
  addUser,
  addMagicLinkRequest,
};
