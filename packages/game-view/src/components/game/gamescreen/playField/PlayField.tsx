import React from 'react';

import { getColor } from '../utils';

type ScoreBoardProps = {
  playField: number[][];
  isBlur?: boolean;
};

const PlayField: React.FC<ScoreBoardProps> = ({
  playField,
  isBlur = false,
}) => {
  return (
    <table className={'playground-table ' + (isBlur && 'blur')}>
      <tbody>
        {playField.map((row, rInd) => (
          <tr data-testid={`play-row-${rInd}`} key={rInd}>
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
