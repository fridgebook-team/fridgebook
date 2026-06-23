import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  db!: IDBDatabase;
  dbReady!: Promise<void>;

  private readonly storeNames = ['einkaufsliste', 'lebensmittel', 'favorites'];
  private readonly memoryStores = new Map<string, any[]>();
  private readonly memoryIds = new Map<string, number>();
  private readonly indexedDBApi: IDBFactory | undefined =
    window.indexedDB ||
    (window as any).mozIndexedDB ||
    (window as any).webkitIndexedDB ||
    (window as any).msIndexedDB ||
    (window as any).shimIndexedDB;

  constructor() {
    this.storeNames.forEach((storeName) => {
      this.memoryStores.set(storeName, []);
      this.memoryIds.set(storeName, 1);
    });

    this.initDB();
  }

  private initDB() {
    if (!this.indexedDBApi) {
      this.dbReady = Promise.resolve();
      return;
    }

    this.dbReady = new Promise((resolve, reject) => {
      const request = this.indexedDBApi!.open('FridgeBookDB', 3);

      request.onupgradeneeded = () => {
        const fbdb = request.result;

        for (const storeName of this.storeNames) {
          if (!fbdb.objectStoreNames.contains(storeName)) {
            fbdb.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
          }
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('DB READY');
        resolve();
      };

      request.onerror = (event) => {
        console.error('DB error:', event);
        reject(event);
      };
    });
  }

  async add(storeName: string, item: any): Promise<any> {
    await this.dbReady;

    if (!this.db) {
      const store = this.getMemoryStore(storeName);
      const id = item.id ?? this.nextMemoryId(storeName);
      store.push({ ...item, id });
      return id;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(item);

      request.onsuccess = () => resolve(request.result);
      request.onerror = reject;
    });
  }

  async update(storeName: string, item: any): Promise<any> {
    await this.dbReady;

    if (!this.db) {
      const store = this.getMemoryStore(storeName);
      const index = store.findIndex((storedItem) => storedItem.id === item.id);

      if (index === -1) {
        store.push({ ...item, id: item.id ?? this.nextMemoryId(storeName) });
      } else {
        store[index] = { ...item };
      }

      return item.id;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(item);

      request.onsuccess = () => resolve(request.result);
      request.onerror = reject;
    });
  }

  async getAll(storeName: string): Promise<any[]> {
    await this.dbReady;

    if (!this.db) {
      return this.getMemoryStore(storeName).map((item) => ({ ...item }));
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = reject;
    });
  }

  async delete(storeName: string, id: number): Promise<void> {
    await this.dbReady;

    if (!this.db) {
      const store = this.getMemoryStore(storeName);
      const index = store.findIndex((item) => item.id === id);

      if (index !== -1) {
        store.splice(index, 1);
      }

      return;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = reject;
    });
  }

  private getMemoryStore(storeName: string): any[] {
    if (!this.memoryStores.has(storeName)) {
      this.memoryStores.set(storeName, []);
      this.memoryIds.set(storeName, 1);
    }

    return this.memoryStores.get(storeName)!;
  }

  private nextMemoryId(storeName: string): number {
    const nextId = this.memoryIds.get(storeName) ?? 1;
    this.memoryIds.set(storeName, nextId + 1);
    return nextId;
  }
}
