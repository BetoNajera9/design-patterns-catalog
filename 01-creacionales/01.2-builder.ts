/**
 * ! Builder Pattern:
 * It is a creational design pattern that allows us to construct complex objects
 * step by step.
 *
 * The pattern lets us produce different types and representations
 * of an object using the same construction code.
 *
 * * It is useful when we need to build a complex object with many parts
 * * and we want the construction process to be independent of the parts
 * * that compose it.
 */

import { COLORS } from '../helpers/colors.ts'

//! Task: create a QueryBuilder to build SQL queries
/**
 * It should have the following methods:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- if no field is passed, all are selected with (*)
 * - where(condition: string): QueryBuilder - optional
 * - orderBy(field: string, order: string): QueryBuilder - optional
 * - limit(limit: number): QueryBuilder - optional
 * - execute(): string - returns the SQL query
 *
 ** Usage example:
  const usersQuery = new QueryBuilder("users") // users is the table name
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log('Query: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

//! Solution

class QueryBuilder {
  private table: string
  private fields: string[] = []
  private conditions: string[] = []
  private orderFields: string[] = []
  private limitCount?: number

  constructor(table: string) {
    this.table = table
  }

  select(...fields: string[]) {
    if (this.fields.length > 0) throw new Error('Cannot select twice')

    this.fields = fields.length > 0 ? fields : ['*']

    return this
  }

  where(condition: string): QueryBuilder {
    this.conditions.push(condition)

    return this
  }

  orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryBuilder {
    this.orderFields.push(`${field} ${direction}`)

    return this
  }

  limit(count: number): QueryBuilder {
    if (this.limitCount)
      throw new Error('Limit has already been set')

    this.limitCount = count
    return this
  }

  execute(): string {
    const whereClause =
      this.conditions.length > 0 ? `WHERE ${this.conditions.join(' AND ')}` : ''
    const orderByClause = this.orderFields.length > 0 ? `ORDER BY ${this.orderFields.join(', ')}` : ''
    const limitClause = this.limitCount ? `LIMIT ${this.limitCount}` : ''

    const query = `SELECT ${this.fields.join(', ')} FROM ${this.table
      } ${whereClause} ${orderByClause} ${limitClause}`

    return query
  }
}

function main() {
  const usersQuery = new QueryBuilder('users')
    .select('id', 'name', 'email')
    .where('age > 18')
    .where("country = 'Cri'")
    .orderBy('name', 'ASC')
    .orderBy('email', 'DESC')
    .limit(10)
    .execute()

  console.log(`%cQuery: \n%c${usersQuery}`, COLORS.red, COLORS.pink)
}

main()
