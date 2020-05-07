const startButton = document.querySelector('#startButton');
const pauseButton = document.querySelector('#pauseButton');
const duration = document.querySelector('#duration');

const timer = new Timer(startButton, pauseButton, duration, {
    onStart() {
        console.log('start');
    },
    onTick() {
        console.log('the timer is ticking');
    },
    onfinish() {
        console.log('the timer has finished');
    }
});