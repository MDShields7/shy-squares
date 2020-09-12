import React, { useState, useEffect } from "react";

const Timer = (props) => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [milliseconds, setMilliseconds] = useState(0);
    const {gameStart, gameLose, finalTime} = props;

//   function toggle() {
//     setIsActive(!isActive);
//   }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (gameLose) {
        setSeconds(0);
    } else if (gameStart) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!gameStart) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [gameStart, gameLose, finalTime]);
//   console.log('TImer, finalTime', finalTime)
  return (
      <div className="time">{seconds}s</div>
  );
};

export default function Host(props) {
  return <Timer gameStart={props.gameStart} finalTime={props.finalTime} gameLose={props.gameLose}/>;
}