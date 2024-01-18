import { enqueueSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';

import { CLOSET_MESSAGE } from '../../../data/messages';

export interface Closet {
  id: number;
  name: string;
}

export interface Clothes {
  closet?: Closet;
  description?: string;
  category?: string;
  season?: string;
  status: string;
  isOpen: boolean;
  name: string;
  tag?: string;
  image?: string;
}

export async function getClosetListAPICall(token: string): Promise<Closet[] | null> {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/closet`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      enqueueSnackbar('옷장을 가져왔습니다.', { variant: 'success' });
      return response.data;
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? CLOSET_MESSAGE.GET_CLOSET_FAILED, { variant: 'error' });
    } else {
      enqueueSnackbar(CLOSET_MESSAGE.GET_CLOSET_FAILED, { variant: 'error' });
    }
  }
  return null;
}
