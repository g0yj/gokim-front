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
  // formData를 로깅하기 위한 메서드
  logFormData: (formData: FormData) => {
    if (!isDev) return;
    console.debug("[🔍FormData]");
    for (let pair of formData.entries()) {
      console.debug(`${pair[0]}: ${pair[1]}`);
    }
    console.debug("[🏁END]", "이 메시지 이후 처리가 완료되었습니다.");
  },
};

export default log;
