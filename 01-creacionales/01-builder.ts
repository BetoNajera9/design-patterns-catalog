/**
 * ! Builder Pattern:
 * It is a creational design pattern that allows us to construct complex objects
 * step by step.
 *
 * The pattern lets us produce different types and representations
 * of an object using the same construction code.
 *
 * * It is useful when we need to build a complex object with many parts
 * * and we want the construction process to be independent of the parts
 * * that compose it.
 *
 * https://refactoring.guru/design-patterns/builder
 */

import { COLORS } from "../helpers/colors.ts";

class Computer {
  public cpu: string = 'CPU - is not defined'
  public ram: string = 'RAM - is not defined'
  public storage: string = 'Storage - is not defined'
  public gpu?: string

  displayInfo(): void {
    console.log('%c--- Computer Configuration ---', COLORS.cyan)
    console.log(`%cCPU: ${this.cpu}`, COLORS.yellow)
    console.log(`%cRAM: ${this.ram}`, COLORS.yellow)
    console.log(`%cStorage: ${this.storage}`, COLORS.yellow)

    if (this.gpu)
      console.log(`%cGPU: ${this.gpu}`, COLORS.yellow)
  }
}

class ComputerBuilder {
  private computer: Computer

  constructor() {
    this.computer = new Computer()
  }

  setCPU(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu
    return this
  }

  setRAM(ram: string): ComputerBuilder {
    this.computer.ram = ram
    return this
  }

  setStorage(storage: string): ComputerBuilder {
    this.computer.storage = storage
    return this
  }

  setGPU(gpu: string): ComputerBuilder {
    this.computer.gpu = gpu
    return this
  }

  build(): Computer {
    return this.computer
  }
}

function main() {
  const gamingPC = new ComputerBuilder()
    .setCPU('Intel Core i9')
    .setRAM('32GB')
    .setStorage('1TB SSD')
    .build()

  gamingPC.displayInfo()

  const officePC = new ComputerBuilder()
    .setCPU('Intel Core i5')
    .setRAM('16GB')
    .setStorage('512GB SSD')
    .setGPU('NVIDIA GTX 1660')
    .build()

  officePC.displayInfo()
}

main()