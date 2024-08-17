import "server-only";
import * as Sentry from "@sentry/nextjs";

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
    log.info(
      {
        namespace: options?.location,
        ...options,
      },
      message
    );
    if (process.env.NODE_ENV === "production") {
      Sentry.captureMessage(
        JSON.stringify({
          message,
          namespace: options?.location,
          ...options,
        })
      );
    }
  }
  error(message: string, options?: LogOptions) {
    log.error(
      {
        error: options?.message,
        namespace: options?.location,
        ...options,
      },
      message
    );
    if (process.env.NODE_ENV === "production") {
      Sentry.captureException(message, {
        data: {
          ...options,
        },
      });
    }
  }
  warn(message: string, options?: LogOptions) {
    log.warn(
      {
        namespace: options?.location,
        ...options,
      },
      message
    );
    if (process.env.NODE_ENV === "production") {
      Sentry.captureMessage(
        JSON.stringify({
          message,
          namespace: options?.location,
          ...options,
        })
      );
    }
  }
}

const logger: Logger = new Logger();
export default logger;
