// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {
  // Subclassing
  // Model - model view controller - data layer of our application - allows us to model our function
  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
    */


    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // check whether sum of pieces in row are greater than 1
      // set count to 0
      // iterate over row
      // add number to count
      // if count is greater than 1, return true
      // else, false
      var row = this.rows()[rowIndex];
      var count = 0;
      for (var col = 0; col < row.length; col++) {
        count += row[col];
        if (count > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // iterate through rows
      // if row does not have conflicts, return true
      // else false
      for (var i = 0; i < this.rows().length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // set count to 0
      // iterate rows
      // add values from each colIndex of each row
      // if count is greater than 1, return true
      var board = this.rows();
      var count = 0;
      for (var i = 0; i < board.length; i++) {
        count += board[i][colIndex];
        if (count > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // iterate through columns
      // if column contains conflicts return true
      var board = this.rows();
      for (var i = 0; i < board.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict\
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // iterate over rows
      // check row at column index
      // add value of row at column
      // if counter is greater than 1, return true
      // else, add to column index

      // var board = this.rows();
      // var count = 0;
      // var colIndex = majorDiagonalColumnIndexAtFirstRow;

      // for (var i = 0; i < board.length; i++) {
      //   count += board[i][colIndex];
      //   if (count > 1) {
      //     return true;
      //   }
      //   colIndex++;
      // }
      // return false;

      let acc = false;
      let ele = this.rows();
      let index = majorDiagonalColumnIndexAtFirstRow;
      for (let i = 0; i < this.rows().length; i++) {
        if (acc === false && ele[i][index]) {
          acc = true;
          index++;
        } else if (acc === true && ele[i][index]) {
          return true;
        } else if (acc === true) {
          index++;
        }
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // iterate over rows
      // iterate over row indexes
      for (var i = 0; i < this.rows().length; i++) {
        for (var j = 0; j < this.rows().length; j++) {
          if (this.rows()[i][j] === 1) {
            if (this.hasMajorDiagonalConflictAt(j)) {
              return true;
            }
          }
        }
      }

      // for (var i = 0; i < this.rows().length; i++) {
      //   if (this.hasMajorDiagonalConflictAt(i)) {
      //     return true;
      //   }
      // }
      // let count = 0;
      // let colCount = this.rows().length - 2;
      // for (var j = this.rows().length - 1; j >= 0; j--) {
      //   count += this.rows()[j][colCount];
      //   if ( count > 1) {
      //     return true;
      //   }
      //   colCount--;
      // }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let acc = false;
      let ele = this.rows();
      let index = minorDiagonalColumnIndexAtFirstRow;
      for (let i = 0; i < this.rows().length; i++) {
        if (acc === false && ele[i][index]) {
          acc = true;
          index--;
        } else if (acc === true && ele[i][index]) {
          return true;
        } else if (acc === true) {
          index--;
        }
      }
      return false;
      // var board = this.rows();
      // var count = 0;
      // var colIndex = minorDiagonalColumnIndexAtFirstRow;

      // for (var i = 0; i < board.length; i++) {
      //   count += board[i][colIndex];
      //   if (count > 1) {
      //     return true;
      //   }
      //   colIndex--;
      // }
      // return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // iterate over rows of matrix
      // iterate elements of rows
      // if elements at row contains a queen
      // check if it has any minor diagonal conflicts
      // if it does, return true

      var board = this.rows();
      for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
          if (board[i][j] === 1) {
            if (this.hasMinorDiagonalConflictAt(j)) {
              return true;
            }
          }
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
