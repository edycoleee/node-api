//middleware/logger.js
import logger from 'pino';
const logConsole = logger({
  base: { pid: false },
  transport: {
    target: 'pino-pretty',
    options: {
      colorized: true
    }
  },
  timestamp: () => `,"time": "${new Date().toLocaleString()}"`
});

export default logConsole;
