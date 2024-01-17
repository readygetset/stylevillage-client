import { enqueueSnackbar } from 'notistack';
import axios, { AxiosError } from 'axios';

export interface Register {
  username: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  gender: string;
  location: string;
  phoneNumber: string;
}

export async function isduplicated(username: string): Promise<boolean> {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/isduplicated`, { username });
    return response.data;
  } catch (err) {
    enqueueSnackbar('아이디 중복 검사 과정에서 오류가 발생했습니다.', { variant: 'error' });
    return true;
  }
}

export async function ResgisterAPICall(values: Register): Promise<boolean> {
  try {
    if (values.password !== values.confirmPassword) {
      enqueueSnackbar('비밀번호가 일치하지 않습니다.', { variant: 'error' });
      return false;
    }
    if (Object.values(values).some((value) => !value)) {
      enqueueSnackbar('모든 정보를 입력해 주세요.', { variant: 'error' });
      return false;
    }
    if (!/^\d+$/.test(values.phoneNumber) || values.phoneNumber.length !== 11) {
      enqueueSnackbar('전화번호는 11자리의 숫자로 입력해 주세요.', { variant: 'error' });
      return false;
    }
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, values);
    if (response.status === 200) {
      enqueueSnackbar('회원가입에 성공하였습니다.', { variant: 'success' });
      return true;
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      enqueueSnackbar(err.response?.data?.message ?? '회원가입에 실패하였습니다.', { variant: 'error' });
    } else {
      enqueueSnackbar('회원가입에 실패하였습니다.', { variant: 'error' });
    }
  }
  return false;
}
