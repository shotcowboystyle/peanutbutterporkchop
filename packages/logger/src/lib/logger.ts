import {
  Consola,
  BasicReporter,
  FancyReporter,
  LogLevel,
  logType,
} from 'consola';

const DEFAULT_LOGGING_LEVEL = LogLevel.Verbose; // log everything by default

const isProd = process.env['NODE_ENV'] === 'production';
const loggingLevel = process.env['LOGGING_LEVEL'];

export type LogsByType = {
  [t in logType]?: string[];
};

export default function getLogger(name: string, ci = false) {
  const commonOptions = isProd
    ? {
        reporters: [
          new FancyReporter({
            dateFormat: 'HH:mm:ss YYYY/DD/MM',
            formatOptions: {
              colors: true,
              compact: false,
            },
          }),
        ],
      }
    : {};

  const consola = new Consola({
    ...commonOptions,
    level: (loggingLevel || DEFAULT_LOGGING_LEVEL) as number,
  });

  const logger = consola.withTag(`[PeanutButterPorkChop]/[${name}]`);

  if (ci) {
    logger.setReporters([new BasicReporter()]);
  }

  return logger;
}
