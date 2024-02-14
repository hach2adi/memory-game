import "./App.css";
import { useEffect, useState } from "react";
import { useSprings } from "react-spring";
import Confetti from "react-confetti";
import SingleCard from "./components/singleCard";

const cardImages = [
  { src: "/images/1.png", matched: false },
  { src: "/images/2.png", matched: false },
  { src: "/images/3.png", matched: false },
  { src: "/images/4.png", matched: false },
  { src: "/images/5.png", matched: false },
  { src: "/images/6.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setConfetti(false);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.every((card) => card.matched)) {
      setConfetti(true);
    }
  }, [cards]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const springs = useSprings(
    cards.length,
    cards.map((card, index) => ({
      opacity: 1,
      transform: "perspective(600px) rotateY(0deg)",
      from: { opacity: 0, transform: "perspective(600px) rotateY(180deg)" },
      delay: index * 100,
    }))
  );

  return (
    <div className="App">
      <h1>Magic Memory Game</h1>
      <p>No. of Turns: {turns}</p>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {springs.map((props, index) => (
          <SingleCard
            key={cards[index].id}
            card={cards[index]}
            handleChoice={handleChoice}
            flipped={
              cards[index] === choiceOne ||
              cards[index] === choiceTwo ||
              cards[index].matched
            }
            disabled={disabled}
            style={props}
          />
        ))}
      </div>
    
      {confetti && <Confetti />}
    </div>
  );
}

export default App;
