import {useEffect, useState} from "react";
import exampleBoards from "../../constants/exampleBoards";
import {StoredBoard, SudokuBoard} from "../../types/board";
import {filterBoardsByDifficulty, isValidSudoku, mapToNumberBoard, solveSudoku} from "./sudoku";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useStoredBoards(difficulty: string | undefined = undefined) {
    const [boards, setBoards] = useState<StoredBoard[]>([]);

    useEffect(() => {
        checkIfStorageIsEmptyAndCreateBoards();
    },[])

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

        const clean_boards = filterBoardsByDifficulty(boards, difficulty);

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
