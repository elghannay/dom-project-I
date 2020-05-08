class Timer {
    constructor(startButton, pauseButton, duration, callbacks) {
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.duration = duration;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onfinish = callbacks.onfinish;
        }
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }
    start = () => {
        // the error that i was making > if(this.callback) which has no sense.
        // so i should instead access the instance of the properties that i have set when
        // the callback exists.
        if (this.onStart)
            this.onStart(this.timeRemaining);
        this.tick();
        this.intervalId = setInterval(() => {
            this.tick();
        }, 20);
    }
    tick = () => {
        if (this.timeRemaining <= 0) {
            if (this.onfinish)
                this.onfinish();
            this.pause();
        }
        else {
            if (this.onTick)
                this.onTick(this.timeRemaining);
            this.timeRemaining = this.timeRemaining - 0.02;
        }
    }
    get timeRemaining() {
        return this.timeRemaining = parseFloat(this.duration.value);
    }
    set timeRemaining(time) {
        return this.duration.value = time.toFixed(2);
    }
    pause = () => {
        clearInterval(this.intervalId);
    }
}
