"use client";
import React, { useState, useEffect } from "react";
import { format24HourTime, formatMatchDate } from "@/utils/date-time.utils";

interface MatchStartTime {
    date: string;
    time: string;
}

interface Props {
    matchStartTime: MatchStartTime;
    done: () => void;
    overdue: () => void;
}

const CountdownTimer: React.FC<Props> = ({ matchStartTime, done, overdue }) => {
    // console.log(matchStartTime);
    const [countdown, setCountdown] = useState<string>("");
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        const { date, time } = matchStartTime;
        const [day, month, year] = date?.split(".")?.map(Number);
        const [hours, minutes] = time?.split(":")?.map(Number);

        const matchStartDateTime = new Date(
            year,
            month - 1,
            day,
            hours,
            minutes,
        );
        const interval = setInterval(() => {
            const now = new Date();
            const diff = matchStartDateTime?.getTime() - now?.getTime();

            if (diff <= 0) {
                setCountdown("00 hours 00 minutes and 00 seconds");
                done();
                clearInterval(interval);
                setIsDone(true);
            } else if (diff <= -7200000) {
                // 2 hours in milliseconds
                overdue();
                clearInterval(interval);
                setIsDone(false);
            } else {
                const hours = Math.floor(diff / (1000 * 60 * 60))
                    .toString()
                    .padStart(2, "0");
                const minutes = Math.floor(
                    (diff % (1000 * 60 * 60)) / (1000 * 60),
                )
                    .toString()
                    .padStart(2, "0");
                const seconds = Math.floor((diff % (1000 * 60)) / 1000)
                    .toString()
                    .padStart(2, "0");
                setCountdown(
                    `${hours} hours ${minutes} minutes and ${seconds} seconds`,
                );
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [matchStartTime, done, overdue]);

    return null;

    return (
        <div className={"flex flex-col text-center"}>
            <span>{formatMatchDate(matchStartTime.date)}</span>
            <span>{format24HourTime(matchStartTime.time)}</span>
        </div>
    );
};

export default CountdownTimer;
