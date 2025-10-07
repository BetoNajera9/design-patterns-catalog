/**
 * ! Immutability with copy
 * Although immutability is a good practice, it is not always possible.
 * In these cases, you can make a copy of the object and modify the copy.
 *
 *  * It is useful for maintaining a history of states in interactive applications.
 *
 */

import { COLORS } from '../helpers/colors.ts'

class CodeEditorState {
  readonly content: string
  readonly cursorPosition: number
  readonly unsaveChanges: boolean

  constructor(content: string, cursorPosition: number, unsaveChanges: boolean) {
    this.content = content
    this.cursorPosition = cursorPosition
    this.unsaveChanges = unsaveChanges
  }

  copyWith({
    cursorPosition,
    unsaveChanges,
    content,
  }: Partial<CodeEditorState>): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unsaveChanges ?? this.unsaveChanges
    )
  }

  displayState() {
    console.log(
      `
      %c----- Editor State -----
      Content: ${this.content}
      Cursor Position: ${this.cursorPosition}
      Unsaved Changes: ${this.unsaveChanges}
    `,
      COLORS.green
    )
  }
}

class CodeEditorHistory {
  private history: CodeEditorState[] = []
  private currentStateIndex: number = -1

  save(state: CodeEditorState) {
    if (this.currentStateIndex < this.history.length - 1)
      this.history = this.history.slice(0, this.currentStateIndex + 1)

    this.history.push(state)
    this.currentStateIndex++
  }

  redo(): CodeEditorState | null {
    if (this.currentStateIndex < this.history.length - 1) {
      this.currentStateIndex++
      return this.history[this.currentStateIndex]
    }

    return null
  }

  undo(): CodeEditorState | null {
    if (this.currentStateIndex > 0) {
      this.currentStateIndex--
      return this.history[this.currentStateIndex]
    }

    return null
  }
}

function main() {
  const history = new CodeEditorHistory()
  let editorState = new CodeEditorState(
    'console.log("Hello, world!");',
    2,
    false
  )

  history.save(editorState)

  console.log('%cInitial State:', COLORS.cyan)
  editorState.displayState()

  console.log('%cAfter Edit:', COLORS.cyan)
  editorState = editorState.copyWith({
    content: 'console.log("Hi!");',
    cursorPosition: 3,
    unsaveChanges: true,
  })
  history.save(editorState)
  editorState.displayState()

  console.log('%cAfter move cursor:', COLORS.cyan)
  editorState = editorState.copyWith({
    cursorPosition: 5,
  })
  history.save(editorState)
  editorState.displayState()

  console.log('%cUndo:', COLORS.cyan)
  editorState = history.undo()!
  editorState.displayState()

  console.log('%cRedo:', COLORS.cyan)
  editorState = history.redo()!
  editorState.displayState()
}

main()
