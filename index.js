const makeWASocket = require('@whiskeysockets/baileys').default;
const { useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const P = require('pino');
const { loadPlugins } = require('./lib/loader');
const path = require('path');

async function start() {
  // auth state stored in ./session
  const { state, saveCreds } = await useMultiFileAuthState(path.join(__dirname, 'session'));

  // try to fetch the latest baileys WA version; if it fails, fallback to default undefined
  let versionInfo = {};
  try {
    const v = await fetchLatestBaileysVersion();
    versionInfo.version = v.version;
  } catch (e) {
    versionInfo.version = undefined;
  }

  const sock = makeWASocket({
    version: versionInfo.version,
    printQRInTerminal: true,
    auth: state,
    logger: P({ level: 'silent' }),
    // Device name shown in WhatsApp linked devices
    browser: ['ANUG-AOFC', 'Chrome', '1.0.0']
  });

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr, pairingCode } = update;
    if (qr) {
      console.log('\n--- QR generated (scan with WhatsApp) ---\n');
      // QR shown in terminal automatically by Baileys because printQRInTerminal: true
    }
    if (pairingCode) {
      console.log('\n--- PAIRING CODE (from WhatsApp server) ---');
      console.log('PAIRING CODE:', pairingCode);
      console.log('--------------------------------------------\n');
    }
    if (connection === 'open') {
      console.log('\n✓ Connected to WhatsApp!');
    }
    if (connection === 'close') {
      console.log('\n✖ Connection closed', lastDisconnect && lastDisconnect.error);
    }
  });

  sock.ev.on('creds.update', saveCreds);

  // Load plugins after a short delay to ensure socket ready
  setTimeout(() => {
    try {
      loadPlugins(sock);
      console.log('\n✓ Plugins loaded.');
    } catch (e) {
      console.error('Failed to load plugins', e);
    }
  }, 1200);
}

start().catch(e => {
  console.error('Failed to start bot', e);
});
