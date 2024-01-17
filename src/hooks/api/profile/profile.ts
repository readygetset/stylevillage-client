import { enqueueSnackbar } from 'notistack';
import axios from 'axios';

export interface Profile {
  username: string;
  nickname: string;
  location: string;
  phoneNumber: string;
}

export interface Password {
  currentPassword: string;
  newPassword: string;
  confirmnewPassword: string;
}

export async function getuserProfile(): Promise<Profile | null> {
  try {
    const token = sessionStorage.getItem('accessToken');

    if (!token) {
      return null;
    }
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const { username, nickname, location, phoneNumber } = response.data;
      const userProfile: Profile = { username, nickname, location, phoneNumber };
      return userProfile;
    }

    return null;
  } catch (error) {
    enqueueSnackbar('유저정보불러오기 실패하였습니다.', { variant: 'error' });
    return null;
  }
}

export const updateProfileAPICALL = async (profile: Profile): Promise<boolean> => {
  try {
    const token = sessionStorage.getItem('accessToken');

    if (!token) {
      return false;
    }

    if (Object.values(profile).some((value) => !value)) {
      enqueueSnackbar('모든 정보를 입력해 주세요.', { variant: 'error' });
      return false;
    }

    if (!/^\d+$/.test(profile.phoneNumber) || profile.phoneNumber.length !== 11) {
      enqueueSnackbar('전화번호는 11자리의 숫자로 입력해 주세요.', { variant: 'error' });
      return false;
    }

    const response = await axios.put(`${process.env.REACT_APP_API_URL}/auth/profile`, profile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      alert('회원정보가 업데이트 되었습니다!');
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const changePasswordAPICALL = async (password: Password): Promise<boolean> => {
  try {
    const token = sessionStorage.getItem('accessToken');

    if (!token) {
      return false;
    }

    if (password.newPassword !== password.confirmnewPassword) {
      enqueueSnackbar('비밀번호가 일치하지 않습니다.', { variant: 'error' });
      return false;
    }

    const response = await axios.put(`${process.env.REACT_APP_API_URL}/auth/password`, password, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
