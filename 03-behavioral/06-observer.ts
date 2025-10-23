/**
 * ! Observer Pattern
 * The Observer pattern is a behavioral design pattern that establishes
 * a one-to-many relationship between an object, called subject,
 * and other objects, called observers, which are notified
 * and automatically updated by the subject
 * when changes occur in its state.
 *
 * * It's useful when we need several objects to be
 * * aware of changes
 *
 * !Not to be confused with RXJS Observables
 *
 * https://refactoring.guru/design-patterns/observer
 */

import { COLORS } from '../helpers/colors.ts'

interface Observer {
  notify(videoTitle: string): void
}

class YoutubeChannel {
  private subscribers: Observer[] = []
  private name: string

  constructor(name: string) {
    this.name = name
  }

  subscribe(observer: Observer): void {
    this.subscribers.push(observer)

    console.log(
      `\nNew subscriber to %c${this.name} %cchannel.`,
      COLORS.green,
      COLORS.white
    )
  }

  unsubscribe(observer: Observer): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== observer)

    console.log(
      `\nA subscriber unsubscribed from %c${this.name} %cchannel.`,
      COLORS.red,
      COLORS.white
    )
  }

  uploadVideo(videoTitle: string): void {
    console.log(
      `\n%c${this.name} %cuploaded a new video: %c${videoTitle}`,
      COLORS.green,
      COLORS.white,
      COLORS.yellow
    )

    for (const subscriber of this.subscribers) {
      subscriber.notify(videoTitle)
    }
  }
}

class Subscribers implements Observer {
  private name: string

  constructor(name: string) {
    this.name = name
  }

  notify(videoTitle: string): void {
    console.log(
      `%c${this.name} %chas been notified of a new video uploaded: %c${videoTitle}`,
      COLORS.green,
      COLORS.white,
      COLORS.yellow
    )
  }
}

function main() {
  const channel = new YoutubeChannel('Tech Academy')

  const jhon = new Subscribers('Jhon Doe')
  const jane = new Subscribers('Jane Smith')
  const bob = new Subscribers('Bob Johnson')

  channel.subscribe(jhon)
  channel.subscribe(jane)

  channel.uploadVideo('Design Patterns in TypeScript - Observer Pattern')

  channel.subscribe(bob)

  channel.uploadVideo('Understanding SOLID Principles')

  channel.unsubscribe(jane)

  channel.uploadVideo('JavaScript ES2024 Features Overview')
}

main()
