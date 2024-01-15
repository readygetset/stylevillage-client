import { enqueueSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';

import { CLOTHES_MESSAGE } from '../../../data/messages';

interface Reviewer {
  id?: number;
  username: string;
  nickname?: string;
}
interface Review {
  review: string;
  reviewer: Reviewer;
}
interface Owner {
  id?: number;
  nickname?: string;
  location?: string;
}
export interface GetClothesResponse {
  id: number;
  description: string;
  category: string;
  season: string;
  status: string;
  isOpen: boolean;
  name: string;
  tag: string;
  image: string;
  owner: Owner;
  review: Review[];
  isWished: boolean;
}

export async function getClothesAPICall(clothesId: number) {
  try {
    const response = await axios.get<GetClothesResponse>(`${process.env.REACT_APP_API_URL}/clothes/${clothesId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? CLOTHES_MESSAGE.CLOTHES_NOT_FOUND, { variant: 'error' });
    } else {
      enqueueSnackbar(CLOTHES_MESSAGE.CLOTHES_NOT_FOUND, { variant: 'error' });
    }
  }
  return null;
}
