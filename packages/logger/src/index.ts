import ecsFormat from '@elastic/ecs-pino-format';
import { pino } from 'pino';

const logLevel = process.env.LOG_LEVEL ?? 'info';

const transports = pino.transport({
  targets: [
    {
      target: 'pino/file',
    },
    ...(Number(process.env.SEND_TO_ELASTIC)
      ? [
          {
            target: 'pino-elasticsearch',
            options: {
              index: process.env.ELASTIC_INDEX,
              node: process.env.ELASTIC_URL,
              flushBytes: 1000,
              auth: { apiKey: process.env.ELASTIC_API_KEY! },
            },
          },
        ]
      : []),
  ],
});

const logger = pino({ level: logLevel, ...ecsFormat }, transports);

export default logger;
