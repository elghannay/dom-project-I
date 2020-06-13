const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter;

const engine = Engine.create();
const { world } = engine;

// where to render the world
const width = 800;
const height = 600;
const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width,
    height,
    wireframes: false,
  },
});
// draw all the update onto the screen.
Render.run(render);
// game loop that handles continuously updating
// the Engine for you within a browse.
// Continuously ticks a Matter.Engine.
Runner.run(Runner.create(), engine);

// walls
const walls = [
  Bodies.rectangle(400, 0, 800, 40, { isStatic: true }),
  Bodies.rectangle(400, 600, 800, 40, { isStatic: true }),
  Bodies.rectangle(0, 300, 40, 600, { isStatic: true }),
  Bodies.rectangle(800, 300, 40, 600, { isStatic: true }),
];
World.add(world, walls);

// add mouse controls
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, { mouse: mouse });
World.add(world, mouseConstraint);

// adding random shapes
for (let i = 0; i < 50; i++) {
  if (Math.random() < 0.5) {
    World.add(world, Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50));
  } else {
    World.add(
      world,
      Bodies.circle(Math.random() * width, Math.random() * height, 20, {
        render: {
          fillStyle: 'red',
        },
      })
    );
  }
}

// Maze generation

// let grid = [];
// for (let i = 0; i < 3; i++) {
//   grid.push([]);
//   for (let j = 0; j < 3; j++) {
//     grid[i].push(false);
//   }
// }
