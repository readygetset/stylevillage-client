import { enqueueSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';

import { USER_MESSAGE } from '../../../data/messages';

export interface UserClothes {
  id: number;
  closetId?: number;
  description?: string;
  category?: string;
  season?: string;
  status: string;
  isOpen: boolean;
  name: string;
  tag?: string;
  isWished: boolean;
  image?: string /* TODO: 백에서 정의하는 이름에 맞게 변경 */;
  ownerNickname: string;
}
export async function getUserClothesAPICall(userId: number) {
  try {
    const response = await axios.get<UserClothes[]>(`${process.env.REACT_APP_API_URL}/clothes/user/${userId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? USER_MESSAGE.USER_CLOTHES_NOT_FOUND, { variant: 'error' });
    } else {
      enqueueSnackbar(USER_MESSAGE.USER_CLOTHES_NOT_FOUND, { variant: 'error' });
    }
  }
  return null;
}
export interface UserProfile {
  username?: string;
  nickname?: string;
  location?: string;
  phoneNumber?: string;
}
export async function getUserProfileAPICall(userId: number) {
  try {
    const response = await axios.get<UserProfile>(`${process.env.REACT_APP_API_URL}/user/${userId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? USER_MESSAGE.USER_NOT_FOUND, { variant: 'error' });
    } else {
      enqueueSnackbar(USER_MESSAGE.USER_NOT_FOUND, { variant: 'error' });
    }
  }
  return null;
}
