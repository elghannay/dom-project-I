const startButton = document.querySelector('#startButton');
const pauseButton = document.querySelector('#pauseButton');
const duration = document.querySelector('#duration');
const circle = document.querySelector('circle');
const radius = circle.getAttribute('r');
const perimeter = radius * Math.PI * 2;
let totalDuration = 0;
// we need totalDuration for calculating dashoffset 

const timer = new Timer(startButton, pauseButton, duration, {
    onStart(total) {
        circle.setAttribute('stroke-dasharray', perimeter);
        totalDuration = total;
        // stroke-dasharray(10) make the 10 pixels long dashes and 10 pixel long gaps
    },
    onTick(timeRemaining) {
        circle.setAttribute('stroke-dashoffset', (perimeter * timeRemaining / totalDuration - perimeter));
    },
    onfinish() {
        circle.setAttribute('stroke-dashoffset', 0);
    }
});


/* bugs to fix at the moment and features to add
when pausing the animation start from zero
when clicking for the second time on the start button
the pause does not work
add a logging system to track how many hours have you worked each day
add a min timer instead of seconds
*/

