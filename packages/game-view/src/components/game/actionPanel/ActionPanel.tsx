import React from 'react';
import ControlPanel, { ControlPanelProps } from './controlPanel/ControlPanel';
import RotationPanel, {
  RotationPanelProps,
} from './rotationPanel/RotationPanel';
import GamePanel, { GamePanelProps } from './gamePanel/GamePanel';

export interface ActionPanelProps
  extends GamePanelProps,
    ControlPanelProps,
    RotationPanelProps {}

const ActionPanel: React.FC<ActionPanelProps> = ({
  togglePause,
  reset,
  isPause,
  left,
  right,
  down,
  rotate,
}) => {
  return (
    <div className="actionPanel">
      <GamePanel togglePause={togglePause} isPause={isPause} reset={reset} />

      <div className="gameControls">
        <ControlPanel left={left} right={right} down={down} />
        <RotationPanel rotate={rotate} />
      </div>
    </div>
  );
};

export default ActionPanel;
