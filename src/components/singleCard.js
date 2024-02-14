import "./singleCard.css";
import { useSpring, animated } from "react-spring";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const { transform, opacity } = useSpring({
    opacity: flipped ? 0 : 1,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg) scaleX(${flipped ? -1 : 1})`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <animated.div
      className="card"
      onClick={handleClick}
      style={{ opacity: opacity.interpolate((o) => 1 - o), transform}}
    >
      <div className="flipped">
        <img className="front" src={card.src} alt="card front" style={{ backGround: "white" }}/>
      </div>
    </animated.div>
  );
}
