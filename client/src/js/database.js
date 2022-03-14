import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  console.log('PUT to the jate database');
  // DB set up and queries
  const jateDb = await openDB('jate',1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  // Update
  const request = store.put({ id: 1, text: content});
  const result = await request;
  console.log("Text Updated");
  return result;
};


export const getDb = async () => {
  console.log('PUT to the jate database');
  // DB set up and queries
  const jateDb = await openDB('jate',1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // Get
  const request = store.get(1);
  const result = await request;
  console.log("Text has been retrieved.");
  return result.text;
};

initdb();
