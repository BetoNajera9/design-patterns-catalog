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

import { COLORS } from '../helpers/colors.ts'

// 1. PaymentProcessor Interface
interface PaymentProcessor {
  processPayment(amount: number): void
}

// 2. External Payment Service Classes
// These classes simulate external services from PayPal, Stripe and MercadoPago

class PayPalService {
  sendPayment(amount: number): void {
    console.log(`Processing payment of $${amount} with %cPayPal`, COLORS.blue)
  }
}

class StripeService {
  makeCharge(amount: number): void {
    console.log(`Processing payment of $${amount} with %cStripe`, COLORS.purple)
  }
}

class MercadoPagoService {
  pay(amount: number): void {
    console.log(
      `Processing payment of $${amount} with %cMercadoPago`,
      COLORS.yellow
    )
  }
}

// 3. Adapter Classes

// PayPal Adapter
class PayPalAdapter implements PaymentProcessor {
  private paypalService = new PayPalService()

  processPayment(amount: number): void {
    this.paypalService.sendPayment(amount)
  }
}

// Stripe Adapter
class StripeAdapter {
  private stripeService = new StripeService()

  processPayment(amount: number): void {
    this.stripeService.makeCharge(amount)
  }
}

// MercadoPago Adapter
class MercadoPagoAdapter {
  private mercadoPagoService = new MercadoPagoService()

  processPayment(amount: number): void {
    this.mercadoPagoService.pay(amount)
  }
}

// 4. Client Code to test the Adapter

function main() {
  const paymentAmount = 100

  const paypalProcessor: PaymentProcessor = new PayPalAdapter()
  const stripeProcessor: PaymentProcessor = new StripeAdapter()
  const mercadoPagoProcessor: PaymentProcessor = new MercadoPagoAdapter()

  // Process payments with different services
  // All 3 payment processors work exactly the same after being adapted
  console.log('%cUsing PayPal:', COLORS.blue)
  paypalProcessor.processPayment(paymentAmount)

  console.log('\n%cUsing Stripe:', COLORS.purple)
  stripeProcessor.processPayment(paymentAmount)

  console.log('\n%cUsing MercadoPago:', COLORS.yellow)
  mercadoPagoProcessor.processPayment(paymentAmount)
}

main()
