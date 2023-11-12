import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cell, StoredBoard, SudokuBoard } from "../types/board";
import exampleBoards from "../assets/boards";
import { isValidSudoku, solveSudoku } from "./useSudokuSolver";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export function mapToSudokuBoard(board: number[][]): Cell[][] {
  return board.map((row) => {
    return row.map((cell) => {
      return {
        value: cell,
        isMarked: false,
      } as Cell;
    });
  });
}

function mapToNumberBoard(board: SudokuBoard): number[][] {
  return board.map((row) => {
    return row.map((cell) => {
      return cell.value;
    });
  });
}

export function copyBoard(board: SudokuBoard): SudokuBoard {
  return board.map((row) => {
    return row.map((cell) => {
      return {
        value: cell.value,
        isMarked: cell.isMarked,
      } as Cell;
    });
  });
}

export function createEmptyBoard(): Cell[][] {
  return Array.from(Array(9), () => new Array(9).fill({
    value: 0,
    isMarked: false,
  } as Cell));
}

function filterBoardsByDifficulty(
  boards: StoredBoard[],
  difficulty: string | null | undefined
) {
  if (difficulty == null) return boards;
  return boards.filter((board) => board.difficulty === difficulty);
}

export function useStoredBoards(difficulty: string | undefined = undefined) {
  const [boards, setBoards] = useState<StoredBoard[]>([]);

  function createNewBoard(grid: SudokuBoard, difficulty: string) {

    const copy = grid.map((row) => {
      return row.map((cell) => {
        return cell.value;
      });
    });

    if (!isValidSudoku(copy)) {
      throw new Error("Invalid board");
    }
    const solved = solveSudoku(copy) as number[][];

    if (solved == null) {
      throw new Error("Invalid board");
    }
    const newBoards: StoredBoard[] = [
      ...boards,
      {
        board: mapToNumberBoard(grid),
        solvedBoard: solved,
        difficulty: difficulty,
      },
    ];

    setBoards(newBoards);
    saveBoards(newBoards);
  }

  async function getSavedBoards() {
    let value = null;
    try {
      value = await AsyncStorage.getItem("boards");
    } catch (e) {
      throw new Error("Error getting boards");
    }

    if (!value) return;

    const boards = JSON.parse(value) as StoredBoard[];

    const clean_boards =  filterBoardsByDifficulty(boards, difficulty);

    setBoards(clean_boards);
  }

  useEffect(() => {
    getSavedBoards();
  }, [difficulty]);

  useEffect(() => {
    getSavedBoards();
  }, []);

  async function saveBoards(board: StoredBoard[]) {
    if (boards)
      try {
        await AsyncStorage.setItem("boards", JSON.stringify(board));
        console.log("saved boards");
      } catch (e) {
        alert("Error saving boards");
      }
  }

  return [boards, createNewBoard] as const;
}

export async function checkIfStorageIsEmptyAndCreateBoards() {
  try {
    const data = await AsyncStorage.getItem("boards");
    if (data == null) {
      await AsyncStorage.setItem("boards", JSON.stringify(exampleBoards));
    }
  } catch (e) {
    console.log(e);
  }
}
