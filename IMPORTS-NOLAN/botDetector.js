const fs = require('fs');

const path = './IMPORTS-NOLAN/knownBots.json';
const dir = './IMPORTS-NOLAN';

if (!fs.existsSync(dir)) fs.mkdirSync(dir);
if (!fs.existsSync(path)) fs.writeFileSync(path, '[]');

let knownBots = [];

try {
  knownBots = JSON.parse(fs.readFileSync(path));
} catch {
  knownBots = [];
  saveBots();
}

function saveBots() {
  fs.writeFileSync(path, JSON.stringify(knownBots, null, 2));
}

async function isRealBot(jid, participant) {
  const number = jid.split('@')[0];
  const name = (participant?.name || '').toLowerCase();

  if (knownBots.includes(jid)) return true;

  let score = 0;

  if (name.includes('bot')) score++;
  if (jid.includes('bot')) score++;
  if (/^\d{6,}$/.test(number)) score++;
  if (/^([0-9])\1{4,}$/.test(number)) score++;
  if (name === number) score++;
  if (!name || name.trim().length === 0) score++;
  if (/^[^a-zA-Z0-9\s]+$/.test(name)) score++;

  try {
    const photo = await client.profilePictureUrl(jid, 'image').catch(() => null);
    const bio = await client.fetchStatus(jid).catch(() => ({}));
    const status = bio?.status || '';

    const hasPhoto = !!photo;
    const hasBio = status && status !== 'Hey there! I am using WhatsApp.';

    if (!hasPhoto) score++;
    if (!hasBio) score++;
  } catch {
    score += 2;
  }

  return score >= 3;
}

function addBot(jid) {
  if (!knownBots.includes(jid)) {
    knownBots.push(jid);
    saveBots();
  }
}

function getKnownBots() {
  return knownBots;
}

function removeBot(jid) {
  knownBots = knownBots.filter(b => b !== jid);
  saveBots();
}

module.exports = {
  isRealBot,
  addBot,
  getKnownBots,
  removeBot
};
