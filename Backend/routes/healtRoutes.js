
const express = require("express");
const os = require("os");

const router = express.Router();

router.get("/health", (req, res) => {
    const memory = process.memoryUsage();

    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();

    const usedMemory = totalMemory - freeMemory;

    res.status(200).json({
        status: "UP",
        message: "Server is running normally",

        server: {
            hostname: os.hostname(),
            platform: os.platform(),
            nodeVersion: process.version
        },

        uptime: {
            seconds: Math.floor(process.uptime())
        },

        memory: {
            total: totalMemory,
            free: freeMemory,
            used: usedMemory,
            usagePercentage: Number(
                ((usedMemory / totalMemory) * 100).toFixed(2)
            ),
            processRSS: memory.rss,
            processHeapUsed: memory.heapUsed
        },

        cpu: {
            cores: os.cpus().length,
            loadAverage: os.loadavg()
        },

        timestamp: new Date().toISOString()
    });
});

module.exports = router;
