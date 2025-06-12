import * as SQLite from 'expo-sqlite';
import { SECTION_LIST_MOCK_DATA } from './utils';

const db = SQLite.openDatabase('little_lemon');

// Create menuitems table if it doesn't exist
export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS menuitems (id INTEGER PRIMARY KEY NOT NULL, uuid TEXT, title TEXT, price TEXT, category TEXT);'
        );
      },
      reject,
      resolve
    );
  });
}

// Fetch all menu items
export async function getMenuItems() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM menuitems',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}

// Save all menu items with one SQL query
export function saveMenuItems(menuItems) {
  if (!menuItems || menuItems.length === 0) return;

  db.transaction((tx) => {
    const placeholders = menuItems.map(() => '(?, ?, ?, ?, ?)').join(', ');
    const values = menuItems.flatMap(item => [
      item.id,
      item.uuid,
      item.title,
      item.price,
      item.category
    ]);

    const sql = `
      INSERT OR REPLACE INTO menuitems (id, uuid, title, price, category)
      VALUES ${placeholders};
    `;

    tx.executeSql(sql, values);
  });
}

// Filter menu items by query and active categories
export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    const queryLower = `%${query.toLowerCase()}%`;
    const placeholders = activeCategories.map(() => '?').join(', ');

    const sql = `
      SELECT * FROM menuitems
      WHERE LOWER(title) LIKE ?
      AND category IN (${placeholders});
    `;

 
    const params = [queryLower, ...activeCategories];

        // Escape and interpolate params into SQL for logging
        const escapeForSql = (val) => {
          if (val === null) return 'NULL';
          if (typeof val === 'number') return val;
          if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
          throw new Error(`Unsupported param type: ${typeof val}`);
        };
    
        let paramIndex = 0;
        const interpolatedSql = sql.replace(/\?/g, () => escapeForSql(params[paramIndex++]));
    
        console.log('Executing SQL:\n' + interpolatedSql);

    db.transaction((tx) => {
      tx.executeSql(
        sql,
        params,
        (_, { rows }) => resolve(rows._array),
        (_, error) => {
          reject(error);
          return false;
        }
      );
    });
  });
}
