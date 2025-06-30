import Fastify, { FastifyBaseLogger } from "fastify";
import pino from "pino";
import pretty from "pino-pretty";
import { v4 as uuidv4 } from "uuid";

import { start } from "./app";

const logger = pino(
  { redact: ["requestHeaders.authorization"], level: "info" },
  pretty({ colorize: true })
) as unknown as FastifyBaseLogger;

const app = Fastify({
  logger,
  genReqId: () => uuidv4(),
});

start(app).catch((err) => {
  console.error(err);
  process.exit(1);
});
