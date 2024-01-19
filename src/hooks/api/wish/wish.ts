import { enqueueSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';

import { UserClothes } from '../user/user';
import { Category, Season } from '../../../models/enum';
import { WISH_MESSAGE } from '../../../data/messages';

interface WishAPIParams {
  clothesId: number;
  token: string;
}

export interface WishClothes {
  id: number;
  owner: string;
  closetId?: number;
  category?: Category;
  season?: Season;
  status: string;
  isOpen: boolean;
  name: string;
  tag?: string;
  image?: string;
}

export async function createWishAPICall({ clothesId, token }: WishAPIParams) {
  const bearerToken = token ? `Bearer ${token}` : null;
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/wish/${clothesId}`,
      {},
      {
        headers: {
          Authorization: bearerToken,
        },
      },
    );
    if (response.status === 200) {
      enqueueSnackbar(WISH_MESSAGE.WISH_CREATED, { variant: 'success' });
    }
    return response;
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? WISH_MESSAGE.WISH_FAIL, { variant: 'error' });
    } else {
      enqueueSnackbar(WISH_MESSAGE.WISH_FAIL, { variant: 'error' });
    }
  }
  return null;
}

export async function deleteWishAPICall({ clothesId, token }: WishAPIParams) {
  const bearerToken = token ? `Bearer ${token}` : null;
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/wish/${clothesId}`,
      {},
      {
        headers: {
          Authorization: bearerToken,
        },
      },
    );
    if (response.status === 200) {
      enqueueSnackbar(WISH_MESSAGE.WISH_DELETED, { variant: 'success' });
    }
    return response;
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? WISH_MESSAGE.WISH_FAIL, { variant: 'error' });
    } else {
      enqueueSnackbar(WISH_MESSAGE.WISH_FAIL, { variant: 'error' });
    }
  }
  return null;
}

export async function getWishAPICall(token: string) {
  const bearerToken = token ? `Bearer ${token}` : null;
  try {
    const response = await axios.get<UserClothes[]>(`${process.env.REACT_APP_API_URL}/wish`, {
      headers: { Authorization: bearerToken },
    });
    if (response.status === 200) {
      // enqueueSnackbar(WISH_MESSAGE.WISH_GETSUCCESS, { variant: 'success' });
    }
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      // enqueueSnackbar(err.response?.data?.message ?? WISH_MESSAGE.WISH_FAIL, { variant: 'error' });
    } else {
      // enqueueSnackbar(WISH_MESSAGE.WISH_FAIL, { variant: 'error' });
    }
  }
  return null;
}

export async function getPopularClothesAPICall(token: string) {
  const bearerToken = token ? `Bearer ${token}` : null;
  try {
    const response = await axios.get<UserClothes[]>(`${process.env.REACT_APP_API_URL}/wish`, {
      headers: { Authorization: bearerToken },
    });
    if (response.status === 200) {
      // enqueueSnackbar(WISH_MESSAGE.WISH_GETSUCCESS, { variant: 'success' });
      console.log(response.data);
    }
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      // enqueueSnackbar(err.response?.data?.message ?? WISH_MESSAGE.WISH_FAIL, { variant: 'error' });
    } else {
      // enqueueSnackbar(WISH_MESSAGE.WISH_FAIL, { variant: 'error' });
    }
  }
  return null;
}
