import React, { useState } from 'react';
import './App.css';
import DisplayResults, { EntryType } from './displayResults';

const defaultStartState = {
  c1r: '1',
  c1s: 'H',
  c2r: '2',
  c2s: 'S',
  c3r: '3',
  c3s: 'D',
  c4r: '4',
  c4s: 'C',
  c5r: '5',
  c5s: 'H',
  c6r: '6',
  c6s: 'S',
};

const App: React.FC = () => {
  const [formState, setFormState] = useState(defaultStartState);
  const [cardData, setCardData] = useState<Array<EntryType>>([]);
  const changeField = (fieldName: string, value: string) => {
    setFormState({...formState, [fieldName]: value});
  };
  const changeHandler = (element: any) => {
    element.preventDefault();
    changeField(element.target.id, element.target.value);
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const { c1r, c1s, c2r, c2s, c3r, c3s, c4r, c4s, c5r, c5s, c6r, c6s } = formState;
    const hand = [
      { suite: c1s, rank: parseInt(c1r, 10) },
      { suite: c2s, rank: parseInt(c2r, 10) },
      { suite: c3s, rank: parseInt(c3r, 10) },
      { suite: c4s, rank: parseInt(c4r, 10) }, 
      { suite: c5s, rank: parseInt(c5r, 10) }, 
      { suite: c6s, rank: parseInt(c6r, 10) },
    ];
    // const pointBreak: Array<EntryType> = HelperFunctions.createPointTree(hand, deck);
    fetch('http://localhost:22300/', 
      {
        method: 'post',
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify({dealtHand: hand}),
      }
    ).then(r => r.json()).then(res => {
      setCardData(res.data);
    });
    // setCardData(pointBreak);
  }
  return (
    <>
      <div className="App">
        <h1 className="AppHeader">Cribbage Hand Calculator</h1>
        <div className="FormWrapper">
          <form onSubmit={handleSubmit} className="InputForm">
            <div className="CardSelector">
              <label htmlFor="card1rank">Rank 1:</label>
              <select name="card1rank" id="c1r" value={formState.c1r} onChange={changeHandler}>
                <option value="1">A</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">J</option>
                <option value="12">Q</option>
                <option value="13">K</option>
              </select>
              <label htmlFor="card1suite">Suite 1:</label>
              <select name="card1suite" id="c1s" value={formState.c1s} onChange={changeHandler}>
                <option value="H">Hearts</option>
                <option value="S">Spades</option>
                <option value="C">Clubs</option>
                <option value="D">Diamonds</option>
              </select>
            </div>
            <div className="CardSelector">
              <label htmlFor="card2rank">Rank 2:</label>
              <select name="card2rank" id="c2r" value={formState.c2r} onChange={changeHandler}>
                <option value="1">A</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">J</option>
                <option value="12">Q</option>
                <option value="13">K</option>
              </select>
              <label htmlFor="card2suite">Suite 2:</label>
              <select name="card2suite" id="c2s" value={formState.c2s} onChange={changeHandler}>
                <option value="H">Hearts</option>
                <option value="S">Spades</option>
                <option value="C">Clubs</option>
                <option value="D">Diamonds</option>
              </select>
            </div>
            <div className="CardSelector">
              <label htmlFor="card3rank">Rank 3:</label>
              <select name="card3rank" id="c3r" value={formState.c3r} onChange={changeHandler}>
                <option value="1">A</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">J</option>
                <option value="12">Q</option>
                <option value="13">K</option>
              </select>
              <label htmlFor="card3suite">Suite 3:</label>
              <select name="card3suite" id="c3s" value={formState.c3s} onChange={changeHandler}>
                <option value="H">Hearts</option>
                <option value="S">Spades</option>
                <option value="C">Clubs</option>
                <option value="D">Diamonds</option>
              </select>
            </div>
            <div className="CardSelector">
              <label htmlFor="card4rank">Rank 4:</label>
              <select name="card4rank" id="c4r" value={formState.c4r} onChange={changeHandler}>
                <option value="1">A</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">J</option>
                <option value="12">Q</option>
                <option value="13">K</option>
              </select>
              <label htmlFor="card4suite">Suite 4:</label>
              <select name="card4suite" id="c4s" value={formState.c4s} onChange={changeHandler}>
                <option value="H">Hearts</option>
                <option value="S">Spades</option>
                <option value="C">Clubs</option>
                <option value="D">Diamonds</option>
              </select>
            </div>
            <div className="CardSelector">
              <label htmlFor="card5rank">Rank 5:</label>
              <select name="card5rank" id="c5r" value={formState.c5r} onChange={changeHandler}>
                <option value="1">A</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">J</option>
                <option value="12">Q</option>
                <option value="13">K</option>
              </select>
              <label htmlFor="card5suite">Suite 5:</label>
              <select name="card5suite" id="c5s" value={formState.c5s} onChange={changeHandler}>
                <option value="H">Hearts</option>
                <option value="S">Spades</option>
                <option value="C">Clubs</option>
                <option value="D">Diamonds</option>
              </select>
            </div>
            <div className="CardSelector">
              <label htmlFor="card6rank">Rank 6:</label>
              <select name="card6rank" id="c6r" value={formState.c6r} onChange={changeHandler}>
                <option value="1">A</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">J</option>
                <option value="12">Q</option>
                <option value="13">K</option>
              </select>
              <label htmlFor="card6suite">Suite 6:</label>
              <select name="card6suite" id="c6s" value={formState.c6s} onChange={changeHandler}>
                <option value="H">Hearts</option>
                <option value="S">Spades</option>
                <option value="C">Clubs</option>
                <option value="D">Diamonds</option>
              </select>
            </div>
            <input type="submit" value="Submit" />
          </form>
          </div>
        <div className="TableWrapper">
          <DisplayResults entries={cardData}/>
        </div>
      </div>
    </>
  );
}

export default App;
