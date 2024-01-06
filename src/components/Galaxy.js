import React, {useRef, useEffect, useContext} from 'react';
import '../css/Galaxy.css';
import {BaseExponentContext} from "./BaseExponentContext";

const Galaxy = () => {

    const { baseExponent } = useContext(BaseExponentContext);
    const canvasRef = useRef(null);
    //const canvasRef = useRef(CanvasRenderingContext2D);
    const expRef = useRef(baseExponent);
    const mouse = {
        x: null,
        y: null
    }

    useEffect(() => {
        expRef.current = baseExponent;
    }, [baseExponent]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let centerX = canvas.width / 2;
        let centerY = canvas.height / 2;
        let stars = []; // Initialize stars array
        for (let i = 0; i < 1000; i++) { // Create stars with random positions
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3,
                velocity: 0,
                rotation: Math.random() * 360 // Initial rotation angle in degrees

            });
        }

        function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, rotation) {
            ctx.save(); // Save the current state of the canvas
            ctx.translate(cx, cy); // Move to the star's center
            ctx.rotate(rotation); // Apply rotation
            ctx.translate(-cx, -cy); // Move back

            let rot = Math.PI / 2 * 3;
            let x = cx;
            let y = cy;
            let step = Math.PI / spikes;

            ctx.beginPath();
            ctx.moveTo(cx, cy - outerRadius);

            for (let i = 0; i < spikes; i++) {
                x = cx + Math.cos(rot) * outerRadius;
                y = cy + Math.sin(rot) * outerRadius;
                ctx.lineTo(x, y);
                rot += step;

                x = cx + Math.cos(rot) * innerRadius;
                y = cy + Math.sin(rot) * innerRadius;
                ctx.lineTo(x, y);
                rot += step;
            }

            ctx.lineTo(cx, cy - outerRadius);
            ctx.closePath();
            ctx.fillStyle = "#FFF";
            ctx.fill();
            ctx.restore(); // Restore the canvas state
        }

        function draw() {
            // Instead of clearing the canvas completely,
            // fill it with a semi-transparent 'black' rectangle to achieve the trail effect
            const maxAlpha = .5;
            const minAlpha = 0.1;
            const maxExpValue = 10;
// Calculate slope
            const slope = (minAlpha - maxAlpha) / maxExpValue;
// Calculate alpha
            let alpha = slope * expRef.current + maxAlpha;
// Clamp the alpha value between the minAlpha and maxAlpha
            alpha = Math.max(Math.min(alpha, maxAlpha), minAlpha);
            ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                drawStar(ctx, star.x, star.y, 5, star.size, star.size / 2, star.rotation * Math.PI / 180); // Convert degrees to radians for rotation
            });

            update();
            requestAnimationFrame(draw);
        }


        function update() { // Function to update stars position
            //console.log(baseExponent);
            stars.forEach(star => {
                // Calculate distances
                let dx = star.x - centerX;
                let dy = star.y - centerY;
                let distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
                let angle = Math.atan2(dy, dx);

                // Exponential speed factor calculation with increased radical
                let normalizedDistance = distanceFromCenter / Math.sqrt(centerX * centerX + centerY * centerY);
                let speedFactor = Math.exp(expRef.current * normalizedDistance) - 1; // Increased the base of exponent
                // Calculate speed adjustment based on cursor position
                if (mouse.x !== null) {
                    let mdx = mouse.x - centerX;
                    let mdy = mouse.y - centerY;
                    let distanceFromMouse = Math.sqrt(mdx * mdx + mdy * mdy);
                    let normalizedMouseDistance = 1 - (distanceFromMouse / Math.sqrt(centerX * centerX + centerY * centerY));
                    speedFactor *= (0.5 + 1.5 * Math.exp(1 * normalizedMouseDistance)); // Adjust speed based on mouse position
                }

                // Update star position
                star.velocity = 0.5 * speedFactor;
                star.x += star.velocity * Math.cos(angle);
                star.y += star.velocity * Math.sin(angle);
                let maxSize = 10; // Replace 'x' with whatever maximum size you want
                if (star.size < normalizedDistance * maxSize) {
                    star.size = normalizedDistance * maxSize
                }
                star.rotation += normalizedDistance * 10; // Change this value to adjust rotation speed

                // Reset star if it goes off-screen
                if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
                    // Define a range for how far from the center the stars can reset
                    let rangeX = canvas.width / 2; // Quarter width from the center
                    let rangeY = canvas.height / 2; // Quarter height from the center

                    // Reset the star's position to a random point within the range around the center
                    star.x = (canvas.width / 2 - rangeX / 2) + Math.random() * rangeX;
                    star.y = (canvas.height / 2 - rangeY / 2) + Math.random() * rangeY;

/*                    star.x = Math.random() * canvas.width;
                    star.y = Math.random() * canvas.height;*/
                    star.size = Math.random() * 3;
                }
            });
        }

        function updateMousePosition(event) { // Define the updateMousePosition function
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        }

        function handleResize() { // Define the handleResize function
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            centerX = canvas.width / 2;
            centerY = canvas.height / 2;
        }

        window.addEventListener('mousemove', updateMousePosition); // Attach the mousemove listener
        window.addEventListener('resize', handleResize); // Attach the resize listener

        draw(); // Start the animation loop

        // Cleanup listeners when component unmounts
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Effect runs only once

    return <canvas ref={canvasRef} className="canvas" />;
}

export default Galaxy;
