import React from "react";
import Board from "./Board/Board";

export default function App() {
    const [boardState, setBoardState] = React.useState(Array(16).fill(''));
    const [gameOver, setGameOver] = React.useState(false);


    function checkGameOver() {
        const boardCopy = [...boardState];
    
        // Check for any empty cells
        if (boardCopy.includes('')) {
            return false; // Game can continue
        }
    
        // Check for any adjacent cells with the same value
        for (let i = 0; i < 16; i++) {
            if (i % 4 !== 3 && boardCopy[i] === boardCopy[i + 1]) {
                return false; // Game can continue
            }
            if (i < 12 && boardCopy[i] === boardCopy[i + 4]) {
                return false; // Game can continue
            }
        }
    
        // No valid moves left, game over
        // setBoardState([...Array(16).fill('')]);
        // spawnTile();
        return true;
    }

    function handleUp() {
        const newBoardState: string[] = boardState;
        let moves = 0;
        for(let i = 0; i < 16; i++)  {
            if(newBoardState[i] !== '') {
                let j = i;
                while(j - 4 >= 0  && (newBoardState[j - 4] === '' || newBoardState[j - 4] === newBoardState[j])) {
                    if(newBoardState[j - 4] === '') {
                        newBoardState[j - 4] = newBoardState[j];
                        newBoardState[j] = '';
                        j -= 4;
                        moves++;
                    }
                    else if(newBoardState[j - 4] === newBoardState[j]) {
                        newBoardState[j - 4] = (parseInt(newBoardState[j - 4]) * 2).toString();
                        newBoardState[j] = '';
                        moves++;
                        break;
                        
                    }
                }
            }
        }
        if(moves === 0) return;
        setBoardState([...newBoardState]);
        spawnTile();
    }

    function handleDown() {
        const newBoardState: string[] = boardState;
        let moves = 0;
        for(let i = 15; i >= 0; i--)  {
            if(newBoardState[i] !== '') {
                let j = i;
                while(j + 4 <= 15  && (newBoardState[j + 4] === '' || newBoardState[j + 4] === newBoardState[j])) {
                    if(newBoardState[j + 4] === '') {
                        newBoardState[j + 4] = newBoardState[j];
                        newBoardState[j] = '';
                        j += 4;
                        moves++;
                    }
                    else if(newBoardState[j + 4] === newBoardState[j]) {
                        newBoardState[j + 4] = (parseInt(newBoardState[j + 4]) * 2).toString();
                        newBoardState[j] = '';
                        moves++;
                        break;
                        
                    }
                }
            }
        }
        if(moves === 0) return;
        setBoardState([...newBoardState]);
        spawnTile();
    }

    function handleLeft() {
        const newBoardState: string[] = boardState;
        let moves = 0;
        for(let i = 0; i < 16; i++)  {
            if(newBoardState[i] !== '') {
                let j = i;
                while(j % 4 !== 0 && (newBoardState[j - 1] === '' || newBoardState[j - 1] === newBoardState[j])) {
                    if(newBoardState[j - 1] === '') {
                        newBoardState[j - 1] = newBoardState[j];
                        newBoardState[j] = '';
                        j -= 1;
                        moves++;
                    }
                    else if(newBoardState[j - 1] === newBoardState[j]) {
                        newBoardState[j - 1] = (parseInt(newBoardState[j - 1]) * 2).toString();
                        newBoardState[j] = '';
                        moves++;
                        break;
                        
                    }
                }
            }
        }
        if(moves === 0) return;
        setBoardState([...newBoardState]);
        spawnTile();
    }

    function handleRight() {
        const newBoardState: string[] = boardState;
        let moves = 0;
        for(let i = 15; i >= 0; i--)  {
            if(newBoardState[i] !== '') {
                let j = i;
                while(j % 4 !== 3 && (newBoardState[j + 1] === '' || newBoardState[j + 1] === newBoardState[j])) {
                    if(newBoardState[j + 1] === '') {
                        newBoardState[j + 1] = newBoardState[j];
                        newBoardState[j] = '';
                        j += 1;
                        moves++;
                    }
                    else if(newBoardState[j + 1] === newBoardState[j]) {
                        newBoardState[j + 1] = (parseInt(newBoardState[j + 1]) * 2).toString();
                        newBoardState[j] = '';
                        moves++;
                        break;
                        
                    }
                }
            }
        }
        if(moves === 0) return;
        setBoardState([...newBoardState]);
        spawnTile();
    }

    function spawnTile() {
        const newBoardState: string[] = boardState;
        let a = Math.floor(Math.random() * 16);
        while(boardState[a] !== '') {
            a = Math.floor(Math.random() * 16);
        }
        newBoardState[a] = Math.floor(Math.random() * 10) == 0 ? '4' : '2';
        setBoardState([...newBoardState]);
    }

    const handleKeyboard = (event: KeyboardEvent) => {
        if (event.key === 'ArrowUp') {
            handleUp();
        }
        else if (event.key === 'ArrowDown') {
            handleDown();
        }
        else if (event.key === 'ArrowLeft') {
            handleLeft();
        }
        else if (event.key === 'ArrowRight') {
            handleRight();
        }
    }
    React.useEffect(() => {
        if(checkGameOver()) {
            setGameOver(true);
        }
    }, [boardState]);
    
    React.useEffect(() => {
        if(gameOver) {
            alert('Game Over');
            location.reload();
        }
    }, [gameOver]);

    React.useEffect(() => {
            document.addEventListener('keydown', handleKeyboard, false);


            return () => {            
                spawnTile();
                document.removeEventListener('keydown', handleKeyboard, false);
            }
    }, []);

    return (
        <Board boardState={boardState} setBoardState={setBoardState}/>
    )
}
