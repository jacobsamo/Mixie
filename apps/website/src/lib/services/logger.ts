"use server";
import { log } from "next-axiom";

type LogLevel = "info" | "error" | "warn";
type LogOptions = {
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
};

interface Logger {
  info(message: string, options?: LogOptions): void;
  error(message: string, options?: LogOptions): void;
  warn(message: string, options?: LogOptions): void;
}

class Logger implements Logger {
  info(message: string, options?: LogOptions) {
    log.info(message, options);
  }
  error(message: string, options?: LogOptions) {
    log.error(message, options);
  }
  warn(message: string, options?: LogOptions) {
    log.warn(message, options);
  }
}

const logger: Logger = new Logger();
export default logger;
