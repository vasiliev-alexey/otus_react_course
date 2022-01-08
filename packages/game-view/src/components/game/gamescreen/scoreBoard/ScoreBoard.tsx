import React from 'react';

import { getColor } from '../utils';

type ScoreBoardProps = {
  nextPieceBlock: number[][];
  lines: number;
  score: number;
  level: number;
};

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  nextPieceBlock,
  lines,
  score,
  level,
}) => {
  const initTrs = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  nextPieceBlock.map((r, ind) =>
    r.map((c, cInd) => {
      initTrs[ind][cInd] = c;
    })
  );

  return (
    <div>
      <table className="next-piece-table">
        <tbody>
          {initTrs.map((row, rInd) => (
            <tr key={rInd}>
              {row.map((col, i) => (
                <td
                  className={'cell ' + getColor(col)}
                  key={rInd * 10 + i}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p>score: {score}</p>
      <p>level: {level}</p>
      <p>lines: {lines}</p>

      <p>sound: {true ? '🔇' : '🔊'}</p>
    </div>
  );
};

// export default React.memo(
//   ScoreBoard,
//   ({ nextPieceBlock: prev }, { nextPieceBlock: next }) =>
//     next.every((value, index) => (value + 0) === prev[index]))
// );

export default ScoreBoard;
