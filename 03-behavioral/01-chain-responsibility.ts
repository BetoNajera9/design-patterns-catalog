/**
 * ! Chain of Responsibility Pattern
 * It's a behavioral design pattern that allows you to pass requests
 * along a chain of handlers.
 *
 * * It's useful when you need to process data in different ways, but you don't
 * * know in advance what type of processing is needed or in what order
 * * but you know it needs to be processed in sequence.
 *
 * https://refactoring.guru/design-patterns/chain-of-responsibility
 */

import { COLORS } from '../helpers/colors.ts'

interface Handler {
  setNext(handler: Handler): Handler
  handler(request: string): void
}

abstract class BaseHandler implements Handler {
  private nextHandler?: Handler

  setNext(handler: Handler): Handler {
    this.nextHandler = handler
    return handler
  }
  handler(request: string): void {
    if (this.nextHandler) {
      this.nextHandler.handler(request)
    }
  }
}

// Basic support
class BasicSupport extends BaseHandler {
  override handler(request: string): void {
    if (request === 'basic') {
      console.log(
        'BasicSupport: %cHandling basic support request.\n',
        COLORS.green
      )
      return
    }

    console.log(
      '%cBasicSupport: Continuing with the problem to advanced support.',
      COLORS.red
    )
    super.handler(request)
  }
}

// Advanced support
class AdvancedSupport extends BaseHandler {
  override handler(request: string): void {
    if (request === 'advanced') {
      console.log(
        'AdvancedSupport: %cHandling advanced support request.\n',
        COLORS.blue
      )
      return
    }

    console.log(
      '%cAdvancedSupport: Continuing with the problem to expert support.',
      COLORS.red
    )
    super.handler(request)
  }
}

// Expert support
class ExpertSupport extends BaseHandler {
  override handler(request: string): void {
    if (request === 'expert') {
      console.log(
        'ExpertSupport: %cHandling expert support request.\n',
        COLORS.purple
      )
      return
    }

    console.log(
      "%cExpertSupport: It's nothing to do here, bye 👋\n",
      COLORS.red
    )
  }
}

function main() {
  const basicSupport = new BasicSupport()
  const advancedSupport = new AdvancedSupport()
  const expertSupport = new ExpertSupport()

  basicSupport.setNext(advancedSupport).setNext(expertSupport)

  basicSupport.handler('basic')
  basicSupport.handler('advanced')
  basicSupport.handler('expert')
  basicSupport.handler('nothing')
}

main()
