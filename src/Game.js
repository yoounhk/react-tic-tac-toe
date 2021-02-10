import React, {useState} from 'react';
import {calculateWinner} from './helper';
import Board from './Board';

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);
    const xO = xIsNext ? 'X' : 'O';

    const handleClick = (i) => {
        const historyPoint = history.slice(0, stepNumber + 1);
        const current = historyPoint[stepNumber];
        const squares = [...current];
        // return if won on occupied
        if (winner || squares[i]) return;
        // select square
        squares[i] = xO;
        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length);
        setXIsNext(!xIsNext);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

    const renderMoves = () => {
        history.map((_step, move) => {
            const destination = move ? `Go to move #${move}` : `Go to Start`;
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{destination}</button>
                </li>
            );
        })
    };

    return (
        <>
            <Board squares={history[stepNumber]} onClick={handleClick}/>
            <div className="info-wrapper">
                <h3>History</h3>
                {renderMoves()}
            </div>
            <h3>{winner ? `Winner: ${winner}` : `Next Player: ${xO}`}</h3>
        </>
    );
}