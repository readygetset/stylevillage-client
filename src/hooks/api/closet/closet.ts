import { enqueueSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';

import { CLOSET_MESSAGE } from '../../../data/messages';

interface GetClosetParams {
  closetId: number;
  token?: string;
}

interface User {
  id?: number;
  username: string;
  nickname?: string;
}

interface Closet {
  id?: number;
  name: string;
}

interface GetClosetClothes {
  id?: number;
  description?: string;
  category?: string;
  season?: string;
  status?: string;
  name: string;
  tag?: string;
  image?: string;
}

interface GetClosetListParams {
  token?: string;
}

export interface GetClosetResponse {
  id: number;
  name: string;
  owner: User;
  clothes: GetClosetClothes[];
}

export interface GetClosetListResponse {
  closets: Closet[];
}

export async function getClosetListAPICall({ token }: GetClosetListParams) {
  const bearerToken = token ? `Bearer ${token}` : null;
  try {
    const response = await axios.get<GetClosetListResponse>(`${process.env.REACT_APP_API_URL}/closet`, {
      headers: { Authorization: bearerToken },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? CLOSET_MESSAGE.CLOSETLIST_NOT_FOUND, { variant: 'error' });
    } else {
      enqueueSnackbar(CLOSET_MESSAGE.CLOSETLIST_NOT_FOUND, { variant: 'error' });
    }
  }
  return null;
}

export async function getClosetAPICall({ closetId, token }: GetClosetParams) {
  const bearerToken = token ? `Bearer ${token}` : null;
  try {
    const response = await axios.get<GetClosetResponse>(`${process.env.REACT_APP_API_URL}/closet/${closetId}`, {
      headers: { Authorization: bearerToken },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? CLOSET_MESSAGE.CLOSET_NOT_FOUND, { variant: 'error' });
    } else {
      enqueueSnackbar(CLOSET_MESSAGE.CLOSET_NOT_FOUND, { variant: 'error' });
    }
  }
  return null;
}
