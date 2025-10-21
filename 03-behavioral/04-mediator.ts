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

import { COLORS } from '../helpers/colors.ts'

class ChatRoom {
  private users: User[] = []
  public title: string

  constructor(title: string) {
    this.title = title
  }

  addUser(user: User): void {
    this.users.push(user)
  }

  sendMessage(sender: User, message: string): void {
    const usersToSend = this.users.filter((user) => user !== sender)
    for (const user of usersToSend) {
      user.receiveMessage(sender, message)
    }
  }
}

class User {
  private chatRoom: ChatRoom
  private username: string

  constructor(username: string, chatRoom: ChatRoom) {
    this.username = username
    this.chatRoom = chatRoom

    chatRoom.addUser(this)
  }

  sendMessage(message: string): void {
    console.log(
      `\n%c${this.username} sends: %c${message}`,
      COLORS.blue,
      COLORS.white
    )

    this.chatRoom.sendMessage(this, message)
  }

  receiveMessage(sender: User, message: string): void {
    console.log(
      `%c${this.username} receives of ${sender.username}: %c${message}`,
      COLORS.blue,
      COLORS.white
    )
  }
}

function main() {
  const chatRoom = new ChatRoom('Design Patterns')

  const user = new User('Alice', chatRoom)
  const user2 = new User('Bob', chatRoom)
  const user3 = new User('Charlie', chatRoom)

  user.sendMessage('Hello, everyone!')
  user2.sendMessage('Hi, Alice!, how are you?')
  user3.sendMessage('Hey folks, what are we discussing today?')
}

main()
