import React from 'react';

type ScoreBoardProps = {
  gamefield: number[][];
};

const ScoreBoard: React.FC<ScoreBoardProps> = ({ gamefield }) => {
  return (
    <div>
      <table className="next-piece-table">
        <tbody>
          {gamefield.map((row, rInd) => (
            <tr key={rInd}>
              {console.log(row)}
              {row.map((col, i) => (
                <td
                  className={'cell' + (rInd === i ? ' cellRed' : '')}
                  key={rInd * 10 + i}
                >
                  {console.log(col)}
                  {col}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p>score: 10000</p>
      <p>level: 10000</p>
      <p>lines: 10000</p>
      <p>time: 00:55</p>
    </div>
  );
};

export default ScoreBoard;
