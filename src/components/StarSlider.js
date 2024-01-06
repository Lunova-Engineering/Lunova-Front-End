// ExponentSlider.js
import React, {useContext} from 'react';
import {BaseExponentContext} from "./BaseExponentContext";
import '../css/StarSlider.css';

const StarSlider = () => {
    const { baseExponent, setBaseExponent } = useContext(BaseExponentContext);

    const handleExponentChange = (event) => {
        setBaseExponent(event.target.value);
    };

    return (
        <div className="slider-container my-4 w-100">
            {/*<label htmlFor="StarSlider" className="form-label text-white">Base Exponent: {baseExponent}</label>*/}
            <div className="d-flex justify-content-between mb-2 text-white pt-2">
                <span className="slider-label">Star Gazing</span>
                <span className="slider-label">Warp Drive</span>
            </div>
            <input
                id="StarSlider"
                type="range"
                className="form-range"
                min=".5"
                max="10"
                step="0.1"
                value={baseExponent}
                onChange={handleExponentChange}
            />
        </div>
    );
};


export default StarSlider;
