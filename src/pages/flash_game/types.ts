export type Question = {
  lyrics: string
  answer: string
  genre: string
}

export type Settings = {
  isArrowShowAnswer: boolean
}

export type GameState = {
  lyrics: string
  answer: string
  isArrowShowAnswer: boolean
  title: string
  genre: string
}