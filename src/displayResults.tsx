import React from 'react';

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

type DisplayResultsProps = {
  entries: Array<EntryType>,
};

const rankObject = [
  'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'
];

type SuiteMap = {
  [key:  string]: string | undefined
}
const suiteObject: SuiteMap = {
  S: '\u2660',
  H: '\u2665',
  D: '\u2666',
  C: '\u2663',
};

const DisplayResults: React.FC<DisplayResultsProps> = ({entries}) => {
  entries.sort((a, b) => b.mean - a.mean);
  return (
    <table>
      <caption>Hand Decision Breakdown</caption>
      <thead>
        <tr>
          <th>1st Card</th>
          <th>2nd Card</th>
          <th>3rd Card</th>
          <th>4th Card</th>
          <th>Avg Points</th>
          <th>Max Points</th>
          <th>First Quartile</th>
          <th>Median</th>
          <th>Third Quartile</th>
        </tr>
      </thead>
      <tbody>
      {
        entries.map((e: EntryType) => {
          return (
            <tr className="EntryRow">
              {
                e.cards.map((c: CardType) => {
                  return (
                    <td className="CardBox">{`${rankObject[c.rank - 1]}`}<span className={c.suite === 'H' || c.suite === 'D' ? 'RedSuit' : 'BlackSuit'}>{`${suiteObject[c.suite]}`}</span></td>
                  );
                })
              }
              <td className="PointsBox">{e.mean.toFixed(2)}</td>
              <td>{e.max}</td>
              <td>{e.firstQuartile}</td>
              <td>{e.secondQuartile}</td>
              <td>{e.thirdQuartile}</td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  );
};

export default DisplayResults; 