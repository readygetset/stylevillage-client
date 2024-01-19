import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import { MyPageHeader } from '../myPageHeader';
import { GetLendsRes, GetMyLendsResponse, getLendsAPICall } from '../../../hooks/api/lend/lend';
import LendCard from '../../../components/LendCard';

interface LendInfo {
  lendId: number;
  clothesId?: number;
  clothesName?: string;
  clothesImage?: string;
  price: number;
  startDate: string;
  endDate: string;
  lenderName?: string;
  lenderNickName?: string;
  loaneeName?: string;
  loaneeNickName?: string;
  review?: string;
}

export default function MyPageLend() {
  const nickname = sessionStorage.getItem('userNickname');
  const token = sessionStorage.getItem('accessToken') ?? '';

  const emptyLendsArray: GetLendsRes[] = [];
  const notLender = (
    <Typography width="100%" textAlign="center" sx={{ mt: '50px', color: 'gray', fontSize: 20 }}>
      아직 빌려준 옷이 없어요
    </Typography>
  );
  const notLoanee = (
    <Typography width="100%" textAlign="center" sx={{ mt: '50px', color: 'gray', fontSize: 20 }}>
      아직 빌린 옷이 없어요
    </Typography>
  );

  const [lends, setLends] = useState<GetMyLendsResponse | null>();
  const [lendsAsLender, setLendsAsLender] = useState<GetLendsRes[]>();
  const [lendsAsLoanee, setLendsAsLoanee] = useState<GetLendsRes[]>();
  const [asLenderCards, setAsLenderCards] = useState<JSX.Element | JSX.Element[]>(notLender);
  const [asLoaneeCards, setAsLoaneeCards] = useState<JSX.Element | JSX.Element[]>(notLoanee);

  const getLendList = async () => {
    try {
      const result = await getLendsAPICall(token);
      setLends(result);
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    getLendList();
  }, []);
  useEffect(() => {
    setLendsAsLender(lends?.lendsAsLender ?? emptyLendsArray);
    setLendsAsLoanee(lends?.lendsAsLoanee ?? emptyLendsArray);
  }, [lends]);

  const getAsLenderCards = () => {
    if (lendsAsLender && lendsAsLender.length > 0)
      return lendsAsLender.map((lend) => {
        const lendInfo: LendInfo = {
          lendId: lend?.id ? lend.id : 0,
          clothesId: lend.clothes?.id,
          clothesName: lend.clothes?.name,
          clothesImage: lend.clothes?.image,
          price: lend.price,
          startDate: lend.startDate,
          endDate: lend.endDate,
          lenderName: lend.lender?.username,
          lenderNickName: lend.lender?.nickname,
          loaneeName: lend.loanee?.username,
          loaneeNickName: lend.loanee?.nickname,
          review: lend.review,
        };
        return <LendCard key={lendInfo.lendId} isLoanee={false} lendInfo={lendInfo} />;
      });
    return (
      <Typography width="100%" textAlign="center" sx={{ mt: '50px', color: 'gray', fontSize: 20 }}>
        아직 빌려준 옷이 없어요
      </Typography>
    );
  };
  useEffect(() => {
    const cards: JSX.Element | JSX.Element[] = getAsLenderCards();
    setAsLenderCards(cards);
  }, [lendsAsLender]);
  const getAsLoaneeCards = () => {
    if (lendsAsLoanee && lendsAsLoanee.length > 0)
      return lendsAsLoanee.map((lend) => {
        const lendInfo: LendInfo = {
          lendId: lend?.id ? lend.id : 0,
          clothesId: lend.clothes?.id,
          clothesName: lend.clothes?.name,
          clothesImage: lend.clothes?.image,
          price: lend.price,
          startDate: lend.startDate,
          endDate: lend.endDate,
          lenderName: lend.lender?.username,
          lenderNickName: lend.lender?.nickname,
          loaneeName: lend.loanee?.username,
          loaneeNickName: lend.loanee?.nickname,
          review: lend.review,
        };
        return <LendCard key={lendInfo.lendId} isLoanee={true} lendInfo={lendInfo} />;
      });
    return (
      <Typography width="100%" textAlign="center" sx={{ mt: '50px', color: 'gray', fontSize: 20 }}>
        아직 빌린 옷이 없어요
      </Typography>
    );
  };
  useEffect(() => {
    const cards: JSX.Element | JSX.Element[] = getAsLoaneeCards();
    setAsLoaneeCards(cards);
  }, [lendsAsLoanee]);

  return (
    <>
      <MyPageHeader nickname={nickname} description="님의 대여 내역을 확인할 수 있어요" />
      <Grid container spacing={0} sx={{ borderRight: 'gray solid 1px' }}>
        <Grid item xs={6}>
          <Box>
            <Box
              width="100%"
              height="50px"
              display={'flex'}
              flexDirection={'row'}
              alignItems={'center'}
              sx={{ borderBottom: 'gray solid 1px' }}
            >
              <Typography
                variant="h6"
                width="100%"
                sx={{ fontWeight: 'semi-bold', textAlign: 'center', borderRight: 'gray solid 1px' }}
              >
                내가 빌려줬어요
              </Typography>
            </Box>
            <Box width="100%">{asLenderCards}</Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            width="100%"
            height="50px"
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            sx={{ borderBottom: 'gray solid 1px' }}
          >
            <Typography variant="h6" width="100%" sx={{ fontWeight: 'semi-bold', textAlign: 'center' }}>
              내가 빌렸어요
            </Typography>
          </Box>
          <Box width="100%">{asLoaneeCards}</Box>
        </Grid>
      </Grid>
    </>
  );
}
