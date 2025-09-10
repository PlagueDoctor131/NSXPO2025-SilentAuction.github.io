import fs from 'fs';
import { parse } from 'csv-parse/sync';
import admin from 'firebase-admin';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const serviceAccount = require('./nsxpo-78017-firebase-adminsdk-fbsvc-adbe64c3ca.json');

// → everything else stays the same


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://nsxpo-78017-default-rtdb.firebaseio.com'
});
const db = admin.database();

// Top-level await is now allowed
const csvText = fs.readFileSync('members.csv', 'utf8');
const records = parse(csvText, {
  columns: true,
  trim: true,
  skip_empty_lines: true
});

for (const row of records) {
  const isBlacklisted = String(row.blacklisted).toLowerCase() === 'true';
  const key = row.bidNumber;
  await db.ref(`members/${key}`).set({
    firstName: row.firstName,
    lastName:  row.lastName,
    contactEmail:     row.contactEmail,
    contactNumber:  row.contactNumber,
    blacklisted: isBlacklisted
  });
  console.log(`Imported member ${key} (blacklisted=${isBlacklisted})`);
}

console.log('All members imported.');