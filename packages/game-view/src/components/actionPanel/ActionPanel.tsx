import React from 'react';
import ControlPanel from './ControlPanel';
import RotationPanel from './RotationPanel';
import GamePanel from './GamePanel';

type ActionPanelPropsType = {
  togglePause: () => void;
};

const ActionPanel: React.FC<ActionPanelPropsType> = ({ togglePause }) => {
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
