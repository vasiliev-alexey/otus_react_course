import React from 'react';
import { getColor } from '../utils';
import audio from '../../../../../../assets/sounds/clear.mp3';

type ScoreBoardProps = {
  nextPieceBlock: number[][];
  lines?: number;
  score?: number;
  level?: number;
};

function arraysAreIdentical(arrOne: number[][], arrTwo: number[][]): boolean {
  return (
    arrOne.length === arrTwo.length &&
    arrOne.every((value, index) => value === arrTwo[index])
  );
}

class ScoreBoard extends React.Component<ScoreBoardProps> {
  #audioWork: HTMLAudioElement;

  constructor(props: ScoreBoardProps) {
    super(props);
    this.#audioWork = new Audio(audio);
  }

  shouldComponentUpdate(nextProps: Readonly<ScoreBoardProps>): boolean {
    return (
      nextProps.lines != this.props.lines ||
      !arraysAreIdentical(nextProps.nextPieceBlock, this.props.nextPieceBlock)
    );
  }

  async componentDidUpdate(
    prevProps: Readonly<ScoreBoardProps>
  ): Promise<void> {
    if (prevProps.lines != this.props.lines) {
      await this.#audioWork.play();
    }
  }
  render(): React.ReactElement {
    const initTrs = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    const { nextPieceBlock, lines, score, level } = this.props;
    nextPieceBlock.map((r, ind) =>
      r.map((c, cInd) => {
        initTrs[ind][cInd] = c;
      })
    );

    return (
      <div style={{ marginLeft: '25px' }}>
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
        {/*<p>time: 00:55</p>*/}
        <p>sound: {true ? '🔇' : '🔊'}</p>
      </div>
    );
  }
}

export default ScoreBoard;
