/**
 * ! Proxy Pattern
 * This pattern is used to control access to an object, that is,
 * an object is created that acts as an intermediary between the client and the real object.
 *
 * * It's useful when we need to control access to an object,
 * * for example, to verify if the client has permission
 * * to access certain methods or properties.
 *
 * https://refactoring.guru/design-patterns/proxy
 *
 */

import { COLORS } from '../helpers/colors.ts'

// 1. Document Interface
interface Document {
  displayContent(user: User): void
}

// 2. Class representing the Confidential Document - ConfidentialDocument
class ConfidentialDocument implements Document {
  private content: string

  constructor(content: string) {
    this.content = content
  }

  displayContent(): void {
    console.log(`Document content: \n%c${this.content}\n`, COLORS.blue)
  }
}

// 3. Proxy Class - DocumentProxy
class DocumentProxy implements Document {
  constructor(
    private document: Document,
    private mustHaveRole: string[] = []
  ) { }

  displayContent(user: User): void {
    if (this.mustHaveRole.includes(user.getRole())) {
      this.document.displayContent(user)
      return
    }

    console.log(
      `%cAccess denied. ${user.getName()}, you don't have sufficient permissions to view this document.`,
      COLORS.red
    )
  }
}

// 4. Class representing the User - User
class User {
  private name: string
  private role: 'admin' | 'user'

  constructor(name: string, role: 'admin' | 'user') {
    this.name = name
    this.role = role
  }

  getName(): string {
    return this.name
  }

  getRole(): string {
    return this.role
  }
}

// 5. Client Code to test the Proxy

function main() {
  const confidentialDoc = new ConfidentialDocument(
    'This is the confidential content of the document.'
  )
  const proxy = new DocumentProxy(confidentialDoc, ['admin'])

  const user1 = new User('John', 'user')
  const user2 = new User('Ana', 'admin')

  console.log('Access attempt by user 1:')
  proxy.displayContent(user1) // Should deny access

  console.log('\nAccess attempt by user 2:')
  proxy.displayContent(user2) // Should allow access
}

main()
