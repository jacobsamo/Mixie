import { env } from "env";
import type { TransportTargetOptions } from "pino";
import pino from "pino";

// credit to openpanel for thier implementation of a logger: https://github.com/Openpanel-dev/openpanel/blob/3d0474d07b82872798871fc145a1eea299d9ea2f/packages/logger/index.ts
export function createLogger({ dataset }: { dataset: string }) {
  const targets: TransportTargetOptions[] =
    env.NODE_ENV !== "development"
      ? [
          {
            target: "@baselime/pino-transport",
            options: {
              baselimeApiKey: env.BASELIME_KEY,
              dataset,
            },
          },
        ]
      : [
          {
            target: "pino-pretty",
          },
        ];

  const transport = pino.transport({
    targets,
  });

  return pino(transport);
}
