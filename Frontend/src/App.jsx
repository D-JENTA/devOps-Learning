
import { useEffect, useState } from "react";

function App() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  async function fetchHealth() {
    try {
      const response = await fetch(`${API_URL}/api/health`);

      if (!response.ok) {
        throw new Error("Gagal mengambil data server");
      }

      const data = await response.json();

      setHealth(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setHealth(null);
    }
  }

  useEffect(() => {
    fetchHealth();

    const interval = setInterval(fetchHealth, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Server Health Monitoring nihhh</h1>

      <button onClick={fetchHealth}>
        Refresh Data
      </button>

      <hr />

      <h2>Status Server</h2>

      {error ? (
        <p>OFFLINE: {error}</p>
      ) : health ? (
        <p>ONLINE</p>
      ) : (
        <p>Memeriksa server...</p>
      )}

      {health && (
        <>
          <h2>Informasi Server</h2>

          <p>Hostname: {health.server.hostname}</p>
          <p>Platform: {health.server.platform}</p>
          <p>Node.js: {health.server.nodeVersion}</p>

          <h2>Uptime</h2>
          <p>{health.uptime.seconds} detik</p>

          <h2>Memory Usage</h2>
          <p>Total RAM: {health.memory.total} bytes</p>
          <p>RAM Terpakai: {health.memory.used} bytes</p>
          <p>RAM Tersedia: {health.memory.free} bytes</p>
          <p>Penggunaan RAM: {health.memory.usagePercentage}%</p>

          <h2>CPU Information</h2>
          <p>Jumlah Core: {health.cpu.cores}</p>
          <p>Load Average: {health.cpu.loadAverage.join(", ")}</p>

          <h2>Node.js Process Memory</h2>
          <p>RSS: {health.memory.processRSS} bytes</p>
          <p>Heap Used: {health.memory.processHeapUsed} bytes</p>

          <p>Timestamp: {health.timestamp}</p>
        </>
      )}
    </div>
  );
}

export default App;
