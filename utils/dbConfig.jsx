import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://neondb_owner:5IvXcsdZjLY0@ep-patient-brook-a5utmkem.us-east-2.aws.neon.tech/neondb?sslmode=require"
);
export const db = drizzle(sql, { schema });
