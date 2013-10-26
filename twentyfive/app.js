// App starting point

var tf = {};

// 1 second ticker module
(function(){
  var ticker = tf.ticker = {
    tickListeners : [],
    addListener: function(listener) {
      this.tickListeners.push(listener);
    },
    removeListener: function(target) {
      // loop to find the target in the array
      for (var i=0, len=ticker.tickListeners.length; i < len; i++)
      {
        if (tf.ticker.tickListeners[i] == target) {
          console.log("You found me????");
          tf.ticker.tickListeners.splice(i, 1); // remove that found target from the array
        }
      }
    },
    tick: function() {
      for(var i=0, len=ticker.tickListeners.length; i<len; i++) {
        ticker.tickListeners[i].tick();
      }
    }
  };

  ticker.globalInterval = setInterval(ticker.tick, 1000);
})();


// Twenty Five Timer class definition
(function(){
  var TwentyFiveTimer = (function(){
    var intToTime = function(value) {
      var minute = Math.floor(value / 60);
      if (minute < 10) minute = '0' + minute;
      var second = value % 60;
      if (second < 10) second = '0' + second;

      return minute + ':' + second;
    }

    function TwentyFiveTimer(element) {
      this.count = 0;
      this.reset();
      this.element = element;

    }
    TwentyFiveTimer.prototype.reset = function() {
      this.count = 3; //25 * 60;
      $(this.element).text(intToTime(this.count));
    }
    TwentyFiveTimer.prototype.tick = function(){
      this.count -= 1;
      if (this.count <= 0) {
        $.mobile.changePage('#finish');
        tf.ticker.removeListener(this);
      }

      $(this.element).text(intToTime(this.count));
    };
    return TwentyFiveTimer;
  })();

  tf.TwentyFiveTimer = TwentyFiveTimer;
})();

$(function(){
  var timer = new tf.TwentyFiveTimer($('#timer'));
  tf.ticker.addListener(timer);

  $('#reset').click(function(){
    timer.reset();
  });
});











