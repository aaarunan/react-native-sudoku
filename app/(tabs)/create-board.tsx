import {StyleSheet} from "react-native";

import {View} from "../../components/Themed";
import SudokuGrid from "../../components/SudokuGrid";
import InputControls from "../../components/Controls";
import {useState} from "react";
import {difficulties} from "../../types/Difficulty";
import {StoredBoard} from "../../types/board";
import {useStoredBoards} from "../../hooks/sudoku/useStoredBoards";
import {createEmptyNumberBoard} from "../../hooks/sudoku/sudoku";
import useSudoku from "../../hooks/sudoku/useSudoku";
import SudokuTopBar from "../../components/SudokuTopBar";
import SudokuBottomBar from "../../components/SudokuBottomBar";

export default function TabTwoScreen() {
    const [board] = useState<StoredBoard>({
        board: createEmptyNumberBoard(),
        solvedBoard: createEmptyNumberBoard(-1),
        difficulty: difficulties.EASY,
    } as StoredBoard);

    const sudoku = useSudoku(board);

    const [_, createNewBoard] = useStoredBoards();

    const [difficulty, setDifficulty] = useState<string>(difficulties.EASY);

    function handleOnCreate() {
        if (boardIsEmpty()) {
            alert("Board is empty");
            return;
        }
        try {
            createNewBoard(sudoku.board, difficulty);
        } catch (e) {
            alert(e);
        }
    }

    function boardIsEmpty() {
        if (!sudoku.board) {
            return true;
        }
        return sudoku.board.every((row) => {
            return row.every((cell) => {
                return cell.value === 0;
            });
        });
    }

    return (
        <View style={styles.container}>
            <SudokuTopBar difficulty={difficulty} onPickDifficulty={setDifficulty}/>
            <SudokuGrid
                grid={sudoku.board}
                selectedCell={sudoku.selectedCell}
                onCellClick={sudoku.changeSelectedCell}
            />
            <InputControls
                onClick={sudoku.setNewValueOnSelectedCell}
            />
            <SudokuBottomBar onClear={() => sudoku.setNewValueOnSelectedCell(0)} onCreate={handleOnCreate} creatorMode/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
