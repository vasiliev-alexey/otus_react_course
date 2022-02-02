import React from 'react';
const storyTitle = 'Панель  управляющих элементов';
import { Story } from '@storybook/react';
import { dummyAction, GAME_ROOT_ACTION_PANEL } from '@ui/storyStructure';

import ActionPanel from './ActionPanel';

export default {
  component: ActionPanel,
  title: `${GAME_ROOT_ACTION_PANEL}/${storyTitle}`,
};

export const SimpleUse: Story = () => (
  <div style={{ width: '600px' }}>
    <ActionPanel
      togglePause={dummyAction}
      right={dummyAction}
      isPause={false}
      reset={dummyAction}
      left={dummyAction}
      down={dummyAction}
      rotate={dummyAction}
    />
  </div>
);
