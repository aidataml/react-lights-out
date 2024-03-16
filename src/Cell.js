/* A simpler component. This will simply render a <div>, where the CSS classes will indicate 
whether this cell is lit or unlit. This is what the user clicks on — but it will need to call 
a function it receives from the Board, since that will need to update the state. */

import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ flipCellsAroundMe, isLit = false }) {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  return (
    <td
      className={classes}
      onClick={flipCellsAroundMe}
      role="button"
      cell-testid="cell"
    />
  );
}

export default Cell;
