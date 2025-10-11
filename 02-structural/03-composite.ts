/**
 * ! Composite Pattern
 * It's a structural design pattern that allows composing objects
 * into tree structures to represent hierarchies.
 *
 * The pattern allows clients to treat individual objects and their
 * compositions uniformly.
 *
 * * It's useful when you need to treat individual objects
 * * and their compositions uniformly, and the structure
 * * of objects forms a tree hierarchy.
 *
 * https://refactoring.guru/design-patterns/composite
 *
 */

import { COLORS } from '../helpers/colors.ts'

interface FileSystemComponent {
  showDetails(indent?: string): void
}

class File implements FileSystemComponent {
  private name: string

  constructor(name: string) {
    this.name = name
  }

  showDetails(indent: string = ''): void {
    console.log(`${indent}- %cFile: ${this.name}`, COLORS.yellow)
  }
}

class Folder implements FileSystemComponent {
  private name: string
  private contents: FileSystemComponent[] = []

  constructor(name: string) {
    this.name = name
  }

  add(component: FileSystemComponent): void {
    this.contents.push(component)
  }

  showDetails(indent: string = ''): void {
    console.log(`${indent}+ %cFolder: ${this.name}`, COLORS.red)
    this.contents.forEach((component) => {
      component.showDetails(indent + '  ')
    })
  }
}

function main() {
  const file01 = new File('file1.txt')
  const file02 = new File('file2.txt')
  const file03 = new File('file3.txt')
  const file04 = new File('file4.txt')

  const folder05 = new Folder('folder05')
  const folder01 = new Folder('folder01')
  folder01.add(file01)
  folder01.add(file02)

  const folder02 = new Folder('folder02')
  folder02.add(file03)

  const folder03 = new Folder('folder03')
  folder03.add(file04)
  folder03.add(folder05)

  folder02.add(folder03)

  const rootFolder = new Folder('root')
  rootFolder.add(folder01)
  rootFolder.add(folder02)

  rootFolder.showDetails()
}

main()
