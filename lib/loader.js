const fs = require('fs');
const path = require('path');

function loadPlugins(sock) {
  const pluginsDir = path.join(__dirname, '..', 'plugins');
  if (!fs.existsSync(pluginsDir)) {
    console.warn('Plugins folder not found:', pluginsDir);
    return;
  }

  const files = fs.readdirSync(pluginsDir).filter(f => f.endsWith('.js'));

  for (const file of files) {
    try {
      const pluginPath = path.join(pluginsDir, file);
      delete require.cache[require.resolve(pluginPath)];
      const plugin = require(pluginPath);
      if (plugin && typeof plugin.run === 'function') {
        plugin.run(sock);
        console.log('[plugin] loaded', file);
      } else {
        console.log('[plugin] skipped (no run):', file);
      }
    } catch (e) {
      console.error('[plugin] error', file, e);
    }
  }
}

module.exports = { loadPlugins };
