"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countFlush = exports.deck = exports.cardSuites = exports.cardRanks = void 0;
const lodash_1 = __importDefault(require("lodash"));
exports.cardRanks = lodash_1.default.range(1, 14);
exports.cardSuites = ['H', 'D', 'S', 'C'];
exports.deck = [];
exports.cardRanks.forEach(cR => {
    exports.cardSuites.forEach(cS => {
        exports.deck.push({ rank: cR, suite: cS });
    });
});
const count15 = (cards, starter) => {
    const cardArray = lodash_1.default.concat(cards, starter);
    let fifteenCount = 0;
    const count15Helper = (index, subtotal) => {
        for (let i = index; i < cardArray.length; i += 1) {
            let sub = subtotal + (cardArray[i].rank <= 10 ? cardArray[i].rank : 10);
            if (sub === 15) {
                fifteenCount += 2;
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            else if (sub < 15)
                count15Helper(i + 1, sub);
        }
    };
    count15Helper(0, 0);
    return fifteenCount;
};
const countFlush = (cards, starter) => {
    if (lodash_1.default.uniqBy(cards, 'suite').length === 1) {
        const points = cards[0].suite === starter.suite ? 5 : 4;
        return points;
    }
    return 0;
};
exports.countFlush = countFlush;
const countPairs = (cards, starter) => {
    const cardArray = lodash_1.default.concat(cards, starter);
    cardArray.sort((a, b) => a.rank - b.rank);
    let pairs = 0;
    for (let i = 0; i < cardArray.length - 1; i += 1) {
        for (let j = i + 1; j < cardArray.length - 1; j += 1) {
            if (cardArray[i].rank !== cardArray[j].rank)
                break;
            pairs += 1;
        }
    }
    const points = pairs * 2;
    return points;
};
const countRuns = (cards, starter) => {
    const cardArray = lodash_1.default.concat(cards, starter);
    const uniqueRanks = lodash_1.default.uniqBy(cardArray, 'rank').map(m => m.rank).sort((a, b) => a - b);
    const rankByCount = Object.fromEntries(uniqueRanks.map(uR => [uR, 0]));
    cardArray.forEach(cA => rankByCount[cA.rank] += 1);
    let startIndex = 0, longestStreak = 1, currentStreak = 1, numberOfRuns = 0;
    for (let i = 0; i < uniqueRanks.length; i += 1) {
        currentStreak = 1;
        for (let j = i + 1; j < uniqueRanks.length; j += 1) {
            if (uniqueRanks[j] === uniqueRanks[j - 1] + 1) {
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
const countNibs = (cards, starter) => {
    const points = (lodash_1.default.findIndex(cards, c => c.suite === starter.suite && c.rank === 11) >= 0) ? 1 : 0;
    return points;
};
const countAll = (cards, starter) => {
    const points15 = count15(cards, starter);
    const pointsPairs = countPairs(cards, starter);
    const pointsRun = countRuns(cards, starter);
    const pointsNibs = countNibs(cards, starter);
    const pointsFlush = exports.countFlush(cards, starter);
    const points = points15 + pointsPairs + pointsRun + pointsNibs + pointsFlush;
    return points;
};
const createSubGroups = (dealtHand, subGroupSize) => {
    const subGroupArray = [];
    const subGroupHelper = (indicesArray, lengthToAdd, startIndex) => {
        console.log(indicesArray, lengthToAdd, startIndex);
        if (lengthToAdd === 0) {
            const hand = [];
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
const createRemainingDeck = (dealtHand, deck) => {
    return lodash_1.default.differenceWith(deck, dealtHand, lodash_1.default.isEqual);
};
const calculateMean = (numbers) => {
    return numbers.reduce((acc, curr) => acc + curr) / numbers.length;
};
const calculateMedianSorted = (numbers) => {
    if (numbers.length % 2 === 1) {
        return numbers[Math.floor(numbers.length / 2)];
    }
    return (numbers[numbers.length / 2] + numbers[Math.floor(numbers.length / 2 - 1)]) / 2;
};
const calculateIQR = (numbers) => {
    numbers.sort((a, b) => a - b);
    if (numbers.length % 2 === 1) {
        return [
            calculateMedianSorted(lodash_1.default.slice(numbers, 0, Math.floor(numbers.length / 2))),
            calculateMedianSorted(numbers),
            calculateMedianSorted(lodash_1.default.slice(numbers, numbers.length / 2 + 1))
        ];
    }
    return [
        calculateMedianSorted(lodash_1.default.slice(numbers, 0, Math.floor(numbers.length / 2))),
        calculateMedianSorted(numbers),
        calculateMedianSorted(lodash_1.default.slice(numbers, numbers.length / 2))
    ];
};
const calculateMaximumPoints = (numbers) => {
    numbers.sort((a, b) => a - b);
    return numbers[numbers.length - 1];
};
const createPointTree = (dealtHand, deck) => {
    const remainingDeck = createRemainingDeck(dealtHand, deck);
    const allHands = createSubGroups(dealtHand, 4);
    const pointBreakdown = [];
    allHands.forEach(aH => {
        let pointPossibilities = [];
        remainingDeck.forEach(rD => {
            const roundPoints = countAll(aH, rD);
            pointPossibilities.push(roundPoints);
        });
        const IQR = calculateIQR(pointPossibilities);
        pointBreakdown.push({
            cards: lodash_1.default.cloneDeep(aH),
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
    countFlush: exports.countFlush,
    countPairs,
    countRuns,
    countNibs,
    countAll,
    createPointTree,
};
exports.default = defaultExport;
