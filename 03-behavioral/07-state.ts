/**
 * ! State Pattern
 * This pattern allows an object to change its behavior
 * when its internal state changes.
 *
 * * It's useful when an object has behavior that depends on its state
 * * and must change its behavior at runtime depending on that state.
 *
 * https://refactoring.guru/design-patterns/state
 */

import { COLORS } from '../helpers/colors.ts'
import { sleep } from '../helpers/sleep.ts'

/**
 * * Objective: Implement the State pattern to simulate the operation
 * * of a vending machine.
 * * The machine has different states,
 *  * Like Waiting for Money,
 *  * Selecting Product,
 *  * Delivering Product,
 * * and its behavior varies depending on the current state.
 */
interface State {
  name: string

  insertMoney(): void
  selectProduct(): void
  dispenseProduct(): void
}

class VendingMachine {
  private state: State

  constructor() {
    this.state = new WaitingForMoney(this)
  }

  insertMoney(): void {
    this.state.insertMoney()
  }

  selectProduct(): void {
    this.state.selectProduct()
  }

  dispenseProduct(): void {
    this.state.dispenseProduct()
  }

  setState(newState: State) {
    this.state = newState

    console.log(`%cState changed to: ${this.state.name}`, COLORS.yellow)
  }

  getState(): string {
    return this.state.name
  }
}

class WaitingForMoney implements State {
  public name: string = 'Waiting for Money'
  public vendingMachine: VendingMachine

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine
  }

  insertMoney(): void {
    console.log(`%cNow you can select the product`, COLORS.green)

    this.vendingMachine.setState(new ProductSelected(this.vendingMachine))
  }

  selectProduct(): void {
    console.log(`%cPlease insert money first.`, COLORS.red)
  }

  dispenseProduct(): void {
    console.log(`%cPlease insert money first.`, COLORS.red)
  }
}

class ProductSelected implements State {
  public name: string = 'Selecting Product'
  public vendingMachine: VendingMachine

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine
  }

  insertMoney(): void {
    console.log(`%cPlease select a product first.`, COLORS.red)
  }

  selectProduct(): void {
    console.log(`%cProduct selected.`, COLORS.green)

    this.vendingMachine.setState(new DispenseredProduct(this.vendingMachine))
  }

  dispenseProduct(): void {
    console.log(`%cPlease select a product first.`, COLORS.red)
  }
}

class DispenseredProduct implements State {
  public name: string = 'Dispensing Product'
  public vendingMachine: VendingMachine

  constructor(vendingMachine: VendingMachine) {
    this.vendingMachine = vendingMachine
  }

  insertMoney(): void {
    console.log(`%cPlease wait to dispense your product.`, COLORS.red)
  }

  selectProduct(): void {
    console.log(`%cPlease wait to dispense your product.`, COLORS.red)
  }

  dispenseProduct(): void {
    console.log(`%cProduct dispensed successfully.`, COLORS.green)

    this.vendingMachine.setState(new WaitingForMoney(this.vendingMachine))
  }
}

async function main() {
  const vendingMachine = new VendingMachine()

  let selectedOption: string | null = '4'

  do {
    console.clear()
    console.log(`Select an option: %c${vendingMachine.getState()}`, COLORS.cyan)

    selectedOption = prompt(`
      1. Insert Money
      2. Select Product
      3. Dispense Product
      4. Exit

    opcion:`)

    switch (selectedOption) {
      case '1':
        vendingMachine.insertMoney()
        break
      case '2':
        vendingMachine.selectProduct()
        break
      case '3':
        vendingMachine.dispenseProduct()
        break
      case '4':
        console.log('%cExiting...', COLORS.violet)
        break

      default:
        console.log('%cInvalid option. Please try again.', COLORS.red)
    }

    await sleep(3000)
  } while (selectedOption !== '4')
}

main()
