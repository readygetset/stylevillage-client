import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import { MyPageHeader } from '../myPageHeader';
import { GetSendedUserApplyRes, getSendedApplyAPICall } from '../../../hooks/api/apply/apply';
import ApplyCard from '../../../components/ApplyCard';

interface ApplyInfo {
  clothesId?: number;
  clothesName?: string;
  clothesImage?: string;
  ownerId?: number;
  ownerName?: string;
  ownerNickName?: string;
  isAccepted: boolean;
  isRejected: boolean;
  detail?: string;
}

export default function MyPageApply() {
  const nickname = sessionStorage.getItem('userNickname');
  const token = sessionStorage.getItem('accessToken') ?? '';

  const [applies, setApllies] = useState<GetSendedUserApplyRes[] | null>();
  const [applyCards, setApplyCards] = useState<JSX.Element | JSX.Element[]>();

  const getSendedApply = async () => {
    try {
      const result = await getSendedApplyAPICall(token);
      setApllies(result);
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    getSendedApply();
  }, []);

  const getApplyCards = () => {
    if (applies && applies.length > 0)
      return applies.map((apply) => {
        const applyInfo: ApplyInfo = {
          clothesId: apply.clothes?.id,
          clothesName: apply.clothes?.name,
          clothesImage: apply.clothes?.image,
          ownerId: apply.owner?.id,
          ownerName: apply.owner?.username,
          ownerNickName: apply.owner?.nickname,
          isAccepted: apply.isAccepted,
          isRejected: apply.isRejected,
          detail: apply.detail,
        };
        return <ApplyCard key={apply.id} applyInfo={applyInfo} />;
      });
    return (
      <Typography width="100%" textAlign="center" sx={{ mt: '50px', color: 'gray', fontSize: 20 }}>
        다른 사람의 옷을 대여해보세요!
      </Typography>
    );
  };
  useEffect(() => {
    const cards: JSX.Element | JSX.Element[] = getApplyCards();
    setApplyCards(cards);
  }, [applies]);

  return (
    <>
      <MyPageHeader nickname={nickname} description="님의 대여 내역을 확인할 수 있어요" />
      <Box width="100%" display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Box width="100%">{applyCards}</Box>
      </Box>
    </>
  );
}
