/**
 * !Visitor Pattern
 *
 * The Visitor pattern is a behavioral design pattern
 * that lets you separate algorithms from the objects
 * on which they operate.
 *
 * * It's useful when you need to add new operations to
 * * stable classes without changing their code.
 *
 * https://refactoring.guru/design-patterns/visitor
 */

/**
 * !Objective:
 * Implement the Visitor pattern in a vehicle management system
 * that allows performing specific operations on different
 * types of vehicles (cars, motorcycles and trucks).
 *
 * These operations include calculating maintenance cost
 * and verifying if vehicles comply with emission standards.
 */

import { COLORS } from '../helpers/colors.ts'

// Visitor Interface
interface Visitor {
  visitCar(car: Car): void
  visitMotorcycle(motorcycle: Motorcycle): void
  visitTruck(truck: Truck): void
}

// Vehicle Interface
interface Vehicle {
  accept(visitor: Visitor): void
}

// Concrete class - Car
class Car implements Vehicle {
  private year: number
  private kilometers: number

  constructor(year: number, kilometers: number) {
    this.year = year
    this.kilometers = kilometers
  }

  getYear(): number {
    return this.year
  }

  getKilometers(): number {
    return this.kilometers
  }

  accept(visitor: Visitor): void {
    visitor.visitCar(this)
  }
}

// Concrete class - Motorcycle
class Motorcycle implements Vehicle {
  private year: number
  private kilometers: number

  constructor(year: number, kilometers: number) {
    this.year = year
    this.kilometers = kilometers
  }

  getYear(): number {
    return this.year
  }

  getKilometers(): number {
    return this.kilometers
  }

  accept(visitor: Visitor): void {
    visitor.visitMotorcycle(this)
  }
}

// Concrete class - Truck
class Truck implements Vehicle {
  private year: number
  private kilometers: number
  private loadCapacity: number

  constructor(year: number, kilometers: number, loadCapacity: number) {
    this.year = year
    this.kilometers = kilometers
    this.loadCapacity = loadCapacity
  }

  getYear(): number {
    return this.year
  }

  getKilometers(): number {
    return this.kilometers
  }

  getLoadCapacity(): number {
    return this.loadCapacity
  }

  accept(visitor: Visitor): void {
    visitor.visitTruck(this)
  }
}

// Visitor class - MaintenanceCostVisitor
class MaintenanceCostVisitor implements Visitor {
  visitCar(car: Car): void {
    const cost = car.getKilometers() * 0.1 + (2025 - car.getYear()) * 50

    console.log(`Maintenance cost for car: $${cost.toFixed(2)}`)
  }

  visitMotorcycle(motorcycle: Motorcycle): void {
    const cost =
      motorcycle.getKilometers() * 0.05 + (2025 - motorcycle.getYear()) * 30

    console.log(`Maintenance cost for motorcycle: $${cost.toFixed(2)}`)
  }

  visitTruck(truck: Truck): void {
    const cost =
      truck.getKilometers() * 0.15 +
      truck.getLoadCapacity() * 20 +
      (2025 - truck.getYear()) * 100

    console.log(`Maintenance cost for truck: $${cost.toFixed(2)}`)
  }
}

// Visitor class - EmissionCheckVisitor
class EmissionCheckVisitor implements Visitor {
  visitCar(car: Car): void {
    const passes = car.getYear() > 2000 && car.getKilometers() < 200_000

    console.log(`Car meets emissions: ${passes ? 'Yes' : 'No'}`)
  }

  visitMotorcycle(motorcycle: Motorcycle): void {
    const passes =
      motorcycle.getYear() > 2005 && motorcycle.getKilometers() < 100_000

    console.log(`Motorcycle meets emissions: ${passes ? 'Yes' : 'No'}`)
  }

  visitTruck(truck: Truck): void {
    const passes = truck.getYear() > 2010 && truck.getKilometers() < 300_000

    console.log(`Truck meets emissions: ${passes ? 'Yes' : 'No'}`)
  }
}

// ! Client Code
// ! There should be no changes here
function main(): void {
  const vehicles: Vehicle[] = [
    new Car(2018, 50_000),
    new Motorcycle(2015, 30_000),
    new Truck(2012, 250_000, 20),
  ]

  console.log('%c\nCalculating maintenance costs:', COLORS.green)
  const maintenanceVisitor = new MaintenanceCostVisitor()
  vehicles.forEach(vehicle => vehicle.accept(maintenanceVisitor))

  console.log('%c\nChecking emissions:', COLORS.green)
  const emissionVisitor = new EmissionCheckVisitor()
  vehicles.forEach(vehicle => vehicle.accept(emissionVisitor))
}

main()
