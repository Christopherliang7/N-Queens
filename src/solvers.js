/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
// toggle pieces
// hasAnyRooksConflicts
window.findNRooksSolution = function(n) {
  // use board to place pieces
  // create new board with n rows
  // solution is currently undefined - replace solution with board rows
  // iterate through row indexes
  // iterate through column indexes
  // toggle to place rook on board
  // if rook has any conflicts
  // toggle once more with iteration
  // set solution = board.rows()
  var board = new Board({n: n});
  var solution = undefined;

  for (var x = 0; x < board.rows().length; x++) {
    for (var y = 0; y < board.rows()[x].length; y++) {
      board.togglePiece(x, y);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(x, y);
      }
    }
  }
  solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};




// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  var findSolution = function(row) {
    // if all rows exhausted, increment solutionCount and stop
    if (row === 0) {
      solutionCount++;
      return;
    }
    // iterate over possible decisions
    for (var i = 0; i < n; i++) {
      // place a piece
      board.togglePiece(row, i);
      // recurse into remaining problem
      if (!board.hasAnyRooksConflicts()) {
        findSolution(row + 1);
      }
      // unplace a piece
      board.togglePiece(row, i);
    }
  };
  findSolution(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};




// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = undefined;

  for (var x = 0; x < board.rows().length; x++) {
    for (var y = 0; y < board.rows()[x].length; y++) {
      board.togglePiece(x, y);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(x, y);
      }
    }
  }
  solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};




// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
