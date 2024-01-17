import { enqueueSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';

import { REVIEW_MESSAGE } from '../../../data/messages';

interface ModifyReviewParams {
  lendId: number;
  text: string;
  token?: string;
}
interface DeleteReviewParams {
  lendId: number;
  token?: string;
}

export async function modifyReviewAPICall({ lendId, text: review, token }: ModifyReviewParams) {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/review/${lendId}`,
      { review },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status === 200) {
      enqueueSnackbar(REVIEW_MESSAGE.REVIEW_EDITED, { variant: 'success' });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? REVIEW_MESSAGE.REVIEW_NOT_FOUND, { variant: 'error' });
    }
  }
  return null;
}

export async function deleteReviewAPICall({ lendId, token }: DeleteReviewParams) {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/review/${lendId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      enqueueSnackbar(REVIEW_MESSAGE.REVIEW_DELETED, { variant: 'success' });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? REVIEW_MESSAGE.REVIEW_NOT_FOUND, { variant: 'error' });
    } else {
      enqueueSnackbar(REVIEW_MESSAGE.REVIEW_NOT_FOUND, { variant: 'error' });
    }
  }
}
