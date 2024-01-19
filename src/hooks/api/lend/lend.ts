import { enqueueSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';

import { LEND_MESSAGE } from '../../../data/messages';

interface User {
  id?: number;
  username: string;
  nickname?: string;
}

interface Clothes {
  id?: number;
  image?: string;
  name: string;
}

export interface GetLendsRes {
  id?: number;
  clothes?: Clothes;
  price: number;
  startDate: string;
  endDate: string;
  lender?: User;
  loanee?: User;
  review?: string;
}
export interface GetMyLendsResponse {
  lendsAsLender: GetLendsRes[];
  lendsAsLoanee: GetLendsRes[];
}

export async function getLendsAPICall(token?: string) {
  const bearerToken = token ? `Bearer ${token}` : null;
  try {
    const response = await axios.get<GetMyLendsResponse>(`${process.env.REACT_APP_API_URL}/lend`, {
      headers: { Authorization: bearerToken },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? LEND_MESSAGE.LEND_LIST_FAIL, { variant: 'error' });
    } else {
      enqueueSnackbar(LEND_MESSAGE.LEND_LIST_FAIL, { variant: 'error' });
    }
  }
  return null;
}
