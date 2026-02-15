/**
 * ConnectivityManager
 * Manages online/offline status using WebSocket heartbeat with HTTP fallback.
 */
class ConnectivityManager {
  constructor() {
    this.isOnline = navigator.onLine;
    this.listeners = [];
    this.wsUrl = 'wss://echo.websocket.events';
    this.httpUrl = 'https://ziedyahia-57.github.io/Currency-Converter/data.json';
    this.checkInProgress = false;
    this.heartbeatInterval = null;

    this.init();
  }

  init() {
    // Initial check
    this.checkConnection();

    // Listen to browser's basic signals
    window.addEventListener('online', () => {
      console.log('Browser reports online, verifying...');
      this.checkConnection();
    });
    window.addEventListener('offline', () => {
      console.log('Browser reports offline');
      this.updateStatus(false);
    });

    // Start periodic heartbeat (every 30 seconds)
    this.startHeartbeat();
  }

  async checkConnection() {
    if (this.checkInProgress) return;
    this.checkInProgress = true;

    try {
      const isWsOnline = await this.checkWebSocket();
      if (isWsOnline) {
        this.updateStatus(true);
      } else {
        console.warn('WebSocket heartbeat failed, trying HTTP fallback...');
        const isHttpOnline = await this.checkHTTP();
        this.updateStatus(isHttpOnline);
      }
    } catch (error) {
      this.updateStatus(false);
    } finally {
      this.checkInProgress = false;
    }
  }

  checkWebSocket() {
    return new Promise((resolve) => {
      let resolved = false;
      let socket;
      
      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          if (socket) socket.close();
          resolve(false);
        }
      }, 5000);

      try {
        socket = new WebSocket(this.wsUrl);
        
        socket.onopen = () => {
          socket.send('ping');
        };

        socket.onmessage = (event) => {
          if (!resolved) {
            resolved = true;
            clearTimeout(timeout);
            socket.close();
            resolve(true);
          }
        };

        socket.onerror = () => {
          if (!resolved) {
            resolved = true;
            clearTimeout(timeout);
            resolve(false);
          }
        };

        socket.onclose = () => {
          if (!resolved) {
            resolved = true;
            clearTimeout(timeout);
            resolve(false);
          }
        };
      } catch (e) {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          resolve(false);
        }
      }
    });
  }

  async checkHTTP() {
    try {
      // Use HEAD request to minimize data usage
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      // Use the project's data.json as a reachability target
      const response = await fetch(`${this.httpUrl}?t=${Date.now()}`, {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal,
        cache: 'no-store'
      });
      
      clearTimeout(timeoutId);
      return true; // If we get here without error, we have some connectivity
    } catch (error) {
      console.error('HTTP reachability check failed:', error);
      return false;
    }
  }

  startHeartbeat() {
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
    this.heartbeatInterval = setInterval(() => this.checkConnection(), 30000);
  }

  updateStatus(newStatus) {
    if (this.isOnline !== newStatus) {
      console.log(`Connection status changed: ${newStatus ? 'Online' : 'Offline'}`);
      this.isOnline = newStatus;
      this.notifyListeners();
    }
  }

  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.isOnline);
      } catch (e) {
        console.error('Error in connectivity listener:', e);
      }
    });
  }

  onStatusChange(callback) {
    this.listeners.push(callback);
    // Optionally call immediately with current state
    // callback(this.isOnline);
  }
}

export const connectivityManager = new ConnectivityManager();
window.connectivityManager = connectivityManager;
