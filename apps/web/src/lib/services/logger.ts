import { env } from "env";
import "server-only";

type LogLevel = "info" | "error" | "warn";

interface LogOptions {
  /**
   * Log level
   */
  level?: LogLevel;
  /**
   * Log message, extra information for the log
   */
  message?: string;
  /**
   * Status code of the request or error message
   */
  statusCode?: number;
  /**
   * Location of the request e.g url, part of app, function, etc
   */
  location?: string;
}

interface Logger {
  info(message: string, options?: LogOptions): void;
  error(message: string, options?: LogOptions): void;
  warn(message: string, options?: LogOptions): void;
}

const log = console;

class Logger implements Logger {
  info(message: string, options?: LogOptions) {
    if (env.NODE_ENV === "production") {
      log.info(
        JSON.stringify({ message, namespace: options?.location, ...options })
      );
    } else {
      log.info(message, options);
    }
  }
  error(message: string, options?: LogOptions) {
    if (env.NODE_ENV === "production") {
      log.error(
        JSON.stringify({
          message,
          error: options?.message,
          namespace: options?.location,
          ...options,
        })
      );
    } else {
      log.error(message, options);
    }
  }
  warn(message: string, options?: LogOptions) {
    if (env.NODE_ENV === "production") {
      log.warn(
        JSON.stringify({ message, namespace: options?.location, ...options })
      );
    } else {
      log.warn(message, options);
    }
  }
}

const logger: Logger = new Logger();
export default logger;
