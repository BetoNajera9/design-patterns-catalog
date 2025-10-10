/**
 * ! Bridge Pattern
 * This pattern allows us to decouple an abstraction from its implementation,
 * so that both can vary independently.
 *
 * * It's useful when you have multiple implementations of an abstraction
 * * It can be used to separate business logic from presentation logic
 * * It can be used to separate user interface logic as well.
 *
 * https://refactoring.guru/design-patterns/bridge
 */

import { COLORS } from '../helpers/colors.ts'

// 1. NotificationChannel Interface
// Defines the `send` method, which each communication channel will implement.
interface NotificationChannel {
  send(message: string): void
}

// 2. Communication Channel Implementations

class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Sending email: ${message}`)
  }
}

class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Sending SMS: ${message}`)
  }
}

class PushNotificationChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Sending Push: ${message}`)
  }
}

// 3. Abstract Notification Class
// Defines the `channel` property and the `notify` method

abstract class Notification {
  constructor(protected channels: NotificationChannel[]) { }

  abstract addChannel(channel: NotificationChannel): void
  abstract notify(message: string): void
}

class AlerrtNotification extends Notification {
  override notify(message: string): void {
    console.log('\n%cAlert Notification:', COLORS.red)
    this.channels.forEach((channel) => channel.send(message))
  }

  override addChannel(channel: NotificationChannel): void {
    this.channels.push(channel)
  }
}

function main() {
  const channels = [new EmailChannel(), new SMSChannel()]

  const alert = new AlerrtNotification(channels)

  alert.notify('This is an alert notification!')

  alert.addChannel(new PushNotificationChannel())
  alert.notify('This is another alert notification!')
}

main()
