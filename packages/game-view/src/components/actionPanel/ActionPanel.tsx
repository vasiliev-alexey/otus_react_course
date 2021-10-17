import React from 'react';
import ControlPanel from './ControlPanel';
import RotationPanel from './RotationPanel';
import GamePanel from './GamePanel';

const ActionPanel: React.FC = () => {
  return (
    <div className="actionPanel">
      <GamePanel />

      <div className="gameControls">
        <ControlPanel />
        <RotationPanel />
      </div>
    </div>
  );
};

export default ActionPanel;
