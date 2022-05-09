// all the api models used in this app
export interface ApiMessage {
  type: ApiMessageType
  data: any //loose but models are!
}

export enum ApiMessageType {
  Init = 'INIT',
  LiveEventsData = 'LIVE_EVENTS_DATA',
  MarketData = 'MARKET_DATA',
  OutcomeData = 'OUTCOME_DATA'
}

export interface FootballMatch {
  boostCount: number,
  classId: number,
  className: string,
  competitors: Competitor[],
  displayOrder: number,
  eventId: number,
  linkedEventId: number,
  linkedEventTypeId: number,
  linkedEventTypeName: string,
  name: string,
  scores: Scores,
  sort: string,
  startTime: string,
  status: Status,
  superBoostCount: number,
  typeId: number,
  typeName: string,
  markets?: number[] //not always present
}

interface Competitor {
  name: string,
  position: string
}

interface Scores {
  home: number,
  away: number
}

interface Status {
  active: boolean,
  cashoutable: boolean,
  displayable: boolean,
  finished: boolean,
  live: boolean,
  requestabet: boolean,
  resulted: boolean,
  started: boolean,
  suspended: boolean
}

export interface PrimaryMarkets {
  displayOrder: number,
  eventId: number,
  liabilities: { livePriceLimit: number },
  marketId: number,
  name: string,
  outcomes: number[],
  spAvail: boolean,
  status: Status
  type: string
}

export interface OutcomeData {
  displayOrder: number,
  eventId: number,
  marketId: number,
  name: string,
  outcomeId: number,
  price: { den: number, num: number, decimal: number },
  result: { place: number, result: string, favourite: boolean },
  status: Status
}
