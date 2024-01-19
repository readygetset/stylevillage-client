import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

import CreateLendDialog from '../CreateLendDialog';
import ConfirmDialog from '../ConfirmDialog';
import { GetArrivedAppliesResponse, rejectApplyAPICall } from '../../hooks/api/apply/apply';

interface ArrivedApplyCardProps {
  apply: GetArrivedAppliesResponse;
}

export default function ArrivedApplyCard({ apply }: ArrivedApplyCardProps) {
  const token = sessionStorage.getItem('accessToken') ?? '';
  const [isCreateLendOpen, setIsCreateLendOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const handleReject = () => {
    rejectApplyAPICall({ applyId: apply.id, token });
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        sx={{ width: 1000, border: 1, padding: 2, borderRadius: 10, mb: 2 }}
      >
        <Box display={'flex'} width={1000}>
          {apply.clothes.image ? (
            <Box
              component="img"
              sx={{
                width: 150,
                borderRadius: 10,
              }}
              src={apply.clothes.image}
            />
          ) : (
            <Box
              sx={{
                backgroundColor: '#D9D9D9',
                width: 150,
                height: 150,
                borderRadius: 10,
              }}
            />
          )}
          <Box sx={{ ml: 4, mt: 2 }}>
            <Typography variant="h6" fontWeight={'bold'}>
              {apply.clothes.name}
            </Typography>
            <Box display={'flex'} alignItems={'center'} sx={{ mb: 1, mt: 1 }}>
              <Typography sx={{ mr: 1 }} fontWeight={'bold'}>
                신청인
              </Typography>
              <Typography
                component={Link}
                to={`/user/${apply.user.id}`}
                sx={{ color: 'black', textDecoration: 'none' }}
              >
                {apply.user.nickname}
              </Typography>
            </Box>
            <Box display={'flex'} alignItems={'center'} paddingRight={5}>
              <Typography fontWeight={'bold'} sx={{ mr: 1 }}>
                내용
              </Typography>
              <Box width={480} sx={{ whiteSpace: 'normal', overflow: 'hidden' }}>
                {apply.detail}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box width={200}>
          <Button variant="contained" size="small" sx={{ width: 200, borderRadius: 10, backgroundColor: 'black' }}>
            대화하기
          </Button>
          <Box display={'flex'} justifyContent={'space-between'} sx={{ mt: 1 }}>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{ width: 98, borderRadius: 10, backgroundColor: '#12CA3B' }}
              onClick={() => {
                setIsCreateLendOpen(true);
              }}
            >
              승인하기
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{ width: 98, borderRadius: 10, backgroundColor: 'red' }}
              onClick={() => setIsConfirmOpen(true)}
            >
              거절하기
            </Button>
          </Box>
        </Box>
      </Box>
      <CreateLendDialog
        isOpen={isCreateLendOpen}
        applyId={apply.id}
        clothesId={apply.clothes.id}
        loaneeId={apply.user.id}
        handleCancel={() => setIsCreateLendOpen(false)}
      />
      <ConfirmDialog
        isOpen={isConfirmOpen}
        message="정말 거절하시겠습니까?"
        handleCancel={() => setIsConfirmOpen(false)}
        handleSubmit={handleReject}
      />
    </>
  );
}
