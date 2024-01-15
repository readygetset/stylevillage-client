import { atom } from 'recoil';

import { UserStandard } from '../models/user';

export const userAtom = atom<UserStandard>({
  key: 'user',
  default: { id: 0, nickname: '' },
});
