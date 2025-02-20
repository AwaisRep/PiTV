import { openDB } from 'idb';

const DB_NAME = 'profilesDB';
const M3U8_STORE = 'm3u8_profiles';
const XTREAM_STORE = 'xtream_profiles';

//Init database on first startup
export const dbPromise = openDB(DB_NAME, 1,{
    upgrade(db) {
        if (!db.objectStoreNames.contains(M3U8_STORE)) {
            db.createObjectStore(M3U8_STORE, {keyPath: 'id'});
        };

        if (!db.objectStoreNames.contains(XTREAM_STORE)) {
            db.createObjectStore(XTREAM_STORE, {keyPath: 'id'});
        };
    },
});

//CRUD

//Create
export async function addM3U8Profile(profile: {'name': string, 'url': string}) {
    const db = await dbPromise;
    db.put(M3U8_STORE, profile);
};

export async function addXtreamProfile(profile:{'name': string, 'host': string, 'username': string, 'password': string}) {
    const db = await dbPromise;
    db.put(XTREAM_STORE, profile);
};

// Read
export async function getM3U8Profiles() {
   const db = await dbPromise;
   return db.getAll(M3U8_STORE);
};

export async function getXtreamProfiles() {
    const db = await dbPromise;
    return db.getAll(XTREAM_STORE);
};

//Update
// export async function deleteM3u8Profile('id':number) {
    
// };

//Delete