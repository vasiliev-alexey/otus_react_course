import React from 'react';

type ScoreBoardProps = {
  gamefield: number[][];
};

const PlayField: React.FC<ScoreBoardProps> = ({ gamefield }) => {
  return (
    <table className="playground-table">
      {gamefield.map((row, rInd) => (
        <tr key={rInd}>
          {row.map((e, i) => (
            <td
              className={
                'cell' +
                ((rInd + i - 3) % ((rInd + 7 + i) % 17) ? ' ' : ' cellRed')
              }
              key={rInd * 10 + i}
            >
              {0}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};

export default PlayField;
