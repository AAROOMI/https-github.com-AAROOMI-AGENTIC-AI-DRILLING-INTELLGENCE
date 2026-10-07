const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  platform: 'windows',
  isDesktop: true,
  appVersion: '2.5.0-enterprise'
});
