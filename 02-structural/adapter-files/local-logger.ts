import { COLORS } from '../../helpers/colors.ts'

export class LocalLogger {
  constructor(private file: string) { }

  writeLog(msg: string): void {
    console.log(`[${this.file} LOG]: ${msg}`)
  }

  writeError(msg: string): void {
    console.log(`[🚨${this.file} ERROR]: %c${msg}`, COLORS.red)
  }

  writeWarning(msg: string): void {
    console.log(`[⚠️ ${this.file} WARNING]: %c${msg}`, COLORS.yellow)
  }
}
