import React from 'react';
import { Box, Button } from '@mui/material';

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  nickname: string;
}

export default function DropdownMenu({ isOpen, onClose, nickname }: DropdownMenuProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '100%',
        right: 0,
        zIndex: 1,
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        display: isOpen ? 'flex' : 'none',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center',
      }}
    >
      <Button onClick={onClose} sx={{ fontSize: 14, fontWeight: 'bold', paddingX: 2, paddingY: 1 }}>
        마이페이지
      </Button>
      <Button onClick={onClose} sx={{ fontSize: 14, fontWeight: 'bold', paddingX: 2, paddingY: 1 }}>
        프로필 관리
      </Button>
      <Button onClick={onClose} sx={{ fontSize: 14, fontWeight: 'bold', paddingX: 2, paddingY: 1 }}>
        로그아웃
      </Button>
      <Box sx={{ mt: 1, fontSize: 14, fontWeight: 'bold' }}>{`환영합니다, ${nickname}님`}</Box>
    </Box>
  );
}
