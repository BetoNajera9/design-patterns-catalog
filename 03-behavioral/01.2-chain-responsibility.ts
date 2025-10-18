/**
 * ! Chain of Responsibility Pattern
 * It's a behavioral design pattern that allows you to pass requests
 * along a chain of handlers.
 *
 * * It's useful when you need to process data in different ways, but you don't
 * * know in advance what type of processing is needed or in what order
 * * but you know it needs to be processed in sequence.
 */

import { COLORS } from '../helpers/colors.ts'

// 1. Approver Interface
interface Approver {
  setNext(approver: Approver): Approver
  approveRequest(amount: number): void
}

// 2. Abstract BaseApprover Class to handle the chain
abstract class BaseApprover implements Approver {
  private nextApprover: Approver | null = null

  setNext(approver: Approver): Approver {
    this.nextApprover = approver
    return approver
  }

  //! This method must be implemented by subclasses.
  abstract approveRequest(amount: number): void

  protected next(amount: number): void {
    if (this.nextApprover) {
      this.nextApprover.approveRequest(amount)
      return
    }

    console.log('Request could not be approved.')
  }
}

// 3. Concrete Approver Classes

class Supervisor extends BaseApprover {
  override approveRequest(amount: number): void {
    if (amount <= 1000) {
      console.log(`Supervisor: %cApproved request for $${amount}`, COLORS.green)
      return
    }

    console.log(
      `%cSupervisor: Cannot approve $${amount}, passing to next approver.`,
      COLORS.red
    )
    super.next(amount)
  }
}

class Manager extends BaseApprover {
  override approveRequest(amount: number): void {
    if (amount <= 5000) {
      console.log(`Manager: %cApproved request for $${amount}`, COLORS.green)
      return
    }

    console.log(
      `%cManager: Cannot approve $${amount}, passing to next approver.`,
      COLORS.red
    )
    super.next(amount)
  }
}

class Director extends BaseApprover {
  override approveRequest(amount: number): void {
    console.log(`Director: %cApproved request for $${amount}`, COLORS.green)
  }
}

// 4. Client Code to test the chain of responsibility

function main() {
  // Supervisor: <= $1000
  const supervisor = new Supervisor()
  // Manager: <= $5000
  const manager = new Manager()
  // Director can approve any amount
  const director = new Director()

  // Set up the chain of responsibility
  supervisor.setNext(manager).setNext(director)

  // Test different purchase requests
  console.log('Purchase request for $500:')
  supervisor.approveRequest(500)

  console.log('\nPurchase request for $3000:')
  supervisor.approveRequest(3000)

  console.log('\nPurchase request for $7000:')
  supervisor.approveRequest(7000)
}

main()
