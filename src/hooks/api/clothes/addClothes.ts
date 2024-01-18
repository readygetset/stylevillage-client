import { enqueueSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';

import { Closet } from '../closet/getClosetList';
import { CLOTHES_MESSAGE } from '../../../data/messages';

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

interface PostClothes {
  clothes: Clothes;
  token: string;
}

export async function postClothesAPICall({ clothes, token }: PostClothes): Promise<boolean> {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/clothes`, clothes, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      enqueueSnackbar('옷이 등록되었습니다.', { variant: 'success' });
      return true;
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? CLOTHES_MESSAGE.ADD_CLOTHS_FAILED, { variant: 'error' });
    } else {
      enqueueSnackbar(CLOTHES_MESSAGE.ADD_CLOTHS_FAILED, { variant: 'error' });
    }
  }
  return false;
}
