import { enqueueSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';

import { SEARCH_MESSAGE } from '../../../data/messages';

export interface Search {
  /* TODO: filter 추가 */
  categories: string[];
  seasons: string[];
  text: string;
}

export async function getSearchAPICall(values: Search) {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/search/`, values);
    if (response.status === 200) {
      const { searchResult } = response.data;
      sessionStorage.setItem('searchResult', searchResult);
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? SEARCH_MESSAGE.SEARCH_FAIL, { variant: 'error' });
    } else {
      enqueueSnackbar(SEARCH_MESSAGE.SEARCH_FAIL, { variant: 'error' });
    }
  }
}
