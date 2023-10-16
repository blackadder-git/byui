// https://content.byui.edu/file/cddfb9c0-a825-4cfe-9858-28d5b4c218fe/1/Ponder/124.11.Ponder.html
// https://www.geeksforgeeks.org/sudoku-backtracking-7/
// https://www.youtube.com/watch?v=FVvL0Wk1y5o

#include <iostream> // cin, cout
#include <iomanip>  // setw
#include <fstream>  // read, write files
using namespace std;

#define WALDO
#define COPILOTs
#define CHOOSE

/**************************************************************
 displayBoard - show the current game
*************************************************************/
void displayBoard(int board[9][9]) {

    // display board
    // cout << endl << size << " board\n"; 

     int rowNumber = 0;

    // begin each column with a letter
    cout << setw(4) << "0" // A
         << setw(2) << "1" // B
         << setw(2) << "2" // C
         << setw(2) << "3" // D
         << setw(2) << "4" // E
         << setw(2) << "5" // F
         << setw(2) << "6" // G
         << setw(2) << "7" // H
         << setw(2) << "8" // I
         << endl;

    // loop through each cell
    for (int row = 0; row < 9; row++) {
        // begin each row with a number
        cout << rowNumber << setw(3);

        for (int col = 0; col < 9; col++) {
            if (board[row][col] > 0)
                cout << board[row][col]; // write out number
            else
                cout << " "; // show nothing, cell contains 0

            if (col != 2 && col != 5 && col != 8)
                cout << setw(2); // default spacing

            else if (col == 2 || col == 5)
                cout << "|"; // separate columns

            else if (col == 8)
                cout << endl; // end current line
        }

        if (row == 2 || row == 5)
            cout << setw(21) << "-----+-----+-----\n"; // separate rows

        rowNumber++; // move to next row
    }
}

int countEmptyCells(int board[][9]) {
    int empty = 0;
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            if (board[i][j] == 0) {
                empty++;
            }
        }
    }
    return empty;
}


// look for two repeated numbers in the same big row or column
void ticTacToe(int row, int col, int board[][9]) {

}

// return the correct coordinate for the top left corner of the box
int getBoxCorner(int coordinate) {
    if (coordinate == 0 || coordinate == 1 || coordinate == 2)
        coordinate = 0;
    else if (coordinate == 3 || coordinate == 4 || coordinate == 5)
        coordinate = 3;
    else if (coordinate == 6 || coordinate == 7 || coordinate == 8)
        coordinate = 6;

    return coordinate;
}

// loop the 9 boxes where the cell resides, cross out numbers if they already exist
void getMissingBoxNumbers(int row, int col, int missing[9], int board[][9]) {
    int x = getBoxCorner(row);
    int y = getBoxCorner(col);
    int index = 0;
    int boxContains[9] = {}; // store values that are found in the box

    #ifdef WALDO
        displayBoard(board);
        cout << "CORNER[" << x << "][" << y << "]\n" ;
    #endif

    // always loop 3 accross and 3 down ...
    for (int i = 0; i < 3; i++) {
        #ifdef WALDO
            cout << "... ";
        #endif        
        for (int j = 0; j < 3; j++) {
            #ifdef WALDO
                cout << board[x][y];
            #endif

            boxContains[index] = board[x][y]; // store value
            y++; // move to next column
            index++;
        }
        #ifdef WALDO
            cout << endl;
        #endif
        x++; // go to next row
        y = y - 3; // rewind column and start again
    }

    for (int i = 0; i < 9; i++) {
        if (boxContains[i] > 0) {
            // if box contains 3
            missing[boxContains[i] - 1] = 0; // item exists in boxContains, remove from missing
        }
    }

    // show missing numbers
    #ifdef WALDO
        cout << "... Missing box numbers: ";
        for (int i = 0; i < 9; i++) {
            if (missing[i] > 0) {
                cout << missing[i] << ", ";
            }
        }
        cout << endl;
    #endif
}

bool isInRow(int number, int x, int y, int board[][9]) {
    for (int col = 0; col < 9; col++) {
        //cout << "is " << number << " in row: [" << x << "][" << col << "]" << endl; 
        if (board[x][col] == number) 
            return true;
    }
    return false;
}

bool isInColumn(int number, int x, int y, int board[][9]) {
     for (int row = 0; row < 9; row++) {
        //cout << "is " << number << " in column: [" << row << "][" << y << "]" << endl; 
        if (board[row][y] == number)
            return true;
    }
    return false;
}

// function will get the box corner of any cell
bool isInBox(int number, int X, int Y, int board[][9]) {
    int x = getBoxCorner(X);
    int y = getBoxCorner(Y);

    int index = 0;
    for (int i = 0; i < 3; i++) {
        for (int i = 0; i < 3; i++) {
            if (board[x][y] == number) {
                cout << "The box: board[" << x << "][" << y << "] has " << number << endl;
                return true;
            }
            y++;
            index++;
        }
        x++; // go to next row
        y = y - 3; // rewind column and start again
    }
    cout << "The box: board[" << x << "][" << y << "] does not have " << number << endl;
    return false;
}

int getMissingRowNumbers(int x, int board[][9]) {
    int count = 0;
    int number = -1;
    int missing[] = {1,2,3,4,5,6,7,8,9};
    int rowContains[9] = {}; // store values that are found in the row

    // always loop 9 accross ...
    for (int y = 0; y < 9; y++) {
        rowContains[y] = board[x][y]; // store row value
    }

    for (int i = 0; i < 9; i++) {
        if (rowContains[i] > 0) {
            missing[rowContains[i] - 1] = 0; // number exists in rowContains, remove from missing
        }
    }

    // figure out what values are missing
    for (int i = 0; i < 9; i++) {
        if (missing[i] > 0) {
            number = missing[i];
            count++;
        }
        if(count > 2)
            return -1; // more than one missing value
    }

    return number; // return single value missing from row
}

int getMissingColumnNumbers(int y, int board[][9]) {
    int count = 0;
    int number = -1;
    int missing[] = {1,2,3,4,5,6,7,8,9};
    int colContains[9] = {}; // store values that are found in the column

    // always loop 9 down ...
    for (int x = 0; x < 9; x++) {
        colContains[x] = board[x][y]; // store row value
    }

    for (int i = 0; i < 9; i++) {
        if (colContains[i] > 0) {
            missing[colContains[i] - 1] = 0; // number exists in colContains, remove from missing
        }
    }

    // figure out what values are missing
    for (int i = 0; i < 9; i++) {
        if (missing[i] > 0) {
            number = missing[i];
            count++;
        }
        if(count > 2)
            return -1; // more than one missing value
    }

    return number; // return single value missing from row
}

bool canGoHere(int number, int x, int y, int board[][9]) {
    bool inRow = false;
    bool inColumn = false;

    inRow = isInRow(number, x, y, board);
    if(inRow)
        cout << number << " is in inRow[" << x << "]" << endl;

    inColumn = isInColumn(number, x, y, board);
    if(inColumn)
        cout << number << " is in inColumn[" << y << "]" << endl;

    // cout << "inRow[" << x << "]: " << inRow << ", inColumn[" << y << "]: " << inColumn << endl;

    if (!inRow && !inColumn)
        return true;
    else
        return false;
}

// fill temp array with all values that can be had
int canHave(int x, int y, int temp[9], int board[][9]) {
    int count = 0;
    // count values 1 - 9 for a specific cell and collect all values that can go there
    for(int i = 1; i <= 9; i++) {
        // yes if the values is not in the row, column (or box)
        cout << i << endl;
        if (canGoHere(i, x, y, board)) {
            
            if(!isInBox(i, x, y, board)) {
                
                temp[i - 1] = i;
                count++;
            }
            else {
               cout << i << " can NOT go here, it is already in the box\n";
            }
        }
        else {
            cout << i << " can NOT go here, it is already in the row or column\n";
        }
    }

    for(int i = 0; i < 9; i++) {
        cout << temp[i] << " - ";
    }

    return count;
}

#define POINTEDPAIRCROSSHATCHx
// pick a number, cross out row and column, look for hidden singles that remain
void pointedPairCrossHatch(int row, int col, int board[][9], int pair, char direction) {
    // get numbers that can go in the current box
    int missing[] = {1,2,3,4,5,6,7,8,9};
    getMissingBoxNumbers(row, col, missing, board);

    // check each missing number, see how many times it can go into each empty space
    // loop missing values, can they go in this cell ?
    for (int i = 0; i < 9; i++) {
        if (missing[i] > 0) {
            int number = missing[i];

            // get the top left box corner of this cell
            int x = getBoxCorner(row);
            int y = getBoxCorner(col);

            #ifdef POINTEDPAIRCROSSHATCH
                cout << "\n\n********************************************************\n"
                        << "POINTED PAIR CROSSHATCH - "
                        << "does: " << number << " work in cell " 
                        << "[" << x << "][" << y << "]" 
                        << "?\n"
                        << "********************************************************\n";
            #endif

            int place = 0;
            int placeX = 0;
            int placeY = 0;

            // loop all cells in the corresponding box based on the ROW and COL received
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    #ifdef POINTEDPAIRCROSSHATCH
                        cout << "checking coordinates [" << x << "][" << y << "]" << endl;
                    #endif

                    // does cell in box contain a number?
                    if (board[x][y] > 0) {
                        #ifdef POINTEDPAIRCROSSHATCH
                        cout << "... this cell contains: " << board[x][y] << endl;
                        #endif
                    }
                    else {
                        #ifdef POINTEDPAIRCROSSHATCH
                        cout << "... this cell is empty: " << endl;
                        #endif
                        bool canPlace = false;
                        bool inRow = false;
                        bool inColumn = false;

                        // when pair matches the number
                        if (pair == number) {
                            if (direction == 'v') {
                                inRow = false; // don´t check the horizontal
                                inColumn = isInColumn(number, x, y, board);
                            }
                            else {
                                inRow = isInRow(number, x, y, board);
                                inColumn = false; // don´t check the vertical
                            }

                            if (!inRow && !inColumn)
                                canPlace = true;
                        }
                        // this is where the magic happens, determine whether the number can work in the cell
                        else
                            canPlace = canGoHere(number, x, y, board);
                        
                        if (canPlace) {
                            cout << number << " can go here\n";
                            place++;
                            placeX = x;
                            placeY = y;
                        }
                        else {
                            displayBoard(board);
                            cout << number << " does not go here\n";
                        }
                    }
                    y++;
                    // index++;
                }
                x++; // go to next row
                y = y - 3; // rewind column and start again
                cout << endl;
            }

            // when the number can only go 1 place, add it to the board
            if (place == 1) {
                #ifdef POINTEDPAIRCROSSHATCH
                    cout << "\n\n********************************************\n"
                        << "CROSSHATCH POINTED PAIR: " << number << " CAN GO HERE: [" << placeX << "][" << placeY << "]"
                        << "\n********************************************\n";
                #endif
                displayBoard(board);
                #ifdef POINTEDPAIRCROSSHATCH
                    char temp = '?';
                    cout << "continue ...\n";
                    //cin.clear(); //clear bad input flag
                    //cin.ignore(); //discard input 
                    cin >> temp;
                #endif

                board[placeX][placeY] = number;
            }
            else {
                cout << "place = " << place << endl;
            }
        }
        //else {
            // this number is already represented in the box
        //}
    }
}

#define CROSSHATCHBOX
void crossHatchBox(int number, int x, int y, int board[][9]) {

    int place = 0;
    int placeX = 0;
    int placeY = 0;

    int index = 0;
    // loop all cells in the box based on the ROW and COL received
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            #ifdef CROSSHATCHBOX
                cout << endl << ++index << ". checking coordinates [" << x << "][" << y << "]";
            #endif

            // does cell in box contain a number?
            if (board[x][y] > 0) {
                #ifdef CROSSHATCHBOX
                cout << "\n... this cell contains: " << board[x][y];
                #endif
            }
            else {
                #ifdef CROSSHATCHBOX
                cout << "\n... this cell is empty: ";
                #endif

                // this is where the magic happens, determine whether the number can work in the cell
                if (canGoHere(number, x, y, board)) {
                    #ifdef CROSSHATCHBOX
                        cout << number << " can go here";
                    #endif
                    place++;
                    placeX = x; // record row placement
                    placeY = y; // record column placement
                }
                else {
                    #ifdef CROSSHATCHBOX
                        cout << number << " can not go here";
                    #endif
                }
            }
            y++;
        }
        x++; // go to next row
        y = y - 3; // rewind column and start again
        #ifdef CROSSHATCHBOX
            cout << "\n\n--------------------------\n";
        #endif
    }

    // this runs after each missing number has looped the box, when the number can only go 1 place, add it to the board
    if (place == 1) {
        #ifdef CROSSHATCHBOX
            cout << "\n********************************************\n"
                << "YES, CROSSHATCH BOX: " << number << " CAN GO IN: [" << placeX << "][" << placeY << "]"
                << "\n********************************************\n";
                displayBoard(board);
        #endif
        #ifdef CROSSHATCHBOX
            char temp = '?';
            cout << "continue ...\n";
            //cin.clear(); //clear bad input flag
            //cin.ignore(); //discard input 
            cin >> temp;
        #endif
        board[placeX][placeY] = number;
    }
    else {
        #ifdef CROSSHATCHBOX
            cout << "\n********************************************\n"
                << "NO, CROSSHATCH BOX: " << number << " IS NOT A HIDDEN SINGLE, IT CAN BE PLACED " << place << " times"
                << "\n********************************************\n";                
        #endif
    }
}


#define POINTEDPAIRx
void pointingPairs(int row, int col, int board[][9]) {
    // get numbers that can go in the current box
    int missing[] = {1,2,3,4,5,6,7,8,9};
    getMissingBoxNumbers(row, col, missing, board);

    // check each missing number, see how many times it can go into each empty space
    // loop missing values, can they go in this cell ?
    for (int i = 0; i < 9; i++) {
        if (missing[i] > 0) {
            int number = missing[i];

            // get the top left box corner of this cell
            int x = getBoxCorner(row);
            int y = getBoxCorner(col);

            #ifdef POINTEDPAIR
                cout << "\n\n********************************************************\n"
                        << "POINTED PAIR - "
                        << "does: " << number << " work in cell " 
                        << "[" << x << "][" << y << "]" 
                        << "?\n"
                        << "********************************************************\n";
            #endif

            int place = 0;
            int placeX = 0;
            int placeY = 0;
            int placeX2 = 0;
            int placeY2 = 0;

            // loop all cells in the corresponding box based on the ROW and COL received
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    #ifdef POINTEDPAIR
                        cout << "checking coordinates [" << x << "][" << y << "]" << endl;
                    #endif

                    // does cell in box contain a number?
                    if (board[x][y] > 0) {
                        #ifdef POINTEDPAIR
                        cout << "... this cell contains: " << board[x][y] << endl;
                        #endif
                    }
                    else {
                        #ifdef POINTEDPAIR
                        cout << "... this cell is empty: " << endl;
                        #endif

                        // this is where the magic happens, determine whether the number can work in the cell
                        if (canGoHere(number, x, y, board)) {
                            cout << number << " can go here\n";
                            place++;
                            if (place == 1) {
                                placeX = x;
                                placeY = y;
                            }
                            if (place == 2) {
                                placeX2 = x;
                                placeY2 = y;
                            }
                        }
                        else {
                            displayBoard(board);
                            cout << number << " does not go here\n";
                        }
                    }
                    y++;
                    // index++;
                }
                x++; // go to next row
                y = y - 3; // rewind column and start again
                cout << endl;
            }


            // is pair in same row or column ?
            char direction = (placeX == placeX2) ? 'h' : ((placeY == placeY2) ? 'v' : '?');

            // when the number can only go 1 place, add it to the board
            if (place == 2 && direction != '?') {
                #ifdef POINTEDPAIR
                    cout << "\n\n********************************************\n"
                        << "POINTED (" << (char)toupper(direction) << ") PAIR: " << number << " CAN GO HERE: [" << placeX << "][" << placeY << "] AND [" << placeX2 << "][" << placeY2 << "]"
                        << "\n********************************************\n";
                #endif

                board[placeX][placeY] = number;
                board[placeX2][placeY2] = number;

                displayBoard(board);

                // have h or v pair
                if (direction == 'h') {
                    cout << "horizontal\n";

                    int cornerX = getBoxCorner(placeX);
                    for (int cornerY = 0; cornerY < 9; cornerY += 3) {
                        cout << "corner[" << cornerX << "][" << cornerY << "]\n";
                    
                        // try all three boxes along the same row
                        if (isInBox(number, cornerX, cornerY, board)) {
                            cout << "YES, " << number << " is in: corner[" << cornerX << "][" << cornerY << "]\n";
                        }
                        else {
                            cout << "NO, " << number << " is not in: corner[" << cornerX <<  "][" << cornerY << "]\n";

                            crossHatchBox(number, cornerX, cornerY, board);

                            // check rows for only one spot

                        }
                    }
                }
                else {
                    cout << "vertical\n";

                    int cornerY = getBoxCorner(placeY);
                    for (int cornerX = 0; cornerX < 9; cornerX += 3) {
                        cout << "corner[" << cornerX << "][" << cornerY << "], ";

                        // try all three boxes along the same column
                        if (isInBox(number, cornerX, cornerY, board)) {
                            cout << "YES, " << number << " is in: corner[" << cornerX << "][" << cornerY << "]\n";
                        }
                        else {
                            cout << "NO, " << number << " is not in: corner[" << cornerX << "][" << cornerY << "]\n";

                            crossHatchBox(number, cornerX, cornerY, board);
                        }
                    }

                }

                #ifdef POINTEDPAIR
                    char temp = '?';
                    cout << "continue ...\n";
                    //cin.clear(); //clear bad input flag
                    //cin.ignore(); //discard input 
                    cin >> temp;
                #endif

                // get other two corners

                // get second box
                board[placeX][placeY] = 0;
                board[placeX2][placeY2] = 0;


                /*
                board[placeX][placeY] = number;
                board[placeX2][placeY2] = number;


                // if number can not go in either pointed pair cell it may be a hidden single


                if (!canGoHere(number, placeX, placeY, board) && !canGoHere(number, placeX2, placeY2, board)) {

                    if (direction == 'h') {
                        for (int i = 0; i < 3; i++){
                            //x + i = row
                            if(isInRow(number, x + i, placeY, board)) {
                            
                            }
                        }
                    }
                    else {
                        for (int i = 0; i < 3; i++){
                            //y + i = column

                        }
                    }

                    // x, y = current box corner
                    // column is always going to be the same, 0, 3, 6

                    #ifdef POINTEDPAIR
                        char temp = '?';
                        cout << "continue ...\n";
                        //cin.clear(); //clear bad input flag
                        //cin.ignore(); //discard input 
                        cin >> temp;
                    #endif

                    //pointedPairCrossHatch(row, col, board, number, direction);
                }

                // remove the pointing pair
                board[placeX][placeY] = 0;
                board[placeX2][placeY2] = 0;
                */
            }
            else {
                cout << "place = " << place << endl;
            }
        }
        //else {
            // this number is already represented in the box
        //}
    }
}

// This function loops all missing numbers for a cell
#define CROSSHATCHx
// pick a number, cross out row and column, look for hidden singles that remain
void crossHatch(int row, int col, int board[][9]) {
    // get numbers that can go in the current box
    int missing[] = {1,2,3,4,5,6,7,8,9};
    getMissingBoxNumbers(row, col, missing, board);

    // check each missing number, see how many times it can go into each empty space
    // loop missing values, can they go in this cell ?
    for (int i = 0; i < 9; i++) {
        if (missing[i] > 0) {
            int number = missing[i];

            // get the top left box corner of this cell
            int x = getBoxCorner(row);
            int y = getBoxCorner(col);

            #ifdef CROSSHATCH
                cout << "\n\n********************************************************\n"
                        << "CROSSHATCH - "
                        << "does: " << number << " work in box " 
                        << "[" << x << "][" << y << "] / [" << row << "][" << col << "]"  
                        << "?\n";
                        for (int miss = 0; miss < 9; miss++) {
                            if (missing[miss] > 0) {
                                if (missing[miss] == number)
                                    cout << " * [" << missing[miss] << "]";
                                else
                                    cout << " * " << missing[miss];
                            }
                        }
                        cout << "\n********************************************************\n";
            #endif

            // start a fresh placement with each loop of the box
            int place = 0;
            int placeX = 0;
            int placeY = 0;

            int index = 0;
            // loop all cells in the box based on the ROW and COL received
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    #ifdef CROSSHATCH
                        cout << endl << ++index << ". checking coordinates [" << x << "][" << y << "]";
                    #endif

                    // does cell in box contain a number?
                    if (board[x][y] > 0) {
                        #ifdef CROSSHATCH
                        cout << "\n... this cell contains: " << board[x][y];
                        #endif
                    }
                    else {
                        #ifdef CROSSHATCH
                        cout << "\n... this cell is empty: ";
                        #endif

                        // this is where the magic happens, determine whether the number can work in the cell
                        if (canGoHere(number, x, y, board)) {
                            #ifdef CROSSHATCH
                                cout << number << " can go here";
                            #endif
                            place++;
                            placeX = x; // record row placement
                            placeY = y; // record column placement
                        }
                        else {
                            #ifdef CROSSHATCH
                                cout << number << " can not go here";
                            #endif
                        }
                    }
                    y++;
                }
                x++; // go to next row
                y = y - 3; // rewind column and start again
                #ifdef CROSSHATCH
                    cout << "\n\n--------------------------\n";
                #endif
            }

            // this runs after each missing number has looped the box, when the number can only go 1 place, add it to the board
            if (place == 1) {
                #ifdef CROSSHATCH
                    cout << "\n********************************************\n"
                        << "YES, CROSSHATCH: " << number << " CAN GO IN: [" << placeX << "][" << placeY << "]"
                        << "\n********************************************\n";
                        displayBoard(board);
                #endif
                #ifdef CROSSHATCH
                    char temp = '?';
                    cout << "continue ...\n";
                    //cin.clear(); //clear bad input flag
                    //cin.ignore(); //discard input 
                    cin >> temp;
                #endif
                board[placeX][placeY] = number;
            }
            else {
                #ifdef CROSSHATCH
                    cout << "\n********************************************\n"
                        << "NO, CROSSHATCH: " << number << " IS NOT A HIDDEN SINGLE, IT CAN BE PLACED " << place << " times"
                        << "\n********************************************\n";                
                #endif
            }

        }
        //else {
            // this number is already represented in the box
        //}
    }
}

void loopBoard2(int board[][9]) {
    int loop = 0;
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
                // not empty
            #ifdef WALDO
                cout << "\n\n********************************************\n"
                     << ++loop << " LOOP BOARD - "
                     << "CELL[" << row << "][" << col << "] = " << board[row][col] << endl
                     << "********************************************\n";
            #endif
            if (board[row][col] > 0) {
                #ifdef WALDO
                    cout << "CELL IS ALREADY FILLED\n";
                #endif
                int number = board[row][col];
            }
            else {
                // cell is empty, send coordinates
                pointingPairs(row, col, board);
            }
            #ifdef COPILOT
                char temp = '?';
                cout << "continue ...\n";
                //cin.clear(); //clear bad input flag
                //cin.ignore(); //discard input 
                cin >> temp;
            #endif                
        }
    }
}

void missingRows(int row, int col, int board[][9]) {
    int missing = getMissingRowNumbers(row, board);

    if (missing > 0) {
        board[row][col] = missing;
    }
}

void missingColumns(int row, int col, int board[][9]) {
    int missing = getMissingColumnNumbers(col, board);

    if (missing > 0) {
        board[row][col] = missing;
    }
}

#define HIDDENSINGLE
void hiddenSingle(int row, int col, int board[][9]) {
    // get numbers that are missing from the current box
    int missing[] = {1,2,3,4,5,6,7,8,9};
    getMissingBoxNumbers(row, col, missing, board);

    #ifdef HIDDENSINGLE
        cout << "\n\n********************************************\n"
                << "HIDDENSINGLE - "
                << "CELL[" << row << "][" << col << "] = " << board[row][col] << endl
                << "********************************************\n";
    #endif
    // get corners
    int x = getBoxCorner(row);
    int y = getBoxCorner(col);

    // fill the box with 9 coordinates that point to the values they can hold
    int *box[9][9] = {0,0,0,0,0,0,0,0,0};

    // loop all cells in box
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            cout << "checking coordinates [" << x << "][" << y << "]" << endl;
            int temp[] = {0,0,0,0,0,0,0,0,0};

            // if space is empty
            if (board[x][y] == 0) {
                // this cell already has a value, it can not have any more
                int have = canHave(x, y, temp, board);
                if (have == 1) {
                    for (int z = 0; z < 9; z++) {
                        if (temp[z] > 0) {
                            cout << "HOLY GRAIL: " << temp[z] << " can only go in [" << x <<  "][" << y << "]\n";
                            board[x][y] = temp[z];
                        }
                    }
            char next;
            cout << "continue ...\n";
            //cin.clear(); //clear bad input flag
            //cin.ignore(); //discard input 
            cin >> next;                    
                }
                else {
                    cout << "\n****************************************\n ";
                    displayBoard(board);
                    cout << "These values can go here ...\n";

                    // see what values can go in cell
                    for (int z = 0; z < 9; z++) {
                        cout << temp[z] << ", ";
                    }
                    cout << "\n****************************************\n ";
                }
            }
            else {
                cout << "cell contains: " << board[x][y] << endl;
            }
            y++;
            // index++;
        }
        x++; // go to next row
        y = y - 3; // rewind column and start again
    }
}

// moves left to right, top to bottom
void loopBoard(int board[][9]) {
    int loop = 0;
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
                // not empty
            #ifdef WALDO
                cout << "\n\n********************************************\n"
                     << ++loop << " LOOP BOARD - "
                     << "CELL[" << row << "][" << col << "] = " << board[row][col] << endl
                     << "********************************************\n";
            #endif
            if (board[row][col] > 0) {
                #ifdef WALDO
                    cout << "CELL IS ALREADY FILLED\n";
                #endif
                int number = board[row][col];
            }
            else {
                // cell is empty, send coordinates, 
                crossHatch(row, col, board);
                //missingRows(row, col, board);
                //missingColumns(row, col, board);
                pointingPairs(row, col, board);
                hiddenSingle(row, col, board);
            }
            #ifdef COPILOT
                char temp = '?';
                cout << "continue ...\n";
                //cin.clear(); //clear bad input flag
                //cin.ignore(); //discard input 
                cin >> temp;
            #endif                
        }
    }
}



int main() 
{
    //int size = readFile(board);

    // hardest
 
    int board[9][9] = {{0, 0, 0,   0, 0, 0,   0, 0, 0},
                       {0, 0, 0,   0, 0, 3,   0, 8, 5},
                       {0, 0, 1,   0, 2, 0,   0, 0, 0},
                       
                       {0, 0, 0,   5, 0, 7,   0, 0, 0},
                       {0, 0, 4,   0, 0, 0,   1, 0, 0},
                       {0, 9, 0,   0, 0, 0,   0, 0, 0},
                       
                       {5, 0, 0,   0, 0, 0,   0, 7, 3},
                       {0, 0, 2,   0, 1, 0,   0, 0, 0},
                       {0, 0, 0,   0, 4, 0,   0, 0, 9}};
 
   /*
    int board[9][9] = {{0, 0, 0,   0, 5, 4,   0, 2, 1},
                       {0, 0, 0,   1, 7, 3,   0, 8, 5},
                       {0, 5, 1,   0, 2, 0,   0, 0, 0},
                       
                       {1, 0, 0,   5, 0, 7,   0, 0, 0},
                       {0, 0, 4,   0, 0, 0,   1, 5, 0},
                       {0, 9, 5,   4, 0, 1,   0, 0, 0},
                       
                       {5, 1, 0,   0, 0, 0,   4, 7, 3},
                       {0, 0, 2,   0, 1, 0,   5, 6, 8},
                       {0, 0, 0,   0, 4, 5,   2, 1, 9}};*/                   

    // hard
    /*
    int board[9][9] = {{8, 5, 0,   0, 0, 2,   4, 0, 0},
                       {7, 2, 0,   0, 0, 0,   0, 0, 9},
                       {0, 0, 4,   0, 0, 0,   0, 0, 0},
                       
                       {0, 0, 0,   1, 0, 7,   0, 0, 2},
                       {3, 0, 5,   0, 0, 0,   9, 0, 0},
                       {0, 4, 0,   0, 0, 0,   0, 0, 0},
                       
                       {0, 0, 0,   0, 8, 0,   0, 7, 0},
                       {0, 1, 7,   0, 0, 0,   0, 0, 0},
                       {0, 0, 0,   0, 3, 6,   0, 4, 0}};*/


    int size = 81;

    if (size > 0) {
        int x = -1;
        int y = -1;

        bool play = true;
        char option = '?';
        while (play) 
        {
            displayBoard(board);
            loopBoard(board); // crosshatch
            //loopBoard2(board); // pointed pairs

            //cout << "Row is missing: " <<  getMissingRowNumbers(3, board);
            //cout << "\nCol is missing: " <<  getMissingColumnNumbers(2, board);

            displayBoard(board);
            cout << "\n\nEmpty cells: " << countEmptyCells(board);
            cout << "\nENDGAME - Continue (y/n): ";
            cin >> option;
            cin.clear(); //clear bad input flag
            cin.ignore(); //discard input 
            option = tolower(option);
            // cout << option;
            if (option == 'n')
                play = false;
        }

        //cout << "\nThe board is filled: " << isValidBoard(board);
    }

    system("pause");
    return 0;
}