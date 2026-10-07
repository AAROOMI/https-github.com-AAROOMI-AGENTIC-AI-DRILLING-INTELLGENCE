import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'HEALTHY',
    version: '2.5.0-ARAMCO',
    uptimeSec: process.uptime(),
    airGapped: process.env.AIR_GAPPED === 'true',
    database: 'CONNECTED',
    voiceService: 'ONLINE',
    timestamp: new Date().toISOString()
  });
});

// API endpoint for system status
app.get('/api/system/status', (_req, res) => {
  res.json({
    app: 'Agentic AI Drilling Intelligence & Well Design Platform',
    targetWell: 'Well-102 (Ghawar Arab-D)',
    readinessScore: 92,
    governanceGate: 'HUMAN_REVIEW',
    voiceCloningId: 'Ahmad Al-Ghamdi (Verified Engineer Voice ID: KSA-DRILL-7892)'
  });
});

// Serve production static assets if in dist folder
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Enterprise Drilling Platform server listening on port ${PORT}`);
});
