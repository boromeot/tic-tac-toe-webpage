// Your code here

let isXturn = true;
let grid = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function checkWin(grid) {
  for (let i = 0; i < grid[0].length; i++) {
    if (grid[i][0] !== null && grid[i][1] === grid[i][0] && grid[i][2] === grid[i][0]) {
      return grid[i][0];
    }
    if (grid[0][i] !== null && grid[1][i] === grid[0][i] && grid[2][i] === grid[0][i]) {
      return grid[0][i];
    }

  }
  if(grid[0][0] !== null && grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) {
      return grid[0][0];
  }
  if(grid[0][2] !== null && grid[0][2] === grid[1][1] && grid[0][2] === grid[2][0]) {
      return grid[0][2];
  }
  for (let i = 0; i < grid[0].length; i++) {
      for (let j = 0; j < grid.length; j++) {
          if (grid[i][j] === null) {
              return false;
          }
      }
  }
  return 'T';
}

function cellClickCb(event) {
  let row = event.target.id.split('-')[1];
  let col = event.target.id.split('-')[2];
  if (isXturn) {
    event.target.style.backgroundImage = "url('https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg')";
    isXturn = false;
    grid[row][col] = 'x';
  } else {
    event.target.style.backgroundImage = "url('https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg')";
    isXturn = true;
    grid[row][col] = 'o';
  }

  event.target.removeEventListener('click', cellClickCb);
  let outcome = checkWin(grid);
  if (outcome) {
    let h3Outcome = document.querySelector('.outcome');
    if (outcome === 'x') {
      h3Outcome.innerText = 'X wins';
    } else if (outcome === 'o') {
      h3Outcome.innerText = 'O wins';
    } else {
      h3Outcome.innerText = 'tie';
    }
    for (let i = 1; i <= 9; i++) {
      let cell = document.querySelector(`.container div:nth-child(${i})`);
      cell.removeEventListener('click', cellClickCb);
    }
    h3Outcome.style.visibility = 'visible';
  }
}

function newGame() {
  let h3Outcome = document.querySelector('.outcome');
  grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  isXturn = true;
  for (let i = 1; i <= 9; i++) {
    let cell = document.querySelector(`.container div:nth-child(${i})`);
    cell.style.backgroundImage = null;
  }
  h3Outcome.style.visibility = 'hidden';
  write();
}

function write() {
  let count = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      count++;
      let cell = document.querySelector(`.container div:nth-child(${count})`);
      cell.setAttribute('id', `cell-${i}-${j}`);
      cell.addEventListener('click', cellClickCb);
    }
  }
}


window.onload = () => {
  write()
}
