import React from 'react';
import { CardType } from './displayResults';
import CardHolder from './cardHolder';
const HandDisplay: React.FC<{cards: Array<CardType>, handSize: number}> = ({cards, handSize}) => {
  const populatedCards = cards.forEach(c => <CardHolder card={c} />);
  const emptyCards = [];
  const allCards = _.concat(populatedCards, emptyCards);
  for(let i = 0; i < handSize - cards.length; i += 1) {
    <CardHolder card={undefined} />
  }
  
  return (
    <div className='cardHandContainer'>
      {allCards}
    </div>
  )
}