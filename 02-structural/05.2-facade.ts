/**
 * ! Facade Pattern
 * This pattern provides a unified interface for a set of interfaces
 * in a subsystem.
 *
 * Facade defines a higher-level interface that makes the subsystem
 * easier to use.
 *
 * * It's useful when a subsystem is complex or difficult to understand to
 * * provide a simplified interface for the client.
 *
 * https://refactoring.guru/design-patterns/facade
 */

// !Task: Computer Startup System with Facade Pattern

import { COLORS } from '../helpers/colors.ts'

// 1. Subsystem Classes

class CPU {
  stopOperations(): void {
    console.log('CPU: Stopping operations.')
  }

  jump(position: number): void {
    console.log(`CPU: Jumping to memory position ${position}.`)
  }

  execute(): void {
    console.log('CPU: Executing instructions.')
  }
}

class HardDrive {
  read(position: number, size: number): string {
    console.log(`HardDrive: Reading ${size} bytes from position ${position}.`)
    return '001010001010100'
  }

  close() {
    console.log('HardDrive: Stopping hard drive.')
  }
}

class Memory {
  load(position: number, data: string): void {
    console.log(`Memory: Loading data at position ${position} ${data}.`)
  }

  free(): void {
    console.log('Memory: Freeing memory.')
  }
}

// 2. Facade Class - ComputerFacade

class ComputerFacade {
  private hardDrive: HardDrive = new HardDrive()
  private memory: Memory = new Memory()
  private cpu: CPU = new CPU()

  constructor() { }

  startComputer(): void {
    console.log('\n%cStarting computer...', COLORS.cyan)

    this.memory.load(0, this.hardDrive.read(0, 1024))
    this.cpu.jump(0)
    this.cpu.execute()

    console.log('Computer ready to use.\n')
  }

  shutDownComputer(): void {
    console.log('\n%cShutting down computer...', COLORS.red)
    console.log('Closing processes and saving data...')

    this.cpu.stopOperations()
    this.memory.free()
    this.hardDrive.close()

    console.log('Computer shut down.\n')
  }
}

// 3. Client Code to Use the Facade
function main() {
  const computer = new ComputerFacade()

  // Start the computer using the facade
  computer.startComputer()

  // Shut down the computer using the facade
  computer.shutDownComputer()
}

main()
