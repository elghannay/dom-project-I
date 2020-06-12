const { Engine, Render, Runner, World, Bodies } = Matter;

const engine = Engine.create();
const { world } = engine;
// where to render the world
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 600
  }
});
// draw all the update onto the screen. 
Render.run(render);
// game loop that handles continuously updating
// the Engine for you within a browse.
Runner.run(Runner.create(), engine);

const shape = Bodies.rectangle(200, 200, 50, 50, {
  isStatic: true
});
World.add(world, shape);
