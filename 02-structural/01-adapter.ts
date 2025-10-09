/**
 * ! Adapter Pattern
 *  Allows objects with incompatible interfaces to work together, also very
 *  useful for using third-party libraries in our application without depending
 *  directly on them.
 *
 * * It's useful when you want to reuse a class that doesn't have the interface
 * * we need or when we want to create an abstraction layer for a third-party
 * * library.
 *
 * https://refactoring.guru/design-patterns/adapter
 */

// import { LocalLogger } from "./adapter-files/local-logger.ts";
import { DenoLoggerAdapter } from './adapter-files/logger-adapter.ts'

const logger = new DenoLoggerAdapter('01-adapter.ts')

logger.writeLog('Hello from Adapter pattern example!')

logger.writeWarning('This is a warning message!')

logger.writeError('This is an error message!')
