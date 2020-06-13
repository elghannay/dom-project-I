const { Engine, Render, Runner, World, Bodies } = Matter;

const engine = Engine.create();
const { world } = engine;

const cells = 3;
const width = 800;
const height = 500;

const unitLength = width / cells;

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
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true }),
];
World.add(world, walls);

// maze creation.

const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false));

// pick a randomly starting cell.

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

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

    if (nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells) continue;

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

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) return;
    else {
      const wall = Bodies.rectangle(columnIndex * unitLength + unitLength / 2, rowIndex * unitLength + unitLength, unitLength, 10);
      World.add(world, walls);
    }
  });
});
