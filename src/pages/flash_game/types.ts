export type Question = {
  number: string
  lyrics: string
  answer: string
  genre: string
}

export type FlashGameResponse = {
  settings: FetchSettings
  questions: Question[]
}

export type FetchSettings = {
  isArrowShowAnswer: boolean
  speedList: string
}

export type Settings = {
  isArrowShowAnswer: boolean
  speedList: SpeedList
}

export type SpeedList = {
  label: string
  speed: number
}[]