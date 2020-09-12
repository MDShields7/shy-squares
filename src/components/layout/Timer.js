import React, { useState, useEffect } from "react";

const Timer = (props) => {
    // const [isActive, setIsActive] = useState(false);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [milliseconds, setMilliseconds] = useState(0);
    const {gameStart, finalTime} = props;

//   function toggle() {
//     setIsActive(!isActive);
//   }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (gameStart && finalTime !== 0){
        setSeconds(finalTime/1000)
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
  }, [gameStart, finalTime]);
  console.log('timer, finalTime', finalTime)
  return (
      <div className="time">{seconds}s</div>
  );
};

export default function Host(props) {
  return <Timer gameStart={props.gameStart} finalTime={props.finalTime}/>;
}