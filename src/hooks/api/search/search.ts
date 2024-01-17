import { enqueueSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';

import { SEARCH_MESSAGE } from '../../../data/messages';

interface Owner {
  id: number;
  nickname?: string;
  location?: string;
}
interface SearchClothesRes {
  id: number;
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
interface SearchRes {
  clothes: SearchClothesRes[];
}

// eslint-disable-next-line consistent-return
export async function getSearchAPICall(url: string) {
  try {
    const response = await axios.get<SearchRes>(`${process.env.REACT_APP_API_URL}${url}`);
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
}
