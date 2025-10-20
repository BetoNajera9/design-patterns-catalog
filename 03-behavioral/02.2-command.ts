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
 */

import { COLORS } from '../helpers/colors.ts'

// 1. Command Interface
interface Command {
  execute(): void
}

// 2. Receiver Class - TextEditor

class TextEditor {
  private text: string = ''
  private clipboard: string = ''
  private history: string[] = []

  // Add text to the editor
  type(text: string): void {
    this.history.push(this.text) // Save state before changing it
    this.text += text
  }

  // Copy current text
  copy(): void {
    this.clipboard = this.text
    console.log(
      `Text copied to clipboard: \n%c"${this.clipboard}"`,
      COLORS.blue
    )
  }

  // Paste text from clipboard
  paste(): void {
    this.history.push(this.text) // Save state before pasting
    this.text += this.clipboard
    console.log(`Text after pasting: \n%c"${this.text}"`, COLORS.blue)
  }

  // Undo last action
  undo(): void {
    if (this.history.length > 0) {
      this.text = this.history.pop()!
      console.log(`Text after undo: \n%c"${this.text}"`, COLORS.blue)
      return
    }

    console.log('Nothing to undo.')
  }

  // Show current text
  getText(): string {
    return this.text
  }
}

// 3. Concrete Command Classes
class CopyCommand implements Command {
  constructor(private editor: TextEditor) { }

  execute(): void {
    this.editor.copy()
  }
}

class PasteCommand implements Command {
  constructor(private editor: TextEditor) { }

  execute(): void {
    this.editor.paste()
  }
}

class UndoCommand implements Command {
  constructor(private editor: TextEditor) { }

  execute(): void {
    this.editor.undo()
  }
}

// 4. Client Class - Toolbar

class Toolbar {
  private commands: Record<string, Command> = {}

  setCommand(button: string, command: Command): void {
    this.commands[button] = command
  }

  clickButton(button: string): void {
    if (this.commands[button]) {
      this.commands[button].execute()
      return
    }

    console.log(`%cNo command assigned to button: ${button}`, COLORS.red)
  }
}

// 5. Client Code to test the Command pattern
// !None of the main code should be modified
function main() {
  const editor = new TextEditor()
  const toolbar = new Toolbar()

  // Create commands for the editor
  const copyCommand = new CopyCommand(editor)
  const pasteCommand = new PasteCommand(editor)
  const undoCommand = new UndoCommand(editor)

  // Assign commands to toolbar buttons
  toolbar.setCommand('copy', copyCommand)
  toolbar.setCommand('paste', pasteCommand)
  toolbar.setCommand('undo', undoCommand)

  // Text editing simulation
  editor.type('H')
  editor.type('e')
  editor.type('l')
  editor.type('l')
  editor.type('o')
  editor.type(' ')
  editor.type('W')
  editor.type('o')
  editor.type('r')
  editor.type('l')
  editor.type('d')
  editor.type('!')
  console.log(`Current text: %c"${editor.getText()}"`, COLORS.green)

  // Use the toolbar
  console.log('\nCopying text:')
  toolbar.clickButton('copy')

  console.log('\nPasting text:')
  toolbar.clickButton('paste')

  console.log('\nUndoing last action:')
  toolbar.clickButton('undo')

  console.log('\nUndoing again:')
  toolbar.clickButton('undo')

  console.log(`\nFinal text: "${editor.getText()}"`)
}

main()
