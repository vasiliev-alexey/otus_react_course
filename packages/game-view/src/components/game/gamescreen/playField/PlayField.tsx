import React from 'react';

import { getColor } from '../utils';

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
              <td className={'cell ' + getColor(col)} key={rInd * 10 + i}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlayField;
