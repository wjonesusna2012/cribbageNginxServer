import { CardType, EntryType } from './typeDefinitions';
import _ from 'lodash';

export const cardRanks = _.range(1, 14);
export const cardSuites = ['H', 'D', 'S', 'C'];

export const deck: Array<CardType> = [];
cardRanks.forEach(cR => {
  cardSuites.forEach(cS => {
    deck.push({rank: cR, suite: cS});
  });
});

const count15 = (cards: Array<CardType>, starter: CardType) => {
  const cardArray = _.concat(cards, starter);
  let fifteenCount = 0;
  const count15Helper = (index: number, subtotal: number) => {
    for (let i = index; i < cardArray.length; i += 1) {
      let sub = subtotal + (cardArray[i].rank <= 10 ? cardArray[i].rank : 10);
      if (sub === 15) {
        fifteenCount += 2;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      else if (sub < 15) count15Helper(i+1, sub);
    }
  };
  count15Helper(0, 0);
  return fifteenCount;
};

 export const countFlush = (cards: Array<CardType>, starter: CardType) => {
  if(_.uniqBy(cards, 'suite').length === 1) {
    const points = cards[0].suite === starter.suite ? 5 : 4;
    return points;
  }
  return 0;
}

const countPairs = (cards: Array<CardType>, starter: CardType) => {
  const cardArray = _.concat(cards, starter);
  cardArray.sort((a, b) => a.rank - b.rank);
  let pairs = 0;
  for(let i = 0; i < cardArray.length - 1; i += 1) {
    for(let j = i + 1; j < cardArray.length - 1; j += 1) {
      if(cardArray[i].rank !== cardArray[j].rank) break;
      pairs += 1;
    }
  }
  const points = pairs * 2;
  return points;
};

const countRuns = (cards: Array<CardType>, starter: CardType) => {
  const cardArray = _.concat(cards, starter);
  const uniqueRanks = _.uniqBy(cardArray, 'rank').map(m => m.rank).sort((a, b) => a - b);
  const rankByCount = Object.fromEntries(uniqueRanks.map(uR => [uR, 0]));
  cardArray.forEach(cA => rankByCount[cA.rank] += 1);
  let startIndex = 0, longestStreak = 1, currentStreak = 1, numberOfRuns = 0;
  for(let i = 0; i < uniqueRanks.length; i += 1) {
    currentStreak = 1;
    for(let j = i+1; j < uniqueRanks.length; j += 1) {
      if(uniqueRanks[j] === uniqueRanks[j-1] + 1) {
        currentStreak += 1;
        continue;
      }
      break;
    }
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
      currentStreak = 1;
      startIndex = i;
    }
  }
  if (longestStreak > 2) {
    numberOfRuns = 1;
    for (let k = 0; k < longestStreak; k++) {
      numberOfRuns *= rankByCount[uniqueRanks[startIndex + k]]; 
    }
    const points = numberOfRuns * longestStreak;
    return points;
  }
  return 0;
};

const countNibs = (cards: Array<CardType>, starter: CardType) => {
  const points = (_.findIndex(cards, c => c.suite === starter.suite && c.rank === 11) >= 0) ? 1 : 0;
  return points;
};

const countAll = (cards: Array<CardType>, starter: CardType) => {
  const points15 = count15(cards, starter); 
  const pointsPairs = countPairs(cards, starter);
  const pointsRun = countRuns(cards, starter);
  const pointsNibs = countNibs(cards, starter);
  const pointsFlush = countFlush(cards, starter);
  const points = points15 + pointsPairs + pointsRun + pointsNibs + pointsFlush;
  return points;
}

const createSubGroups = (dealtHand: Array<CardType>, subGroupSize: number) => {
  const subGroupArray: Array<Array<CardType>> = [];
  const subGroupHelper = (indicesArray: Array<number>, lengthToAdd: number, startIndex: number) => {
    if (lengthToAdd === 0) {
      const hand: Array<CardType> = [];
      indicesArray.forEach(iA => {
        hand.push(dealtHand[iA]);
      });
      subGroupArray.push(hand);
      return;
    }
    for (let i = startIndex; i <= dealtHand.length - lengthToAdd; i += 1) {
      indicesArray[subGroupSize - lengthToAdd] = i;
      subGroupHelper(indicesArray, lengthToAdd - 1, i + 1);
    }
  };
  subGroupHelper(Array.apply(null, Array(subGroupSize)).map(() => 0), subGroupSize, 0);
  return subGroupArray;
};

const createRemainingDeck = (dealtHand: Array<CardType>, deck: Array<CardType>) => {
  return _.differenceWith(deck, dealtHand, _.isEqual);
};

const calculateMean = (numbers: Array<number>) => {
  return numbers.reduce((acc, curr) => acc + curr) / numbers.length;
};

const calculateMedianSorted = (numbers: Array<number>) => {
  if (numbers.length % 2 === 1) {
    return numbers[Math.floor(numbers.length/2)];
  }
  return (numbers[numbers.length/2] + numbers[Math.floor(numbers.length/2-1)]) / 2
};

const calculateIQR = (numbers: Array<number>) => {
  numbers.sort((a, b) => a - b);
  if (numbers.length % 2 === 1) {
    return [
      calculateMedianSorted(_.slice(numbers, 0, Math.floor(numbers.length / 2))), 
      calculateMedianSorted(numbers),
      calculateMedianSorted(_.slice(numbers, numbers.length/2 + 1))
    ];
  }
  return [
    calculateMedianSorted(_.slice(numbers, 0, Math.floor(numbers.length / 2 ))), 
    calculateMedianSorted(numbers),
    calculateMedianSorted(_.slice(numbers, numbers.length/2 ))
  ];
};

const calculateMaximumPoints = (numbers: Array<number>) => {
  numbers.sort((a, b) => a - b);
  return numbers[numbers.length - 1];
}

const createPointTree = (dealtHand: Array<CardType>, deck: Array<CardType>) => {
  const remainingDeck = createRemainingDeck(dealtHand, deck);
  console.log('CHANGE');
  const allHands = createSubGroups(dealtHand, 4);
  const pointBreakdown: Array<EntryType> = [];
  allHands.forEach(aH => {
    let pointPossibilities: Array<number> = [];
    remainingDeck.forEach(rD => {
      const roundPoints = countAll(aH, rD);
      pointPossibilities.push(roundPoints);
    });
    const IQR = calculateIQR(pointPossibilities);
    pointBreakdown.push({
      cards: _.cloneDeep(aH), 
      mean: calculateMean(pointPossibilities), 
      max: calculateMaximumPoints(pointPossibilities), 
      firstQuartile: IQR[0], 
      secondQuartile: IQR[1], 
      thirdQuartile: IQR[2]
    });
  });
  return pointBreakdown;
};

const defaultExport = {
  count15,
  countFlush,
  countPairs,
  countRuns,
  countNibs,
  countAll,
  createPointTree,
};

export default defaultExport;