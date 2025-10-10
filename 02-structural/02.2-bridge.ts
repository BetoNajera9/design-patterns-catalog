/**
 * ! Bridge Pattern
 * This pattern allows us to decouple an abstraction from its implementation,
 * so that both can vary independently.
 *
 * * It's useful when you have multiple implementations of an abstraction
 * * It can be used to separate business logic from presentation logic
 * * It can be used to separate user interface logic as well.
 *
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
  constructor(protected channel: NotificationChannel) { }

  abstract setChannel(channel: NotificationChannel): void
  abstract notify(message: string): void
}

// 4. Concrete Notification Classes

class AlertNotification extends Notification {
  override notify(message: string): void {
    console.log('\n%cAlert Notification:', COLORS.red)
    this.channel.send(message)
  }

  override setChannel(channel: NotificationChannel): void {
    this.channel = channel
  }
}

class ReminderNotification extends Notification {
  override notify(message: string): void {
    console.log('\n%cReminder Notification:', COLORS.blue)
    this.channel.send(message)
  }

  override setChannel(channel: NotificationChannel): void {
    this.channel = channel
  }
}

class PushNotification extends Notification {
  override notify(message: string): void {
    console.log('\n%cPush Notification:', COLORS.green)
    this.channel.send(message)
  }

  override setChannel(channel: NotificationChannel): void {
    this.channel = channel
  }
}

// 5. Client Code to Test the Bridge

// You should implement everything needed in the classes above
function main() {
  // Create an alert notification using the email channel
  const alert = new AlertNotification(new EmailChannel())

  alert.notify('Security alert: Unauthorized access has been detected.')

  // Change the channel to SMS and send the alert again
  alert.setChannel(new SMSChannel())
  alert.notify('Security alert: Unauthorized access has been detected.')

  // Create a reminder notification using the SMS channel
  const reminder = new ReminderNotification(new SMSChannel())
  reminder.notify('Reminder: Your doctor appointment is tomorrow at 10:00 a.m.')

  // Change the reminder channel to email and send again
  reminder.setChannel(new PushNotificationChannel())
  reminder.notify('Reminder: Your doctor appointment is tomorrow at 10:00 a.m.')

  // Create a push notification using the push notification channel
  const push = new PushNotification(new PushNotificationChannel())
  push.notify('New update available. Click to install.')
}

main()
