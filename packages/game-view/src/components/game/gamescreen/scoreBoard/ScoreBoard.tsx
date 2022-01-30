import React from 'react';

import { getColor } from '../utils';

type ScoreBoardProps = {
  nextPieceBlock: number[][];
  lines: number;
  score: number;
  level: number;
  isBlur?: boolean;
};

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  nextPieceBlock,
  lines,
  score,
  level,
  isBlur = false,
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
      <table className={'next-piece-table ' + (isBlur && 'blur')}>
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

      <p data-testid="score-data">score: {score}</p>
      <p>level: {level}</p>
      <p>lines: {lines}</p>

      <p>sound: {'🔇'}</p>
    </div>
  );
};

export default ScoreBoard;
