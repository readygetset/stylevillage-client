import { enqueueSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';

import { SEARCH_MESSAGE } from '../../../data/messages';

interface Owner {
  id?: number;
  username: string;
  nickname?: string;
  location?: string;
}
interface SearchClothesRes {
  id?: number;
  closetId: number;
  category?: string;
  season?: string;
  status: string;
  isOpen: boolean;
  name: string;
  tag?: string;
  image?: string;
  owner: Owner;
  isWished: boolean;
}

export async function getSearchAPICall(url: string) {
  try {
    const response = await axios.get<SearchClothesRes[]>(`${process.env.REACT_APP_API_URL}${url}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? SEARCH_MESSAGE.SEARCH_FAIL, { variant: 'error' });
    } else {
      enqueueSnackbar(SEARCH_MESSAGE.SEARCH_FAIL, { variant: 'error' });
    }
  }
  return null;
}
