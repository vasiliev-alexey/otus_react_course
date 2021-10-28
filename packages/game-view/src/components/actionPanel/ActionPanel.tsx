import React from 'react';
import ControlPanel from './controlPanel/ControlPanel';
import RotationPanel from './rotationPanel/RotationPanel';
import GamePanel, { GamePanelProps } from './gamePanel/GamePanel';

export type ActionPanelProps = GamePanelProps;

const ActionPanel: React.FC<ActionPanelProps> = ({ togglePause }) => {
  return (
    <div className="actionPanel">
      <GamePanel togglePause={togglePause} />

      <div className="gameControls">
        <ControlPanel />
        <RotationPanel />
      </div>
    </div>
  );
};

export default ActionPanel;
