const CACHE_DURATION = 24 * 60 * 60 * 1000;

export function saveCache(key, data) {
    const cacheObject = { timestamp: Date.now(), data: data };
    localStorage.setItem(key, JSON.stringify(cacheObject));
}

export function getCache(key) {
    const cachedString = localStorage.getItem(key);
    if (!cachedString) return null;
    try {
        const cacheObject = JSON.parse(cachedString);
        if (Date.now() - cacheObject.timestamp > CACHE_DURATION) {
            localStorage.removeItem(key);
            return null;
        }
        return cacheObject.data;
    } catch (e) {
        return null;
    }
}
