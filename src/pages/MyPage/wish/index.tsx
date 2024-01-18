import { MyPageHeader } from '../myPageHeader';

export default function MyPageWish() {
  const nickname = sessionStorage.getItem('userNickname');

  return <MyPageHeader nickname={nickname} description="님이 찜한 옷이에요" />;
}
