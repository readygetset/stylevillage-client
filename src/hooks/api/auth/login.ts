import { enqueueSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';

import { LOGIN_MESSAGE } from '../../../data/messages';

export interface Login {
  username: string;
  password: string;
}

export async function postLoginAPICall(values: Login) {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, values);
    if (response.status === 200) {
      const { id, nickname, isBannded, accessToken } = response.data;
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('userId', id);
      sessionStorage.setItem('userNickname', nickname);
      enqueueSnackbar(`${nickname}님 안녕하세요 :)`, { variant: 'success' });
      if (isBannded === true) {
        enqueueSnackbar(`현재 ${nickname}님의 계정은 사용 정지되었습니다.`, { variant: 'warning' });
      }
      return { id, nickname };
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? LOGIN_MESSAGE.LOGIN_FAIL, { variant: 'error' });
    } else {
      enqueueSnackbar(LOGIN_MESSAGE.LOGIN_FAIL, { variant: 'error' });
    }
    throw err;
  }
  return '';
}
