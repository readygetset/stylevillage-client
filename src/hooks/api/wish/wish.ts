import { enqueueSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';

import { WISH_MESSAGE } from '../../../data/messages';

interface WishAPIParams {
  clothesId: number;
  token: string;
}

export async function createWishAPICall({ clothesId, token }: WishAPIParams) {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/wish/${clothesId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status === 200) {
      enqueueSnackbar(WISH_MESSAGE.WISH_CREATED, { variant: 'success' });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? WISH_MESSAGE.WISH_FAIL, { variant: 'error' });
    } else {
      enqueueSnackbar(WISH_MESSAGE.WISH_FAIL, { variant: 'error' });
    }
  }
}

export async function deleteWishAPICall({ clothesId, token }: WishAPIParams) {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/wish/${clothesId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status === 200) {
      enqueueSnackbar(WISH_MESSAGE.WISH_DELETED, { variant: 'success' });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? WISH_MESSAGE.WISH_FAIL, { variant: 'error' });
    } else {
      enqueueSnackbar(WISH_MESSAGE.WISH_FAIL, { variant: 'error' });
    }
  }
}
