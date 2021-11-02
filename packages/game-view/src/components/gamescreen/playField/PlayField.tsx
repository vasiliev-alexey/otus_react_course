import React from 'react';

type ScoreBoardProps = {
  playField: number[][];
};

const PlayField: React.FC<ScoreBoardProps> = ({ playField }) => {
  return (
    <table className="playground-table">
      <tbody>
        {playField.map((row, rInd) => (
          <tr key={rInd}>
            {row.map((col, i) => (
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
      </tbody>
    </table>
  );
};

export default PlayField;
