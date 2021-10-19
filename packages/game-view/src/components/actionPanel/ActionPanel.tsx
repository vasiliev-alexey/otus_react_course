import React from 'react';
import ControlPanel from './ControlPanel';
import RotationPanel from './RotationPanel';
import GamePanel, { GamePanelProps } from './GamePanel';

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
