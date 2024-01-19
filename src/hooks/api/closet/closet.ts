import { enqueueSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';

import { CLOSET_MESSAGE } from '../../../data/messages';

interface GetClosetParams {
  closetId: number;
  token?: string;
}

export interface User {
  id?: number;
  nickname?: string;
}

interface Closet {
  id?: number;
  name: string;
}

interface GetClosetClothes {
  id?: number;
  isOpen?: boolean;
  description?: string;
  category?: string;
  season?: string;
  status: string;
  name: string;
  tag?: string;
  image?: string;
  owner?: number;
  closetId?: number;
}

export interface GetClosetListParams {
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
interface EditClosetParams {
  token: string;
  closetId?: number;
  name: string;
}
interface DeleteClosetParams {
  token: string;
  closetId?: number;
}
export async function editClosetAPICall({ token, closetId, name }: EditClosetParams) {
  const bearerToken = token ? `Bearer ${token}` : null;
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/closet/${closetId}`,
      { name },
      {
        headers: { Authorization: bearerToken },
      },
    );
    if (response.status === 200) {
      enqueueSnackbar('옷장이 수정되었습니다');
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? '옷장 수정에 문제가 생겼어요 :(', { variant: 'error' });
    } else {
      enqueueSnackbar('옷장 수정에 문제가 생겼어요 :(', { variant: 'error' });
    }
  }
}

export async function deleteClosetAPICall({ token, closetId }: DeleteClosetParams) {
  const bearerToken = token ? `Bearer ${token}` : null;
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/closet/${closetId}`, {
      headers: { Authorization: bearerToken },
    });
    if (response.status === 200) {
      enqueueSnackbar('옷장이 삭제되었습니다');
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? '옷장 삭제에 문제가 생겼어요 :(', { variant: 'error' });
    } else {
      enqueueSnackbar('옷장 삭제에 문제가 생겼어요 :(', { variant: 'error' });
    }
  }
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

export interface AddClosetParams {
  name: string;
  token: string;
}

export async function AddClosetAPICall({ name, token }: AddClosetParams) {
  try {
    const bearerToken = token ? `Bearer ${token}` : null;
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/closet`,
      { name },
      {
        headers: {
          Authorization: bearerToken,
        },
      },
    );
    if (response.status === 200) {
      enqueueSnackbar('옷장을 생성했어요!', { variant: 'success' });
    }
    return response;
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? CLOSET_MESSAGE.CLOSET_NOT_ADDED, { variant: 'error' });
    } else {
      enqueueSnackbar(CLOSET_MESSAGE.CLOSET_NOT_ADDED, { variant: 'error' });
    }
  }
  return null;
}
