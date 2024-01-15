import { enqueueSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';

import { SEARCH_MESSAGE } from '../../../data/messages';

export async function getSearchAPICall(url: string) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}${url}`);
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
