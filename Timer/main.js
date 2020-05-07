class Timer {
    constructor(startButton, pauseButton, duration) {
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.duration = duration;
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
        this.duration.addEventListener('input', () => {
            this.timeRemaining = +this.duration.value;
            this.initialValue = this.timeRemaining;
        });
    }
    start = () => {
        this.tick();
        this.intervalId = setInterval(() => {
            this.tick();
        }, 1000);
    }
    tick = () => {
        this.timeRemaining = this.timeRemaining - 1;
        this.duration.value = this.timeRemaining;
        if (this.timeRemaining === 0) {
            this.pause();
            this.timeRemaining = this.initialValue;
            this.duration.value = this.initialValue;
        }
    }
    pause = () => {
        clearInterval(this.intervalId);
    }
}

const startButton = document.querySelector('#startButton');
const pauseButton = document.querySelector('#pauseButton');
const duration = document.querySelector('#duration');

const timer = new Timer(startButton, pauseButton, duration);