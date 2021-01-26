export type CardType = {
  rank: number,
  suite: string,
};

export type EntryType = {
  cards: Array<CardType>,
  mean: number,
  max: number,
  firstQuartile: number,
  secondQuartile: number,
  thirdQuartile: number,
};

export const rankObject = [
  'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'
];

type SuiteMap = {
  [key:  string]: string | undefined
}
export const suiteObject: SuiteMap = {
  S: '\u2660',
  H: '\u2665',
  D: '\u2666',
  C: '\u2663',
};
