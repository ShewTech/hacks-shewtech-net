import { useState, useEffect } from "react";

export interface TimerProps {
    startTime: number;
    event: () => void;
}

export const Timer = ({ startTime, event }: TimerProps) => {
    const [time, setTime] = useState(startTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime > 1) {
                    return prevTime - 1;
                } else {
                    clearInterval(timer);
                    event();
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [event]);

    return (
        <h4>Closing in {time}...</h4>
    );
}
