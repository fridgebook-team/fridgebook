import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DbService {

    db!: IDBDatabase;
    dbReady!: Promise<void>; //keine funktion darf gecalled werden, bevor db ready ist

    constructor() { this.initDB(); }

    //checkt verschiedene Browser
    private indexedDB =
        window.indexedDB ||
        (window as any).mozIndexedDB ||
        (window as any).webkitIndexedDB ||
        (window as any).msIndexedDB ||
        (window as any).shimIndexedDB;

    // öffnen bzw erstellt FridgeBookDB
    private initDB() {
        this.dbReady = new Promise((resolve, reject) => {
            const request = this.indexedDB.open("FridgeBookDB", 1);

            // checkt zuerst nach error bei request
            request.onerror = (event: any) => {
                console.error("An error occured with indexedDB");
                console.error(event);
            };

            // bei Neuerstellung oder neuer Versionsnummer - Schema
            request.onupgradeneeded = () => {
                const fbdb = request.result; //FridgeBookDB

                const eklstore = fbdb.createObjectStore("einkaufsliste", { keyPath: "id", autoIncrement: true });
                // eklstore.colorIndex("eklItem_color", ["color"], { unique: false }); -- nach Index kann gesucht werden

                const foodstore = fbdb.createObjectStore("lebensmittel", { keyPath: "id", autoIncrement: true });
                // hier speichern wir zusätzlich: name, menge, ablaufdatum, hinzugefügt am
            };

            request.onsuccess = () => { 
                this.db = request.result; //FridgeBookDB 
                console.log("1: DB READY");
                resolve();
            }; 
            request.onerror = (e) => {
                console.error("DB error:", e);
                reject(e);
            };
        });
    }

    // Einfügen
    async add(storeName: string, item: any): Promise<any> {
        await this.dbReady;
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);

            const request = store.add(item);

            request.onsuccess = () => resolve(request.result);
            request.onerror = reject;
        });
    }

    // Update (überschreibt bestehenden Eintrag)
    async update(storeName: string, item: any): Promise<any> {
        await this.dbReady;

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);

            const request = store.put(item); //put = update oder insert

            request.onsuccess = () => resolve(request.result);
            request.onerror = reject;
        });
    }

    // Suchen (alle)
    async getAll(storeName: string): Promise<any[]> {
        console.log("2: getAll called:", storeName);
        await this.dbReady;

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);

            const request = store.getAll();

            request.onsuccess = () => {
                console.log("2: getAll result:", request.result);
                resolve(request.result);
                };

                request.onerror = (e) => {
                console.error("2: getAll error", e);
                reject(e);
            };
        
        });
    }

    // Löschen
    async delete(storeName: string, id: number): Promise<void> {
        await this.dbReady;

        return new Promise((resolve, reject) => {
        const transaction = this.db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);

        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = reject;
        });
    }
}