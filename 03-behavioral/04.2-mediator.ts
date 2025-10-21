/**
 * ! Mediator Pattern
 * It's a behavioral design pattern that helps reduce
 * messy dependencies between objects.
 * This pattern limits direct communication between them,
 * making them interact only through a mediator object.
 *
 * * It's useful to reduce the complexity of relationships between objects
 *
 * https://refactoring.guru/design-patterns/mediator
 */

/**
 * 1.	ControlTower Class:
  •	Acts as the Mediator between airplanes.
    The control tower coordinates communications between airplanes
    to avoid collisions and receive their takeoff
    or landing requests.

  2.	Airplane Class:
  •	Represents an airplane that can send and receive messages
    through the control tower.
    Airplanes don't communicate directly with each other,
    but through the control tower, which manages the information.

  3.	Interactions:
  •	Airplanes can request permission to land or take off,
    and the control tower will send messages to other airplanes
    notifying them of each airplane's activity.
 */

import { COLORS } from '../helpers/colors.ts'

// Mediator Class - ControlTower
class ControlTower {
  private airplanes: Airplane[] = []

  registerAirplane(airplane: Airplane): void {
    this.airplanes.push(airplane)
  }

  sendMessage(sender: Airplane, message: string): void {
    this.airplanes
      .filter((airplane) => airplane !== sender)
      .forEach((airplane) => {
        airplane.receiveMessage(sender, message)
      })
  }

  // Landing coordination
  requestLanding(sender: Airplane): void {
    console.log(
      `\n%cControl Tower: %cLanding permission granted to ${sender.getId()}`,
      COLORS.green,
      COLORS.white
    )

    this.sendMessage(sender, `${sender.getId()} is landing.`)
  }

  // Takeoff coordination
  requestTakeoff(sender: Airplane): void {
    console.log(
      `\n%cControl Tower: %cTakeoff permission granted to ${sender.getId()}`,
      COLORS.green,
      COLORS.white
    )

    this.sendMessage(sender, `${sender.getId()} is taking off.`)
  }
}

// Colleague Class - Airplane
class Airplane {
  private id: string
  private controlTower: ControlTower

  constructor(id: string, controlTower: ControlTower) {
    this.id = id
    this.controlTower = controlTower

    controlTower.registerAirplane(this)
  }

  getId(): string {
    return this.id
  }

  // Request landing from control tower
  requestLanding(): void {
    console.log(`${this.id} requests permission to land.`)

    this.controlTower.requestLanding(this)
  }

  // Request takeoff from control tower
  requestTakeoff(): void {
    console.log(`${this.id} requests permission to take off.`)

    this.controlTower.requestTakeoff(this)
  }

  // Receive message from other airplanes
  receiveMessage(sender: Airplane, message: string): void {
    console.log(
      `${this.id} receives message from %c${sender.getId()}: "${message}"`,
      COLORS.blue
    )
  }
}

function main(): void {
  const controlTower = new ControlTower()

  const airplane1 = new Airplane('Flight 101', controlTower)
  const airplane2 = new Airplane('Flight 202', controlTower)
  const airplane3 = new Airplane('Flight 303', controlTower)

  // Example interactions
  airplane1.requestLanding()
  airplane2.requestTakeoff()
  airplane3.requestLanding()
}

main()
