const warriorsGames = [{
  awayTeam: {
    team: 'Golden State',
    points: 119,
    isWinner: true
  },
  homeTeam: {
    team: 'Houston',
    points: 106,
    isWinner: false
  }
},
{
  awayTeam: {
    team: 'Golden State',
    points: 105,
    isWinner: false
  },
  homeTeam: {
    team: 'Houston',
    points: 127,
    isWinner: true
  }
},
{
  homeTeam: {
    team: 'Golden State',
    points: 126,
    isWinner: true
  },
  awayTeam: {
    team: 'Houston',
    points: 85,
    isWinner: false
  }
},
{
  homeTeam: {
    team: 'Golden State',
    points: 92,
    isWinner: false
  },
  awayTeam: {
    team: 'Houston',
    points: 95,
    isWinner: true
  }
},
{
  awayTeam: {
    team: 'Golden State',
    points: 94,
    isWinner: false
  },
  homeTeam: {
    team: 'Houston',
    points: 98,
    isWinner: true
  }
},
{
  homeTeam: {
    team: 'Golden State',
    points: 115,
    isWinner: true
  },
  awayTeam: {
    team: 'Houston',
    points: 86,
    isWinner: false
  }
},
{
  awayTeam: {
    team: 'Golden State',
    points: 101,
    isWinner: true
  },
  homeTeam: {
    team: 'Houston',
    points: 92,
    isWinner: false
  }
}
]

// display the home and the away team based on the object
// beside it add the points by bolding the winner
// if the golden state wins display it with a greenish background

/************************************************* */
/*                  unRefactored                   */
/************************************************* */

const ulParent = document.createElement('ul');

// for (const game of warriorsGames) {

//   const { awayTeam, homeTeam } = game;
//   const { team: aTeam, points: aPoints } = awayTeam;
//   const { team: hTeam, points: hPoints } = homeTeam;

//   const listItem = document.createElement('li');
//   const teamNames = `${aTeam} @ ${hTeam}`;

//   let results;
//   if (aPoints > hPoints) results = `<b>${aPoints}</b> - ${hPoints}`;
//   else results = ` ${aPoints} - <b>${hPoints}</b> `;

//   // this snippet to remember
//   const warriors = aTeam === 'Golden State' ? awayTeam : homeTeam;
//   listItem.classList.add(warriors.isWinner ? 'win' : 'lose')

//   listItem.innerHTML = `${teamNames} ${results}`;
//   ulParent.appendChild(listItem);
// }
// document.body.appendChild(ulParent);


/************************************************* */
/*                 a cleaner version               */
/************************************************* */

function gameChart(warriorsGames, targetTeam) {
  for (const game of warriorsGames) {
    const listItem = document.createElement('li');

    listItem.innerHTML = scoreLine(game);
    listItem.classList.add(isWinner(game, targetTeam))
    ulParent.appendChild(listItem);

  }
  return ulParent;
}

function scoreLine({ awayTeam, homeTeam }) {
  const { team: aTeam, points: aPoints } = awayTeam;
  const { team: hTeam, points: hPoints } = homeTeam;

  const teamNames = `${aTeam} @ ${hTeam}`;

  let results;
  if (aPoints > hPoints) results = `<b>${aPoints}</b> - ${hPoints}`;
  else results = ` ${aPoints} - <b>${hPoints}</b> `;

  return `${teamNames} ${results}`;
}

function isWinner({ awayTeam, homeTeam }, targetTeam) {
  const target = homeTeam.team === targetTeam ? homeTeam : awayTeam;
  return target.isWinner ? 'win' : 'lose';
}

const hr = document.querySelector('section#hr');
const hustonGame = gameChart(warriorsGames, 'Houston')
hr.appendChild(hustonGame);

const bostonGame = gameChart(warriorsGames, 'boston')
const gs = document.querySelector('section#gs');
// gs.appendChild(gameChart(warriorsGames, 'Golden State'));
console.log(bostonGame);


// console.log(gs.innerText);
// console.log(hr.innerText);