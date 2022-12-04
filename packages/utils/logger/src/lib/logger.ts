import { Consola, BasicReporter, FancyReporter, LogLevel, logType } from 'consola';

const DEFAULT_LOGGING_LEVEL = LogLevel.Verbose; // log everything by default

const isProd = process.env['NODE_ENV'] === 'production';
const loggingLevel = process.env['LOGGING_LEVEL'];

export type LogsByType = {
  [t in logType]?: string[]
};

export default function getLogger(name: string, ci = false) {
  const commonOptions = isProd
    ? {
        reporters: [new FancyReporter({
          dateFormat: 'HH:mm:ss YYYY/DD/MM',
          formatOptions: {
              // @ts-expect-error something is wrong here, ultimately these types come from https://nodejs.org/api/util.html#util_util_inspect_object_options and `date` doesn't appear to be one of the options.
              date: true,
              colors: true,
              compact: false,
          },
        })],
      }
    : {};

  const consola = new Consola({
      ...commonOptions,
      level: (loggingLevel || DEFAULT_LOGGING_LEVEL) as number,
    });

  const logger = consola.withTag(name);

  if (ci) {
    logger.setReporters([new BasicReporter()]);
  }

  return logger;
}
