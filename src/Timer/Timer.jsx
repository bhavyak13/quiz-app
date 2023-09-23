import React from 'react';
import { useState, useEffect } from 'react';
import './Timer.css'

const Timer = ({ deadline, submitQuiz }) => {

    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const getTime = () => {
        const time = Date.parse(deadline) - Date.now();
        if (time <= 0) {
            submitQuiz();
        }
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="timer">
            <div className="min_">
                Time left : {minutes} min
            </div>
            <div className="sec_">
                {seconds < 10 ? `0${seconds}` : seconds} secs
            </div>
        </div>
    );
};
export default Timer;