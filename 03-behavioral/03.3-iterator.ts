/**
 * ! Iterator Pattern
 * This pattern allows traversing the elements of a collection without exposing
 * the internal structure of the collection.
 *
 * * It's useful when you need to traverse a collection of elements regardless of
 * * how the elements are stored.
 *
 * https://refactoring.guru/design-patterns/iterator
 */

// Class representing a Card from the deck
class Card {
  name: string
  value: number

  constructor(name: string, value: number) {
    this.name = name
    this.value = value
  }
}

// Class representing the Card collection
class CardCollection {
  private cards: Card[] = []

  addCard(card: Card): void {
    this.cards.push(card)
  }

  *[Symbol.iterator](): IterableIterator<Card> {
    yield* this.cards
  }

  *getCards(): IterableIterator<Card> {
    for (const card of this.cards) {
      yield card
    }
  }
}

// Client Code to test the iterator

function main(): void {
  const deck = new CardCollection()

  // Add some cards to the collection
  deck.addCard(new Card('Ace of Hearts', 1))
  deck.addCard(new Card('King of Hearts', 13))
  deck.addCard(new Card('Queen of Hearts', 12))
  deck.addCard(new Card('Jack of Hearts', 11))

  // Iterate through the collection in order using for...of
  console.log('Iterating through the card collection:')
  for (const card of deck) {
    console.log(`Card: ${card.name}, Value: ${card.value}`)
  }
}

main()
