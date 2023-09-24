import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

neonConfig.fetchConnectionCache = true;

const sql = neon(import.meta.env.DATABASE_URL!);
const db = drizzle(sql, { logger: true });

export default db;
