/* 
 * Scotti Anderson and Carlos Luevanos
 * Chess pieces, which follow this form:
 * 
 * 
 * function NameOfPiece (isWhite, letter, number) {
 *      this.model;
 *      this.isWhite = isWhite;
 *      this.letter = letter;
 *      this.number = number;
 *      this.symWhite = ...;
 *      this.symBlack = ..;
 *      
 *      ...
 * }
 * 
 * NameOfPiece.prototype.canMove = function (board) {...}; Returns an array of spaces that are legal moves
 * 
 * NameOfPiece.prototype.move = function (letter, number) {
 *      this.letter = letter;
 *      this.number = number;
 *      ...
 * }; Updates the piece variable to reflect it's new posistion
 * 
 * NameOfPiece.prototype.symbol = function () {
 *      if (this.isWhite) {
 *           return this.symWhite;
 *      } else {
 *           return this.symBlack;
 *      }
 * }; Returns a symbol for printing the board as text
 * 
 */

function Pawn(isWhite, letter, number) {
    //Universal piece stuff
    this.model;
    this.isWhite = isWhite;
    this.letter = letter;
    this.number = number;
    this.symWhite = "P";
    this.symBlack = "p";

    //Pawn stuff
    this.firstMove = true;
}

Pawn.prototype.canMove = function (board) {
    var spaces = [];

    var direction;
    if (this.isWhite) {
        direction = 1;
    } else {
        direction = -1;
    }
    // Check if pawn can advance
    var nextNumber = this.number + direction;
    if (isInRange(nextNumber)) {
        // Check spot in front of pawn
        if (!board.isOccupied(this.letter, nextNumber)) {
            spaces.push(vec2(this.letter, nextNumber));
        }
        // If it hasn't moved, check two spaces in front
        nextNumber = nextNumber + direction;
        if (isInRange(nextNumber)) {
            if (this.firstMove) {
                if (!board.isOccupied(this.letter, nextNumber)) {
                    spaces.push(vec2(this.letter, nextNumber));
                }
            }
        }

        // Check if pawn can take piece
        nextNumber = this.number + direction;
        //side one
        var sideOneLetter = this.letter - 1;
        if (isInRange(sideOneLetter)) {
            if (isEnemy(board, sideOneLetter, nextNumber, this.isWhite)) {

                spaces.push(new vec2(sideOneLetter, nextNumber));

            }
        }
        //side two
        var sideTwoLetter = this.letter + 1;
        if (isInRange(sideTwoLetter)) {
            if (isEnemy(board, sideTwoLetter, nextNumber, this.isWhite)) {

                spaces.push(new vec2(sideTwoLetter, nextNumber));

            }
        }
    }

    return spaces;
};

Pawn.prototype.move = function (letter, number) {
    this.letter = letter;
    this.number = number;
    this.firstMove = false;
};

Pawn.prototype.symbol = function () {
    if (this.isWhite) {
        return this.symWhite;
    } else {
        return this.symBlack;
    }
};

function Knight(isWhite, letter, number) {
    this.model;
    this.isWhite = isWhite;
    this.letter = letter;
    this.number = number;
    this.symWhite = 'K';
    this.symBlack = 'k';

    this.moveSpots = [vec2(-1, 2), vec2(1, 2), vec2(2, 1), vec2(2, -1), vec2(1, -2), vec2(-1, -2), vec2(2, -1), vec2(-2, -1)];
}

Knight.prototype.canMove = function (board) {
    var spaces = [];

    for (var i = 0; i < this.moveSpots.length; i++) {

        var spotLet = this.letter + this.moveSpots[i][0];
        var spotNum = this.number + this.moveSpots[i][1];
        if (isInRange(spotLet) && isInRange(spotNum)) {
            if (!board.isOccupied(spotLet, spotNum) || isEnemy(board, spotLet, spotNum, this.isWhite)) {
                spaces.push(vec2(spotLet, spotNum));
            }
        }

    }//Check each spot

    return spaces;
};

Knight.prototype.move = function (letter, number) {
    this.letter = letter;
    this.number = number;
};

Knight.prototype.symbol = function () {
    if (this.isWhite) {
        return this.symWhite;
    } else {
        return this.symBlack;
    }
}; 