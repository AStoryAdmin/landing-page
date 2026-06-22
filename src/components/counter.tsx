import React, { useState, useEffect } from "react";

interface CounterProps {
    target: number;
    duration: number;
}

const Counter: React.FC<CounterProps> = ({
    target,
    duration,
}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const stepTime = duration / target;

        const timer = setInterval(() => {
            setCount(prev => {
                if (prev >= target) {
                    clearInterval(timer);
                    return target;
                }
                return prev + 1;
            });
        }, stepTime);

        return () => clearInterval(timer);
    }, [target, duration]);

    return <span>{count}</span>;
};

export default Counter;