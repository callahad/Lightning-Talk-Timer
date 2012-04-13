(function() {
  var formatSeconds, truncate;
  truncate = function(x) {
    if (x > 0) {
      return Math.floor(x);
    } else {
      return Math.ceil(x);
    }
  };
  formatSeconds = function(seconds) {
    var min, sec, sign;
    sign = seconds >= 0 ? "" : "-";
    min = Math.abs(truncate(seconds / 60));
    sec = ("0" + Math.abs(seconds % 60)).slice(-2);
    return "" + sign + min + ":" + sec;
  };
  this.Timer = (function() {
    function Timer(seconds, callbacks) {
      var activeInterval, initial, paused, start, stop, tick;
      if (seconds == null) {
        seconds = 300;
      }
      if (callbacks == null) {
        callbacks = {};
      }
      initial = seconds;
      paused = true;
      activeInterval = null;
      tick = function() {
        if (!paused) {
          seconds -= 1;
          if (typeof callbacks.tick === "function") {
            callbacks.tick(seconds, formatSeconds(seconds));
          }
          return typeof callbacks[seconds] === "function" ? callbacks[seconds]() : void 0;
        }
      };
      this.getSeconds = function() {
        return seconds;
      };
      this.getHumanTime = function() {
        return formatSeconds(seconds);
      };
      this.start = function() {
        paused = false;
                if (activeInterval != null) {
          activeInterval;
        } else {
          activeInterval = setInterval(tick, 1000);
        };
        return this;
      };
      start = this.start;
      this.stop = function() {
        paused = true;
        if (activeInterval != null) {
          clearInterval(activeInterval);
          activeInterval = null;
        }
        return this;
      };
      stop = this.stop;
      this.pause = function() {
        if (paused) {
          start();
        } else {
          stop();
        }
        return this;
      };
      this.reset = function() {
        this.stop();
        seconds = initial;
        if (typeof callbacks.reset === "function") {
          callbacks.reset();
        }
        return this;
      };
    }
    return Timer;
  })();
}).call(this);
