import './Board.css';


interface BoardProps {
    boardState: string[];
    setBoardState: (boardState: string[]) => void;
}

export default function Board(props: BoardProps) {
    const tilesColors: { [key: string]: string } = {
        '': 'rgb(204, 192, 179)',
        '2': 'rgb(238, 228, 218)',
        '4': 'rgb(237, 224, 200)',
        '8': 'rgb(242, 177, 121)',
        '16': 'rgb(245, 149, 99)',
        '32': 'rgb(246, 124, 95)',
        '64': 'rgb(246, 94, 59)',
        '128': 'rgb(237, 207, 114)',
        '256': 'rgb(237, 204, 97)',
        '512': 'rgb(237, 200, 80)',
        '1024': 'rgb(237, 197, 63)',
        '2048': 'rgb(237, 194, 46)',
        '4096': 'rgb(237, 194, 46)',
        '8192': 'rgb(237, 194, 46)',
    };
    return (
        <div className='board'>
        {
            props.boardState.map((cell, cellIndex) => (
                <div key={cellIndex} className="row">
                    
                    {
                            <div 
                                key={cellIndex} className="cell" style={{backgroundColor: tilesColors[cell]}}
                                >
                                {cell}
                            </div>
                    }
                </div>
            ))
        }
        </div>
    )
}