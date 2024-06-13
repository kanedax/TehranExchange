import React, { useEffect, useState } from 'react'
import { httpServiceTime } from '../../Core/HttpService'
import { toast } from 'react-toastify'

const DateTime = () => {
    const [dateAndTime, setDateAndTime] = useState(null)

    const handleGetTime = async () => {
        try {
            const response = await httpServiceTime.get('/StaticData/GetTime')
            if (response.status === 200 && response.statusText === "OK") {
                setDateAndTime(response.data)
            } else {
                toast.error(response.statusText, {
                    position: "bottom-left",
                });
            }
        } catch (error) {
            toast.error(
                error,
                { position: "bottom-left" }
            );
        }
    }
    useEffect(() => {
        const intervale = setInterval(() => { handleGetTime() }, 1000)
        return () => {
            clearInterval(intervale);
        };
    }, [dateAndTime])


    const time = dateAndTime?.slice(10)
    // const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // const d = new Date()
    // const day = days[d.getDay()];
    // const startTime = time?.slice(0, 3)
    // const stopTime = time?.slice(0, 6)

    return (
        <div > 
            {time}
            {/* {day == "Thursday" || "Friday" ? <p>{`بسته ${time}`}</p> : day !== "Thursday" || "Friday" && startTime < "09" ? <p>{`بسته ${time}`}</p> : day !== "Thursday" || "Friday" && stopTime > "12:30" ? <p>{`بسته ${time}`}</p> : <p>{`باز ${time}`}</p>} */}
        </div>
    )
}

export default DateTime