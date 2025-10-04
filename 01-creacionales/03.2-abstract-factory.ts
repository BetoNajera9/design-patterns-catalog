/**
 * ! Abstract Factory:
 * It is a design pattern that allows creating families of related objects
 * without specifying their concrete classes.
 *
 * Instead of creating individual objects directly,
 * we create factories that produce a set of related objects.
 *
 * * It is useful when you need to create objects that are part of a family
 * * and you want to ensure that these objects complement each other.
 *
 * https://refactoring.guru/design-patterns/abstract-factory
 */

import { COLORS } from '../helpers/colors.ts'

/**
 * !Instructions:
    1. Complete the Product Classes:
    •	ElectricCar should implement Vehicle and show the message "Assembling an electric car".
    •	GasCar should implement Vehicle and show the message "Assembling a combustion car".
    •	ElectricEngine should implement Engine and show the message "Starting electric engine".
    •	GasEngine should implement Engine and show the message "Starting combustion engine".

  2.	Complete the Factory Classes:
    •	ElectricVehicleFactory should create an ElectricCar and an ElectricEngine.
    •	GasVehicleFactory should create a GasCar and a GasEngine.

  3. Test the Code:
    •	Run the code to ensure that each factory produces the correct type of vehicle and engine.

 */

// 1. Vehicle and Engine interfaces
interface Vehicle {
  assemble(): void
}

interface Engine {
  start(): void
}

// 2. Concrete Product Classes
class ElectricCar implements Vehicle {
  assemble(): void {
    console.log('Assembling an %celectric car', COLORS.green)
  }
}

class GasCar implements Vehicle {
  assemble(): void {
    console.log('Assembling a %ccombustion car', COLORS.brown)
  }
}

class ElectricEngine implements Engine {
  start(): void {
    console.log('Starting %celectric engine', COLORS.green)
  }
}

class GasEngine implements Engine {
  start(): void {
    console.log('Starting %ccombustion engine', COLORS.brown)
  }
}

// 3. Abstract Factory Interface
interface VehicleFactory {
  createVehicle(): Vehicle
  createEngine(): Engine
}

// 4. Concrete Factory Classes
class ElectricVehicleFactory implements VehicleFactory {
  createVehicle(): Vehicle {
    return new ElectricCar()
  }
  createEngine(): Engine {
    return new ElectricEngine()
  }
}

class GasVehicleFactory implements VehicleFactory {
  createVehicle(): Vehicle {
    return new GasCar()
  }
  createEngine(): Engine {
    return new GasEngine()
  }
}

// 5. Client Code

function main(factory: VehicleFactory) {
  const vehicle = factory.createVehicle()
  const engine = factory.createEngine()

  vehicle.assemble()
  engine.start()
}

// Tests
console.log('%c----- Creating electric vehicle: -----', COLORS.cyan)
main(new ElectricVehicleFactory())

console.log('\n%c----- Creating combustion vehicle: -----', COLORS.cyan)
main(new GasVehicleFactory())
