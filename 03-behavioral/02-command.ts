/**
 * ! Command Pattern
 * This pattern encapsulates a request as an object,
 * allowing you to parameterize other objects with different requests,
 * queue requests, or log requests, and supports operations that can be undone.
 *
 * I really liked the explanation from Refactoring Guru
 * https://refactoring.guru/design-patterns/command
 *
 * * It's useful when you need to decouple the object that invokes
 * * the operation from the object that knows how to perform it.
 *
 *
 */

import { COLORS } from '../helpers/colors.ts'

interface Command {
  execute(): void
}

class Light {
  turnOn(): void {
    console.log('%cThe light is on', COLORS.yellow)
  }

  turnOff(): void {
    console.log('%cThe light is off', COLORS.yellow)
  }
}

class Fan {
  turnOn(): void {
    console.log('%cThe fan is on', COLORS.green)
  }

  turnOff(): void {
    console.log('%cThe fan is off', COLORS.green)
  }
}

class LightOnCommand implements Command {
  constructor(private light: Light) { }

  execute(): void {
    this.light.turnOn()
  }
}

class LightOffCommand implements Command {
  constructor(private light: Light) { }

  execute(): void {
    this.light.turnOff()
  }
}

class FanOnCommand implements Command {
  constructor(private fan: Fan) { }

  execute(): void {
    this.fan.turnOn()
  }
}

class FanOffCommand implements Command {
  constructor(private fan: Fan) { }

  execute(): void {
    this.fan.turnOff()
  }
}

class RemoteControl {
  private commands: Record<string, Command> = {}

  setCommand(button: string, command: Command): void {
    this.commands[button] = command
  }

  pressButton(button: string): void {
    if (this.commands[button]) {
      this.commands[button].execute()
      return
    }

    console.log('%cNo command assigned to this button', COLORS.red)
  }
}

function main() {
  const remote = new RemoteControl()

  const light = new Light()
  const fan = new Fan()

  const lightOnCommand = new LightOnCommand(light)
  const lightOffCommand = new LightOffCommand(light)

  const fanOnCommand = new FanOnCommand(fan)
  const fanOffCommand = new FanOffCommand(fan)

  remote.setCommand('A', lightOnCommand)
  remote.setCommand('B', lightOffCommand)

  remote.setCommand('C', fanOnCommand)
  remote.setCommand('D', fanOffCommand)

  let continueProgram = true

  do {
    console.clear()
    const pressedButton =
      prompt(
        `Press a button:
    A: Turn On Light
    B: Turn Off Light
    C: Turn On Fan
    D: Turn Off Fan

    Button:`
      )?.toUpperCase() ?? ''

    console.log(`%cYou pressed: ${pressedButton}`, COLORS.cyan)

    if (pressedButton) {
      remote.pressButton(pressedButton)
    }

    const continueProgramResponse = prompt(
      'Do you want to press another button? (y/n):'
    )?.toLowerCase()

    continueProgram = continueProgramResponse === 'y'
  } while (continueProgram)
}

main()
