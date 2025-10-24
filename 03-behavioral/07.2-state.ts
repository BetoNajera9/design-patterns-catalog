/**
 * ! State Pattern
 * This pattern allows an object to change its behavior
 * when its internal state changes.
 *
 * * It's useful when an object has behavior that depends on its state
 * * and must change its behavior at runtime depending on that state.
 */

import { COLORS, sleep } from '../helpers/index.ts'

/**
 * !Objective:
 * Implement the State pattern to simulate the operation of an automatic
 * door.
 *
 * The door has different states:
 *  - Closed
 *  - Opening
 *  - Open
 *  - Closing
 * Its behavior varies depending on the current state.
 */

// State Interface
interface State {
  name: string

  open(): void
  close(): void
}

// Context Class - AutomaticDoor
class AutomaticDoor {
  private state: State

  constructor() {
    this.state = new Closed(this)
  }

  setState(state: State): void {
    this.state = state
    console.log(`%cState changed to: ${state.name}`, COLORS.green)
  }

  open(): void {
    this.state.open()
  }

  close(): void {
    this.state.close()
  }

  getStateName(): string {
    return this.state.name
  }
}

// State 1 - Closed
class Closed implements State {
  private door: AutomaticDoor
  public name: string

  constructor(door: AutomaticDoor) {
    this.door = door
    this.name = 'Closed'
  }

  open(): void {
    console.log('Opening the door...')

    this.door.setState(new Opening(this.door))
  }

  close(): void {
    console.log('The door is already closed.')
  }
}

// State 2 - Opening
class Opening implements State {
  public name: string
  private door: AutomaticDoor

  constructor(door: AutomaticDoor) {
    this.door = door
    this.name = 'Opening'

    this.afterOpen()
  }

  private async afterOpen() {
    await sleep(3000)

    console.log('The door has opened.')

    this.door.setState(new Open(this.door))
  }

  open(): void {
    console.log('The door is already opening.')
  }

  close(): void {
    console.log('The door cannot be closed while it is opening.')
  }
}

// State 3 - Open
class Open implements State {
  private door: AutomaticDoor
  public name: string

  constructor(door: AutomaticDoor) {
    this.door = door
    this.name = 'Open'
  }

  open(): void {
    console.log('The door is already open.')
  }

  close(): void {
    console.log('Closing the door...')

    this.door.setState(new Closing(this.door))
  }
}

// State 4 - Closing
class Closing implements State {
  public name: string
  private door: AutomaticDoor

  constructor(door: AutomaticDoor) {
    this.door = door
    this.name = 'Closing'

    this.afterClose()
  }

  async afterClose() {
    await sleep(3000)

    console.log('The door has closed.')

    this.door.setState(new Closed(this.door))
  }

  open(): void {
    console.log('Detecting movement. Opening the door again...')
    this.door.setState(new Opening(this.door))
  }

  close(): void {
    console.log('The door has closed.')
    this.door.setState(new Closed(this.door))
  }
}

// Client code to test the State pattern
async function main() {
  const door = new AutomaticDoor()

  let selectedOption: string | null = '3'

  do {
    console.clear()
    console.log(`Current state: ${door.getStateName()}`)
    selectedOption = prompt(`
      1. Open door
      2. Close door
      3. Exit

      Select an option: 
    `)

    switch (selectedOption) {
      case '1':
        door.open()
        break
      case '2':
        door.close()
        break
      case '3':
        console.log('Exiting simulator...')
        break
      default:
        console.log('Invalid option.')
        break
    }

    await sleep(2000)
  } while (selectedOption !== '3')
}

main()
