var cell = [];
var stack = [];
var grid = [];

var sudoku9Pieces = [1,2,3,4,5,6,7,8,9];
var sudoku16Pieces = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
var Pieces;
var sudoku9 = [0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0,
               0, 0, 0, 0, 0, 0, 0, 0, 0];

var sudoku16 = [0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0,
                0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0,
                0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0,
                0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0,
                0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0,
                0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0,
                0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0,
                0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0,
                0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0,
                0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0,
                0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0,
                0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0,
                0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0,
                0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0,
                0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0,
                0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0, 0,];

var cellSize = 50;//px
var selection = 16; //9 for regular sudoku, 16 for hexadecimal sudoku

var maxVal;
var maxVal9 = 10; // strictly less than
var maxVal16 = 17; //strictly less than

var current;
var number = 1;

function setup()
{
    //setup for jekyll
    var sudoku16_canvasDiv = document.getElementById("sudoku16")
    var sudoku16_divWidth = document.getElementById("sudoku16").clientWidth;
    var sudoku16_sketchCanvas = createCanvas(802,802);
    sudoku16_sketchCanvas.parent("sudoku16");

    if(selection == 9)
    {
        grid = sudoku9;
        maxVal = maxVal9;
        Pieces = sudoku9Pieces;
    }
    else
    {
        grid = sudoku16;
        maxVal = maxVal16;
        Pieces = sudoku16Pieces;
    }

    var x = 0;
    var y = 0;
    for(var i=0; i < pow(selection,2); i++)
    {
        if(i % selection == 0 && i != 0)
        {
            y+=cellSize;
            x=0;
        }
        cell[i] = new Cell(x,y,i,grid[i]);
        x+= 50;
    }
    //determine if it is generating a puzzle or solving one
    var generate = sumGrid(grid, selection);
    if(generate == 0) //if there are no pieces in the grid
    {
        Pieces = shuffle(Pieces); //generate a new puzzle
        for(var j=0; j< selection; j++)
        {
            cell[j].num = Pieces[j];
        }
    }
    current = cell[0];

}

//Sum the values in the grid, if 0, empty grid.
function sumGrid(grid)
{
    var sum=0;
    for(var i=0; i < pow(selection,2); i++)
    {
        sum+= grid[i];
    }
    return sum;
}

function shuffle(array)
{
  var m = array.length, temp, idx;

  // While there remain elements to shuffle…
  while (m)
  {
    // Pick a remaining element…
    idx = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    temp = array[m];
    array[m] = array[idx];
    array[i] = temp;
  }

  return array;
}


function draw()
{
  background(252);

  for (var i = 0; i < pow(selection,2); i++)
  {
    cell[i].show();
  }

   //if the cell is empty
   if (current.num == 0)
   {
       //and the row, col, and square are valid for the given number
     if (checkColumn(current.i, number) && checkRow(current.i, number) && checkSquare(current.i, number) && number < maxVal)
     {
       current.num = number;        //place it
       stack.push(current);         //but remember it, if need to backtrack
       number = 0;
       current = cell[current.i+1];
     }
     else
     {
       if (number > maxVal-2)
       {
         current.num = 0;
         current = stack.pop();
         number = current.num;
         current.num = 0;
       }
     }
   }
   else
   {
     current = cell[current.i+1];
     number = 0;
   }

   number++;
}

function Cell(x,y,i,num)
{
    this.x = x;
    this.y = y;
    this.i = i;
    this.num = num;

    this.show = function()
    {
        noFill();
        stroke(0);
        rect(this.x,this.y,cellSize, cellSize);
        fill(0);
        textSize(32);
        var disp;

        if(this.num < 10)
        {
            disp = this.num;
        }
        switch(this.num)
        {
            case 10:
                disp = 'A';
                break;
            case 11:
                disp = 'B';
                break;
            case 12:
                disp = 'C';
                break;
            case 13:
                disp = 'D';
                break;
            case 14:
                disp = 'E';
                break;
            case 15:
                disp = 'F';
                break;
            case 16:
                disp = 0;
                break;
        }

        text(disp, x+17, y+40); //magic number x,y offsets for sudoku box and number alignment
    }
}

function checkSquare(i, num)
{
    var x = (i % selection);
    var y = floor(i / selection);

    //get the starting number of the relevant square
    i = i - (x % sqrt(selection));
    i = i - (y % sqrt(selection))*selection;

    //check the first row of this square
    for(var k=i; k< i+sqrt(selection); k++)
    {
        if(cell[k].num == num)
        {
            return 0;
        }
    }

    //check the second row of this square
    for (var k = i+selection; k < i+selection+sqrt(selection); k++)
    {
      if (cell[k].num == num)
      {
          return 0;
      }
    }

    //check the third row of this square
    for (var k = i+2*selection; k < i+2*selection+sqrt(selection); k++)
    {
      if (cell[k].num == num)
      {
        return 0;
      }
    }
    //account for 16x16, check the fourth row of this square
    if(selection == 16)
    {
        for( var k = i+3*selection; k < i+3*selection+sqrt(selection); k++)
        {
            if(cell[k].num == num)
            {
                return 0;
            }
        }
    }

    return 1;
}

function checkRow(i, num)
{
  //determine the number of the row
  var row = floor(i/selection)*selection;

  //search the row for any instances of this number
  for (var k = row; k < row+selection; k++)
  {
    if (cell[k].num == num)
    {
      return 0;
    }
  }
  return 1;
}

function checkColumn(i, num)
{
  //get the column number
  i = (i % selection);
  var col = i;

  //search the column for any instances of this number
  for (var k = i; k < i+selection; k++)
  {
    if (cell[col].num == num)
    {
      return 0;
    }
    col = col + selection;
  }
  return 1;
}
