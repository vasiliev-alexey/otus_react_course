import React from 'react';

const PlayField: React.FC = () => {
  const cols = [...Array(10)].map(() => {
    return 0;
  });
  const rows = [...Array(20)].map(() => {
    return 0;
  });

  return (
    <table className="playground-table">
      {rows.map((r, rInd) => (
        <tr key={rInd}>
          {cols.map((e, i) => (
            <td className="cell" key={rInd * 10 + i}></td>
          ))}
        </tr>
      ))}
    </table>
  );
};

export default PlayField;
