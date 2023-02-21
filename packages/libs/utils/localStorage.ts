class localStorageService {
  async setLocal(key: string, value: any) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  async readLocal(key: string) {
    if (typeof window !== "undefined") {
      try {
        return JSON.parse(window.localStorage.getItem(key) as string);
      } catch {
        return window.localStorage.getItem(key);
      }
    }
  }

  async removeAllKey(key?: string) {
    if (typeof window !== "undefined" && !key) {
      window.localStorage.clear();
    } else if (typeof window !== "undefined" && key) {
      window.localStorage.removeItem(key);
    }
  }
}

export default new localStorageService();
