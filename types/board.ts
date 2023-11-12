export interface StoredBoard {
    board: number[][];
    solvedBoard: number[][];
    difficulty: string;
}

export interface Cell {
    value: number;
    isMarked: boolean;
}


export type SudokuBoard = Cell[][];