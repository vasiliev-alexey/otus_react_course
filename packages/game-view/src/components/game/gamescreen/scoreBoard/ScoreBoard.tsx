import React, { useEffect, useMemo, useState } from 'react';
import { getColor } from '../utils';
import audio from '../../../../../../assets/sounds/clear.mp3';

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
  const audioWork = useMemo(() => {
    return new Audio(audio);
  }, []);

  const [linesState, setLinesState] = useState(0);

  useEffect(() => {
    if (linesState !== (lines | 0)) {
      setLinesState(lines);
      audioWork.play();
    }
  }, [lines]);

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

export default React.memo(
  ScoreBoard,
  ({ nextPieceBlock: prev }, { nextPieceBlock: next }) =>
    next.every((value, index) => value === prev[index])
);
