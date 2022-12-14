/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Tokens used to identify a specific defined type during the dependency injection process
 */
declare namespace Tokens {
  const RESULT_SYMBOL: unique symbol = Symbol('OS_RESULT_SYMBOL');
  const DATE_TIME_SYMBOL: unique symbol = Symbol('OS_DATE_TIME_SYMBOL');
}

/**
 * The valid types of the index for an `Indexable` type object
 */
declare type IndexType = string | number | symbol;

/**
 * The declaration of a ***dictionary-type*** object
 */
declare type Indexable = {
  [index: IndexType]: any;
};

declare interface ILogger {
  /**
   * Log success message
   */
  success: (message: string) => Promise<void>;

  /**
   * Log error message
   */
  error: (message: string) => Promise<void>;

  /**
   * Log warn message
   */
  warn: (message: string) => Promise<void>;

  /**
   * Log info message
   */
  info: (message: string) => Promise<void>;

  /**
   * Log debug message
   */
  debug: (message: string) => Promise<void>;
}

declare interface ICustomUtilityClass {
  /**
   * The object instance Id
   */
  _id: string;

  /**
   * A symbol representing the class type
   */
  _symbol: symbol;

  /**
   * A string representation of the class
   */
  _type: string;

  /**
   * Returns back a hash code to identify this specific instance
   *
   * @remarks The combination of class name and Id
   */
  getHashCode: () => string;
}

declare interface IError extends Error {
  /**
   * Additional information to display in an extended area below the message bar
   */
  extendedMessage?: string;
}

declare interface AbortError extends IError {
  name: 'abort';

  message: 'Aborted';
}

declare type IResult<
  TError extends IError | null = null,
  TData = unknown,
> = ICustomUtilityClass & {
  /**
   * The source of the error
   */
  source: ResultSourceTypes;

  /**
   * Any data returned from the process/function
   */
  data?: TData;

  /**
   *  A generic error type.
   */
  error?: TError;

  /**
   * Can the application reset the state automatically through the error boundary when the error occurs
   *
   * @defaultValue `true`
   */
  isResettable: boolean;

  /**
   * A function to check if the provided object is an error
   */
  isError: () => boolean;

  /**
   * A function to check if the provided object was successful
   */
  isSuccess: () => boolean;

  /**
   * A function to check if the provided object is the same type of result of the calling result
   */
  isEqual: (result?: unknown) => boolean;

  /**
   * The date-time the result occurred
   */
  timestamp: IDateTime;
};

/**
 * Values representing the origin of a result returned/thrown in the application
 *
 * @defaultValueResultSourceTypes.UNKNOWN
 */
declare enum ResultSourceTypes {
  UNKNOWN = 0,
  RENDERING = 1,
  SERVER = 2,
  EXCEPTION = 3,
  VALIDATION = 4,
  ABORTED = 5,
}

declare interface SelectOption {
  /**
   * 	The string value to display in the field
   */
  name: string;

  /**
   * The value stored behind the scenes when selected
   */
  value: string;

  /**
   * Is the option value valid for selection in the dropdown
   */
  disabled: boolean;

  /**
   * Sets or retrieves whether the option in the list box is the default item.
   */
  selected: boolean;
}

declare const enum DateTimeFormatTypes {
  DATE_SERIALIZED = 'yyyyMMdd',
  TIME_SERIALIZED = 'HH:mm:ss',
  DATE_TIME_SERIALIZED = 'yyyyMMdd HH:mm:ss',

  TIME_SERIALIZED_TWO_FOUR = 'HHmmss',
  DATE_TIME_SERIALIZED_TWO_FOUR = 'yyyyMMddHHmmss',

  DATE_TIME_DISPLAY = 'MM/dd/yyyy h:mm:ss a',
  DATE_DISPLAY = 'MM/dd/yyyy',
  TIME_DISPLAY = 'h:mm:ss a',
  TIME_DISPLAY_SHORT = 'h:mm a',

  DATE_INPUT_FORMAT = 'MM/DD/YYYY',
  TIME_INPUT_FORMAT = 'HH:MM:SS',

  'DD-MM-YYYY' = 'DD-MM-YYYY',
  'YYYY-DD-MM' = 'YYYY-DD-MM',
  'YYYY-MM-DD' = 'YYYY-MM-DD',
  'DD-MM-YY' = 'DD-MM-YY',
  'YY-DD-MM' = 'YY-DD-MM',
  'YY-MM-DD' = 'YY-MM-DD',
  'DD-MM-YYYY HH:MM:SS' = 'DD-MM-YYYY HH:MM:SS',
  'YYYY-DD-MM HH:MM:SS' = 'YYYY-DD-MM HH:MM:SS',
  'YYYY-MM-DD HH:MM:SS' = 'YYYY-MM-DD HH:MM:SS',
  'DD-MM-YY HH:MM:SS' = 'DD-MM-YY HH:MM:SS',
  'YY-DD-MM HH:MM:SS' = 'YY-DD-MM',
  'YY-MM-DD HH:MM:SS' = 'YY-MM-DD HH:MM:SS',
  'DD/MM/YYYY' = 'DD/MM/YYYY',
  'YYYY/DD/MM' = 'YYYY/DD/MM',
  'YYYY/MM/DD' = 'YYYY/MM/DD',
  'DD/MM/YY' = 'DD/MM/YY',
  'YY/DD/MM' = 'YY/DD/MM',
  'YY/MM/DD' = 'YY/MM/DD',
  'DD/MM/YYYY HH:MM:SS' = 'DD/MM/YYYY HH:MM:SS',
  'YYYY/DD/MM HH:MM:SS' = 'YYYY/DD/MM HH:MM:SS',
  'YYYY/MM/DD HH:MM:SS' = 'YYYY/MM/DD HH:MM:SS',
  'DD/MM/YY HH:MM:SS' = 'DD/MM/YY HH:MM:SS',
  'YY/DD/MM HH:MM:SS' = 'YY/DD/MM',
  'YY/MM/DD HH:MM:SS' = 'YY/MM/DD HH:MM:SS',
}

/**
 * Wrap the `Temporal.Instant` object so we can re-use it in other places
 */
declare interface IDateTime extends any, ICustomUtilityClass {}

