import 'dotenv/config';
import { createApp } from './app.js';
import { database } from './core/database/postgres.js';

const port = Number(process.env.PORT ?? 3001);
const app = createApp();

const server = app.listen(port, () => {
  console.log(`API http://localhost:${port}/api/v1`);
});

async function shutdown(): Promise<void> {
  server.close();
  await database.end();
}

process.on('SIGTERM', () => {
  void shutdown();
});

process.on('SIGINT', () => {
  void shutdown();
});
