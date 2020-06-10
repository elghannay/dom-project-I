class Timer {
    constructor(startButton, pauseButton, duration, callbacks) {
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.duration = duration;
        if (callbacks) {
            // the callbacks are totally optional.
            // that's why everyTime we do check if the methods
            // does exists.
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onfinish = callbacks.onfinish;
        }
        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }
    // start:function(){} using the custom properties feature of js the arrow 
    // function will actually will be defined on the constructor thus the VALID line
    // code that is just above the function definition will be right on the constructor.
    // so the this keyword will always refer to the instance of the class.
    start = () => {
        // the error that i was making > if(this.callback) which has no sense.
        // so i should instead access the instance of the properties that i have set when
        // the callback exists.
        if (this.onStart)
            this.onStart(this.timeRemaining);
        this.tick();
        // instead of declaring a variable with const we need to be able 
        // to access it from anywhere on the class.
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
            // below we combine the setter and getter 
            this.timeRemaining = this.timeRemaining - 0.02;
            // whatever the value on the right (getter) will be 
            // provided as argument of the setter function.
        }
    }
    // with setters and getters we don't need the parentheses
    // as they will be treated as variables.
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
