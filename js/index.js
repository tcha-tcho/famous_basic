window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                               window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

Famous(function(require, exports, module) {

  var Engine  = require("famous/Engine");
  var Surface = require("famous/Surface");
  var Modifier = require("famous/Modifier");
  var KeyCodes = require("famous-utils/KeyCodes");


  // var mainContext = Engine.createContext();
  // mainContext.setPerspective(200);
  // var surface = new Surface({
  //   size: [200, 200],
  //   content: "Hello World",
  //   classes: ["red-bg"],
  //   properties: {
  //     lineHeight: "200px",
  //     textAlign: "center"
  //   }
  // });
  // // var rotateX = new Modifier({
  // //   origin : [.5,.5],
  // //   transform : Transform.rotateX(Math.PI/4)
  // // });
  // mainContext.add(surface);



   
  // var mainContext = Engine.createContext();
  // var surface = new Surface({
  //   size: [200, 200],
  //   content: 'press keys',
  //   classes: ['red-bg'],
  //   properties: {
  //     lineHeight: '200px',
  //     textAlign: 'center'
  //   }
  // });

  // mainContext.add(new Modifier({origin :[.5, .5]})).add(surface);

  // Engine.on('keypress', function(event) {
  //   if (event.charCode >= KeyCodes['0'] && event.charCode <= KeyCodes['9']) {
  //     surface.setContent('you hit a number');
  //   } else {
  //     surface.setContent('not a number')
  //   }
  // });





  var Spring = require('famous-physics/forces/Spring')

  var PhysicsEngine = require('famous-physics/PhysicsEngine');

  var mainCtx = Engine.createContext();

  var PE = new PhysicsEngine();

  // Create a surface, content is html
  var surface = new Surface({
    size: [100, 100],
    content: "<span class='button'>Click To<br/>Spring<br/>Surface</span>",
    classes: ["test-surface"]
  });

  // Create a physical particle with position (p), velocity (v), mass(m)
  var particle = PE.createBody({
      m : 1,
      p : [0,0,0],
      v : [0,0,0]
  });

  // Create a spring that will act on the particle
  var spring = new Spring({
      anchor : [0,0,0],
      period : 400,
      dampingRatio : 0.07,
      length : 0
  });

  // Apply a force on the surface when it&#039;s clicked
  surface.on("click", function(e) {
    var force = { x: 0, y: 0, z: 0 -0.005 * 100};
    particle.applyForce(force);
  });

  // Link the spring, particle and surface together
  PE.attach(spring, particle);
  particle.link(surface);

  // Create the scene, applying a top level modifier to center
  // the scene vertically in the viewport
  mainCtx.add(new Modifier({origin : [.5,.5]})).link(PE);
  mainCtx.setPerspective(1000);

})