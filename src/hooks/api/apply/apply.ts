import { enqueueSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';

import { APPLY_MESSAGE } from '../../../data/messages';

interface Clothes {
  id?: number;
  name?: string;
  image?: string;
}
interface User {
  id?: number;
  nickname?: string;
}
export interface GetArrivedAppliesResponse {
  id?: number;
  clothes: Clothes;
  user: User;
  detail?: string;
}

export async function getArriveAppliesAPICall(token: string) {
  const bearerToken = token ? `Bearer ${token}` : null;
  try {
    const response = await axios.get<GetArrivedAppliesResponse[]>(`${process.env.REACT_APP_API_URL}/apply`, {
      headers: { Authorization: bearerToken },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? APPLY_MESSAGE.APPLY_FAIL, { variant: 'error' });
    } else {
      enqueueSnackbar(APPLY_MESSAGE.APPLY_FAIL, { variant: 'error' });
    }
  }
  return null;
}
export interface Lend {
  clothes?: number;
  price?: number;
  startDate?: Date;
  endDate?: Date;
  lender: number;
  loanee?: number;
  review?: string;
}
interface CreateLendParams {
  lend: Lend;
  token: string;
}

export async function createLendAPICall({ lend, token }: CreateLendParams) {
  const bearerToken = token ? `Bearer ${token}` : null;
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/lend`, lend, {
      headers: { Authorization: bearerToken },
    });
    if (response.status === 200) {
      enqueueSnackbar(`대여가 등록되었습니다`, { variant: 'success' });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? APPLY_MESSAGE.LEND_CREATE_FAIL, { variant: 'error' });
    } else {
      enqueueSnackbar(APPLY_MESSAGE.LEND_CREATE_FAIL, { variant: 'error' });
    }
    throw err;
  }
}

interface AcceptApplyParams {
  applyId?: number;
  token: string;
  lend: Lend;
}

export async function acceptApplyAPICall({ applyId, lend, token }: AcceptApplyParams) {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/apply/${applyId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (response.status === 200) {
      createLendAPICall({ lend, token });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? APPLY_MESSAGE.LEND_CREATE_FAIL, { variant: 'error' });
    } else {
      enqueueSnackbar(APPLY_MESSAGE.LEND_CREATE_FAIL, { variant: 'error' });
    }
    throw err;
  }
}

interface RejectApplyParams {
  applyId?: number;
  token?: string;
}

export async function rejectApplyAPICall({ applyId, token }: RejectApplyParams) {
  const bearerToken = token ? `Bearer ${token}` : null;
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/apply/${applyId}`,
      {},
      {
        headers: { Authorization: bearerToken },
      },
    );
    if (response.status === 200) {
      enqueueSnackbar(`대여 신청이 거절되었습니다`, { variant: 'success' });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? APPLY_MESSAGE.APPLY_REJECT_FAIL, { variant: 'error' });
    } else {
      enqueueSnackbar(APPLY_MESSAGE.APPLY_REJECT_FAIL, { variant: 'error' });
    }
    throw err;
  }
}

interface User {
  id?: number;
  username: string;
  nickname?: string;
}
interface SendedApplyClothes {
  id?: number;
  name: string;
  image?: string;
}

export interface GetSendedUserApplyRes {
  id?: number;
  clothes?: SendedApplyClothes;
  owner?: User;
  isAccepted: boolean;
  isRejected: boolean;
  detail?: string;
}

export async function getSendedApplyAPICall(token?: string) {
  const bearerToken = token ? `Bearer ${token}` : null;
  try {
    const response = await axios.get<GetSendedUserApplyRes[]>(`${process.env.REACT_APP_API_URL}/apply/sended`, {
      headers: { Authorization: bearerToken },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? APPLY_MESSAGE.APPLY_GET_SENDED_FAIL, { variant: 'error' });
    } else {
      enqueueSnackbar(APPLY_MESSAGE.APPLY_GET_SENDED_FAIL, { variant: 'error' });
    }
  }
  return null;
}

interface CreateApplyParams {
  description: string;
  token: string;
}

export async function createApplyAPICall({ description, token }: CreateApplyParams) {
  const bearerToken = token ? `Bearer ${token}` : null;
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/apply`,
      { description },
      {
        headers: { Authorization: bearerToken },
      },
    );
    if (response.status === 200) {
      enqueueSnackbar(`대여가 등록되었습니다`, { variant: 'success' });
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? APPLY_MESSAGE.APPLY_CREATE_FAIL, { variant: 'error' });
    } else {
      enqueueSnackbar(APPLY_MESSAGE.APPLY_CREATE_FAIL, { variant: 'error' });
    }
    throw err;
  }
}
