const isDev = import.meta.env.MODE === "development";

const log = {
  debug: (...args: unknown[]) => {
    if (isDev) console.debug("[🔍DEBUG]", ...args);
  },
  info: (...args: unknown[]) => {
    if (isDev) console.info("[ℹ️INFO]", ...args);
  },
  warn: (...args: unknown[]) => {
    console.warn("[⚠️WARN]", ...args);
  },
  error: (...args: unknown[]) => {
    console.error("[❌ERROR]", ...args);
  },
};

export default log;