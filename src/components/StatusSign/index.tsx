import { Box, Typography } from '@mui/material';

interface StatusSignProp {
  status: string;
}
export default function StatusSign({ status }: StatusSignProp) {
  if (status === '대여가능') {
    return (
      <Box display={'flex'} alignItems={'center'} sx={{ mr: 1 }}>
        <Box
          sx={{
            backgroundColor: 'green',
            width: 10,
            height: 10,
            borderRadius: 100,
            mr: 1,
          }}
        />
        <Typography>{status}</Typography>
      </Box>
    );
  }
  if (status === '대여불가능') {
    return (
      <Box display={'flex'} alignItems={'center'} sx={{ mr: 1 }}>
        <Box
          sx={{
            backgroundColor: 'red',
            width: 10,
            height: 10,
            borderRadius: 100,
            mr: 1,
          }}
        />
        <Typography>{status}</Typography>
      </Box>
    );
  }
  if (status === '대여중') {
    return (
      <Box display={'flex'} alignItems={'center'} sx={{ mr: 1 }}>
        <Box
          sx={{
            backgroundColor: 'orange',
            width: 10,
            height: 10,
            borderRadius: 100,
            mr: 1,
          }}
        />
        <Typography>{status}</Typography>
      </Box>
    );
  }
  if (status === '공개중') {
    return (
      <Box display={'flex'} alignItems={'center'} sx={{ mr: 1 }}>
        <Box
          sx={{
            backgroundColor: 'black',
            width: 10,
            height: 10,
            borderRadius: 100,
            mr: 1,
          }}
        />
        <Typography>{status}</Typography>
      </Box>
    );
  }

  return null;
}
