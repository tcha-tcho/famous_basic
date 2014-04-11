Famous(function(require) {

  var Transitionable = require('famous/Transitionable');

  var state = new Transitionable([0, 50]);

  state.set([100, -20], {duration : 500});

  setTimeout(function(){
      console.log(state.get());            //returns [50, 15]
  }, 250);

})