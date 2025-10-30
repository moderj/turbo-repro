import type { z } from 'zod';

export const createLoggerSchema = (zod: typeof z) =>
  zod
    .object({
      logLevel: zod.string(),
      sendToElastic: zod.number(),
      elasticApmActive: zod.enum(['true', 'false']),
      apm: zod
        .object({
          serviceName: zod.string(),
          secretToken: zod.string(),
          serverUrl: zod.string().url(),
        })
        .optional(),
      elastic: zod
        .object({
          url: zod.string().url(),
          index: zod.string(),
          apiKey: zod.string(),
        })
        .optional(),
    })
    .superRefine((data, ctx) => {
      if (data.sendToElastic === 1 && !data.elastic) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: 'Elastic configuration is required when sendToElastic is 1',
          path: ['elastic'],
        });
      }

      if (data.elasticApmActive === 'true' && !data.apm) {
        ctx.addIssue({
          code: zod.ZodIssueCode.custom,
          message: 'APM configuration is required when elasticApmActive is true',
          path: ['apm'],
        });
      }
    });

export const loggerConfig = () => {
  const sendToElastic = Number(process.env.SEND_TO_ELASTIC || 0) !== 0 ? 1 : 0;
  const elasticApmActive =
    process.env.ELASTIC_APM_ACTIVE === 'false' ? ('false' as const) : ('true' as const);

  return {
    logLevel: 'info',
    sendToElastic,
    elasticApmActive,
    ...(sendToElastic
      ? {
          elastic: {
            url: process.env.ELASTIC_URL!,
            index: process.env.ELASTIC_INDEX!,
            apiKey: process.env.ELASTIC_API_KEY!,
          },
        }
      : {}),
    ...(elasticApmActive === 'true'
      ? {
          apm: {
            serviceName: process.env.ELASTIC_APM_SERVICE_NAME!,
            secretToken: process.env.ELASTIC_APM_SECRET_TOKEN!,
            serverUrl: process.env.ELASTIC_APM_SERVER_URL!,
          },
        }
      : {}),
  };
};
