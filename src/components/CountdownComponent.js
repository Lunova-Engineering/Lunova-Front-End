import React, {useState} from 'react';
import Countdown from 'react-countdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/CountdownComponent.css'
import {useAuth} from "./AuthProvider";
import StarSlider from "./StarSlider";

const CountdownComponent = () => {
    const {token} = useAuth();
    const [baseExponent, setBaseExponent] = useState(2); // Default value

    // Helper function to format the time
    const formatNumber = (num) => String(num).padStart(2, '0');
    const handleExponentChange = (event) => {
        setBaseExponent(event.target.value);
    };
    // Renderer for the countdown
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <span>Launch time!</span>;
        } else {
            // Calculate months and remaining days for better representation
            const months = Math.floor(days / 30);
            const remainingDays = days % 30;

            // Render the countdown
            return (
                <div className="countdown-container flex-column">
                <div className="text-center">
                    {(token)&& <h1 className="countdown-header">Welcome back, {token.username} </h1> }
                    <h2 className="countdown-header">Countdown until launch!</h2>
                    <div className="d-flex justify-content-center">
                        <div className="mx-3 text-center">
                            <div className="countdown-number">{formatNumber(months)}</div>
                            <div className="countdown-label">MONTHS</div>
                        </div>
                        <div className="mx-3 text-center">
                            <div className="countdown-number">{formatNumber(remainingDays)}</div>
                            <div className="countdown-label">DAYS</div>
                        </div>
                        <div className="mx-3 text-center">
                            <div className="countdown-number">{formatNumber(hours)}</div>
                            <div className="countdown-label">HOURS</div>
                        </div>
                        <div className="mx-3 text-center">
                            <div className="countdown-number">{formatNumber(minutes)}</div>
                            <div className="countdown-label">MINUTES</div>
                        </div>
                        <div className="mx-3 text-center">
                            <div className="countdown-number">{formatNumber(seconds)}</div>
                            <div className="countdown-label">SECONDS</div>
                        </div>
                    </div>
                </div>
                    <div className="star-slider mt-3 w-100">
                        <StarSlider exponent={baseExponent} onExponentChange={handleExponentChange}/>
                    </div>
                </div>
            );
        }
    };

    return (
        <Countdown
            date={new Date('2024-04-01T00:00:00Z')}
            renderer={renderer}
        />
    );
};

export default CountdownComponent;
