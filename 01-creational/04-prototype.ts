/**
 * ! Prototype Pattern:

 * It is a creational design pattern that allows us to copy existing objects without making
 * the code depend on their classes.
 *
 * * It is useful when we want to duplicate the content,
 * * the title and author of a document, for example, or any complex object.
 *
 * https://refactoring.guru/design-patterns/prototype
 */

import { COLORS } from '../helpers/colors.ts'

class Document {
  public title: string
  private content: string
  public author: string

  constructor(title: string, content: string, author: string) {
    this.title = title
    this.content = content
    this.author = author
  }

  clone(): Document {
    return new Document(this.title, this.content, this.author)
  }

  displayInfo(): void {
    console.log(
      `
      %cTitle: ${this.title}
      %cContent: ${this.content}
      %cAuthor: ${this.author}
    `,
      COLORS.violet,
      COLORS.blue,
      COLORS.green
    )
  }
}

function main() {
  const document01 = new Document(
    'Design Patterns',
    'A design pattern is a general repeatable solution to a commonly occurring problem in software design.',
    'Beto Najera'
  )

  console.log({ document01 })
  document01.displayInfo()

  const document02 = document01.clone()
  document02.title = 'Clean Code'

  console.log({ document02 })
  document02.displayInfo()
}

main()
