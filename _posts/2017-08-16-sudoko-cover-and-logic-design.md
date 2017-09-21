---
layout: post
title: Sudoku, Covering Problems, and Logic Design Pt. 1
category: projects
comments: false
description: Part 1 in a series on NP-Complete Problems
tags:
    - Algorithms
    - Sudoku
    - NP-Complete
---

Since starting college, I’ve been flying more regularly between home and school. To pass some of that time, I started doing Sudoku puzzles, but I rather quickly moved from being interested in solving the puzzles themselves to being interesting in algorithms to generate and solve them.

### Constraints
- Start from an empty board when generating a puzzle.
    - While there are [numerous](http://ljkrakauer.com/Sudoku/transformations.htm) transformations that can be applied to a single solved puzzle to generate many "new" ones, doing so seems to defeat the idea of building a program that could generate a Sudoku puzzle as it requires that you already have one.
- Treat solving a puzzle the exact same as generating a new one.
    - Consider generation of a Sudoku puzzle to be the generalization of solving one.
- An algorithm that is functional and easily understandable.
    - Efficiency often comes at the price of readability, so for now readability is the priority. In the future, I may revisit this with a more sophisticated algorithm.


### Approach
There are many different [algorithmic](https://en.wikipedia.org/wiki/Sudoku_solving_algorithms) and [mathematical](https://en.wikipedia.org/wiki/Mathematics_of_Sudoku) approaches to Sudoku, but the depth-first backtracking algorithm seems to best fit the constraints. However, if there is one thing worth noting it is that Sudoku is [NP-Complete](https://en.wikipedia.org/wiki/NP-completeness) and as such, depth-first search will have an extremely large solution space to search.

1. Zero will represent an unassigned cell.
2. If the grid contains all zeros, a new Sudoku puzzle will be generated.
    1. Numbers 1-9 will be placed randomly in the first row.
3. If there is an existing puzzle, search for its solution.

### The Depth-First Backtracking Algorithm
1. Advancing row-wise from the top-left, place the lowest valid number into the cell.
2. Go to the next open cell.
3. If there are no valid numbers, go back to the previous cell and place the next smallest valid number.
4. If there is no valid number at this cell, delete its value and go back to the previous cell.

<div id="sudoku9" style=" margin-left:100px position:relative;">
    <script src="projects/sudoku9.js" type="text/javascript"></script>
</div>
<figcaption>
<strong>Figure 1: </strong>Generating a Sudoku puzzle using depth-first backtracking.
</figcaption>

The algorithm generates a solution from scratch in an acceptable time-frame. In this case, the algorithm finishes when it reaches a leaf at the bottom level of the tree (where all 81 numbers are placed.) However, when solving a given Sudoku puzzle, there (usually) just a single leaf that must be found. Furthermore, in this scenario there are certain nodes (valued cells) that must be part of the solution.

<div class="note alert">
**INFO:** There is still a bug on the site which only permits a single p5.js canvas to exist on a given page. The rest of the visuals here are .gif screen recordings of the relevant script.
</div>

<figure>
<img alt="sudoku9_solve" src="/resources/images/Sudoku/solve-existing.gif"/>
<figcaption>
<strong>Figure 2: </strong> Solving an existing Sudoku puzzle.
</figcaption>
</figure>

To further illustrate the limitations of the depth-first solution, I extended the code to allow for a 16x16 game of Sudoku (using hexadecimal for a bit of extra fun.) The extension from 9x9 to 16x16 expands the grid from 81 numbers to 256 numbers. This dramatically increases the size of the search tree and prevents the depth-first backtracking algorithm from generating a solution in any reasonable time-frame.


<figure>
<img alt="sudoku16" src="/resources/images/Sudoku/sudoku16.gif"/>
<figcaption>
<strong>Figure 3: </strong> Generating a 16x16 Sudoku Puzzle using depth-first backtracking.
</figcaption>
</figure>

Although "Hexadecimal" Sudoku may be rather useless, there are many engineering tasks that require solutions to large NP-Complete problems.
