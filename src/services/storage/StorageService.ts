type StorageValue = string | null;

const memoryStore = new Map<string, string>();

interface AsyncStorageLike {
  getItem(key: string): Promise<StorageValue>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export class StorageService {
  private static adapter: AsyncStorageLike | null = null;

  static configure(adapter: AsyncStorageLike) {
    StorageService.adapter = adapter;
  }

  static async getItem(key: string): Promise<StorageValue> {
    try {
      if (StorageService.adapter) {
        return await StorageService.adapter.getItem(key);
      }
      return memoryStore.get(key) ?? null;
    } catch {
      return memoryStore.get(key) ?? null;
    }
  }

  static async setItem(key: string, value: string): Promise<void> {
    memoryStore.set(key, value);
    try {
      await StorageService.adapter?.setItem(key, value);
    } catch {
      // Memory fallback keeps the app usable if native storage is unavailable.
    }
  }

  static async getJson<T>(key: string, fallback: T): Promise<T> {
    const value = await StorageService.getItem(key);
    if (!value) {
      return fallback;
    }
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }

  static async setJson<T>(key: string, value: T): Promise<void> {
    await StorageService.setItem(key, JSON.stringify(value));
  }
}
