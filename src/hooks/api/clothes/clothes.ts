import { enqueueSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';

import { CLOTHES_MESSAGE } from '../../../data/messages';

interface GetClothesParams {
  clothesId: number;
  token?: string;
}
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
  closetId?: number;
}

export async function getClothesAPICall({ clothesId, token }: GetClothesParams) {
  const bearerToken = token ? `Bearer ${token}` : null;
  try {
    const response = await axios.get<GetClothesResponse>(`${process.env.REACT_APP_API_URL}/clothes/${clothesId}`, {
      headers: { Authorization: bearerToken },
    });
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

export async function deleteClothesAPICall({ clothesId, token }: GetClothesParams) {
  const bearerToken = token ? `Bearer ${token}` : null;
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/clothes/${clothesId}`, {
      headers: { Authorization: bearerToken },
    });
    if (response.status === 200) {
      enqueueSnackbar(CLOTHES_MESSAGE.CLOTHES_DELETED, { variant: 'success' });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? CLOTHES_MESSAGE.CLOTHES_NOT_FOUND, { variant: 'error' });
    } else {
      enqueueSnackbar(CLOTHES_MESSAGE.CLOTHES_NOT_FOUND, { variant: 'error' });
    }
  }
}
interface Clothes {
  category: string;
  season: string;
  status: string;
  isOpen: boolean;
  name: string;
  tag: string;
}
interface EditClothesParams {
  clothesId: number;
  token?: string;
  clothes: Clothes;
}
export async function editClothesAPICall({ clothesId, token, clothes }: EditClothesParams) {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/clothes/${clothesId}`, clothes, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      enqueueSnackbar(CLOTHES_MESSAGE.CLOTHES_EDITED, { variant: 'success' });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? CLOTHES_MESSAGE.CLOTHES_NOT_FOUND, { variant: 'error' });
    } else {
      enqueueSnackbar(CLOTHES_MESSAGE.CLOTHES_NOT_FOUND, { variant: 'error' });
    }
  }
}
