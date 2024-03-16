/* The most sophisticated component. It will hold the state that represents the in-memory grid of 
true/false for lights-on/off. Since the state for the board lives here, this is also were the setState() 
calls will need to go — and therefore, the functions that call setState(). */

import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

let nrows=10;
let ncols=10;
let chanceLightStartsOn=0.25;

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    console.log('Rows:', nrows, 'Cols:', ncols, 'Chance Light Starts On:', chanceLightStartsOn);
    let board = Array.from({ length: nrows }).map(() =>
      Array.from({ length: ncols }).map(() => Math.random() < chanceLightStartsOn)
    );
    console.log(board);
    return board;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    const won = board.every(row => row.every(cell => !cell));
    console.log(won);
    return won;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <div>You Won the Game!</div>;
  }

  // make table board
  let tblBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
          <Cell
              key={coord}
              isLit={board[y][x]}
              flipCellsAroundMe={evt => flipCellsAround(coord)}
          />,
      );
    }
    tblBoard.push(<tr key={y}>{row}</tr>);
  }

  return (
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
  );
}

export default Board;