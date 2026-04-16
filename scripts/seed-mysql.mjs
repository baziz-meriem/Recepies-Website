/**
 * Apply db/seed.sql to MySQL (demo Aiven defaults; override with DB_* env vars).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const DEMO_PASSWORD = 'AVNS_j1wwEWtH5PTEq7-MkfW';

const host = process.env.DB_HOST ?? 'mysql-2b338b70-esi-cd05.a.aivencloud.com';
const port = Number(process.env.DB_PORT ?? 14095);
const user = process.env.DB_USER ?? 'avnadmin';
const password = process.env.DB_PASSWORD?.trim() || DEMO_PASSWORD;

const sslExplicit = process.env.DB_SSL;
const useSsl =
  sslExplicit === 'true' ||
  (sslExplicit !== 'false' && String(host).includes('aivencloud.com'));

const sqlPath = path.join(__dirname, '..', 'db', 'seed.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

/** Aiven TLS: use DB_SSL_CA_PATH to their ca.pem for strict verify; else relaxed (fixes "self-signed certificate in certificate chain"). */
function sslOpts() {
  if (!useSsl) return {};
  const caPath = process.env.DB_SSL_CA_PATH;
  if (caPath && fs.existsSync(caPath)) {
    return {
      ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(caPath),
      },
    };
  }
  return {
    ssl: {
      rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true',
    },
  };
}

const conn = await mysql.createConnection({
  host,
  port,
  user,
  password,
  multipleStatements: true,
  ...sslOpts(),
});

try {
  await conn.query(sql);
  console.log('Seed applied successfully:', sqlPath);
} finally {
  await conn.end();
}
