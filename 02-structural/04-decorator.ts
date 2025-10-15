/**
import { COLORS } from '../helpers/colors';
 * ! Decorator Pattern
 * It's a structural design pattern that allows adding
 * functionalities to objects by placing these objects within
 * special wrapper objects that contain these functionalities.
 *
 * Not to be confused with TypeScript decorators which are annotations.
 *
 * * It's useful when you need to add functionalities to objects
 *  * dynamically and flexibly.
 *
 * https://refactoring.guru/design-patterns/decorator
 */

import { COLORS } from '../helpers/colors.ts'

interface Notification {
  send(message: string): void
}

class BasicNotification implements Notification {
  send(message: string): void {
    console.log(
      `%cSending basic notification: %c${message}`,
      COLORS.blue,
      COLORS.white
    )
  }
}

// Decorator class
abstract class NotificationDecorator implements Notification {
  protected notification: Notification

  constructor(notification: Notification) {
    this.notification = notification
  }

  send(message: string): void {
    this.notification.send(message)
  }
}

class EmailDecorator extends NotificationDecorator {
  private sendEmail(message: string): void {
    console.log(
      `%cSending email notification: %c${message}`,
      COLORS.green,
      COLORS.white
    )
  }

  override send(message: string): void {
    super.send(message)
    this.sendEmail(message)
  }
}

class SMSDecorator extends NotificationDecorator {
  private sendSMS(message: string): void {
    console.log(
      `%cSending SMS notification: %c${message}`,
      COLORS.yellow,
      COLORS.white
    )
  }

  override send(message: string): void {
    super.send(message)
    this.sendSMS(message)
  }
}

function main() {
  let notification: Notification = new BasicNotification()
  notification = new EmailDecorator(notification)
  notification = new SMSDecorator(notification)

  notification.send('Hello, User!')
}

main()
