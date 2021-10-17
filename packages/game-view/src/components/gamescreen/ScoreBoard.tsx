import React from 'react';

const ScoreBoard: React.FC = () => {
  const cols = [...Array(4)].map(() => {
    return 0;
  });
  const rows = [...Array(4)].map(() => {
    return 0;
  });

  return (
    <div>
      <table className="next-piece-table">
        {rows.map((r, rInd) => (
          <tr key={rInd}>
            {cols.map((e, i) => (
              <td className="cell" key={rInd * 10 + i}></td>
            ))}
          </tr>
        ))}
      </table>

      <p>score: 10000</p>
      <p>level: 10000</p>
      <p>lines: 10000</p>
      <p>time: 00:55</p>
    </div>
  );
};

export default ScoreBoard;
