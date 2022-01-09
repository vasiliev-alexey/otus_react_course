import { AuthStateType } from '@store/authSlice';
import { RootState } from '@store/store';

export const authSelector = (state: RootState): AuthStateType => state.auth;
export const lineCountSelector = (state: RootState): number => state.game.lines;
