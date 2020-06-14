const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;
// Body : contains methods for creating and manipulating body models

const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;

const cellsHorizontal = 8;
const cellsVertical = 5;
const width = window.innerWidth;
const height = window.innerHeight;

const unitLengthX = width / cellsHorizontal;
const unitLengthY = height / cellsVertical;

const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width,
    height,
    wireframes: false,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);

// walls

const walls = [
  Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 2, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 2, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 2, height, { isStatic: true }),
];
World.add(world, walls);

// maze creation.

const grid = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

const verticals = Array(cellsVertical)
  .fill(null)
  .map(() => Array(cellsHorizontal - 1).fill(false));

const horizontals = Array(cellsVertical - 1)
  .fill(null)
  .map(() => Array(cellsHorizontal).fill(false));

// pick a randomly starting cell.

const startRow = Math.floor(Math.random() * cellsVertical);
const startColumn = Math.floor(Math.random() * cellsHorizontal);

// shuffle algorithm.

const shuffle = (array) => {
  let counter = array.length;
  while (counter > 0) {
    counter--;
    let index = Math.floor(Math.random() * counter);
    let temp = array[index];
    array[index] = array[counter];
    array[counter] = temp;
  }
  return array;
};

const stepThroughCell = (row, column) => {
  // if i have visited the cell at row and column return
  if (grid[row][column]) return;
  //  mark the cell at row and column as visited.
  grid[row][column] = true;
  // assemble randomly ordered list of neighbors, so we can
  // generate each time a new maze;
  const neighbors = shuffle([
    [row - 1, column, 'up'],
    [row, column - 1, 'left'],
    [row + 1, column, 'down'],
    [row, column + 1, 'right'],
  ]);

  // for each neighbor...

  for (const neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;
    // check if a neighbor is out of bounds

    if (nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal) continue;

    // check if we have visited that neighbor.
    if (grid[nextRow][nextColumn]) {
      continue;
    }

    // remove a wall from either verticals or horizontals.
    if (direction === 'left') verticals[row][column - 1] = true;
    else if (direction === 'right') verticals[row][column] = true;
    else if (direction === 'up') horizontals[row - 1][column] = true;
    else if (direction === 'down') horizontals[row][column] = true;

    // calling the function for each cell in the maze.
    stepThroughCell(nextRow, nextColumn);
  }
};
stepThroughCell(startRow, startColumn);

horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) return;
    else {
      const wall = Bodies.rectangle(columnIndex * unitLengthX + unitLengthX / 2, rowIndex * unitLengthY + unitLengthY, unitLengthX, 10, {
        isStatic: true,
        label: 'walls',
        render: {
          fillStyle: 'red',
        },
      });
      World.add(world, wall);
    }
  });
});

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) return;
    else {
      const wall = Bodies.rectangle(columnIndex * unitLengthX + unitLengthX, rowIndex * unitLengthY + unitLengthY / 2, 10, unitLengthY, {
        isStatic: true,
        label: 'walls',
        render: {
          fillStyle: 'red',
        },
      });
      World.add(world, wall);
    }
  });
});

// Goal

const goal = Bodies.rectangle(width - unitLengthX / 2, height - unitLengthY / 2, unitLengthX * 0.7, unitLengthY * 0.7, {
  isStatic: true,
  label: 'goal',
  render: {
    fillStyle: '#87e5c2',
  },
});
World.add(world, goal);

// ball

ballRadius = Math.min(unitLengthY, unitLengthX) / 4;
const ball = Bodies.circle(unitLengthX / 2, unitLengthY / 2, ballRadius, {
  label: 'ball',
});
World.add(world, ball);

// adding key controls

document.addEventListener('keydown', (event) => {
  const { x, y } = ball.velocity;
  if (event.keyCode === 87) Body.setVelocity(ball, { x, y: y - 5 });
  if (event.keyCode === 65) Body.setVelocity(ball, { x: x - 5, y });
  if (event.keyCode === 68) Body.setVelocity(ball, { x: x + 5, y });
  if (event.keyCode === 83) Body.setVelocity(ball, { x, y: y + 5 });
});

// winning logic;

Events.on(engine, 'collisionStart', (event) => {
  event.pairs.forEach((collision) => {
    const labels = ['ball', 'goal'];
    if (labels.includes(collision.bodyA.label) && labels.includes(collision.bodyA.label)) {
      world.bodies.forEach((body) => {
        if (body.label === 'walls') {
          document.querySelector('.winner').classList.remove('hidden');
          world.gravity.y = 1;
          Body.setStatic(body, false);
        }
      });
    }
  });
});
