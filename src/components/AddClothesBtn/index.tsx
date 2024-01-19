import { useState } from 'react';
import { Button } from '@mui/material';

import ClothesPopup from '../../hooks/api/clothes/addClothesPopUp';
import { ClothesInput } from '../../hooks/api/clothes/addClothes';

interface AddClothesBtnProps {
  value: ClothesInput | null;
  BtnText: string;
}
// 옷 수정 : id를 포함한 ClothesInput 객체 clothes 전달 ... <AddClothesBtn value={clothes} BtnText={'옷 수정'} />
// 옷 추가 props : { null } 전달 ...  <AddClothesBtn value={null} BtnText={'+ 옷 추가'} />

const AddClothesBtn = ({ value, BtnText }: AddClothesBtnProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        sx={{
          backgroundColor: 'gray',
          color: 'black',
          border: 'none',
          fontSize: 12,
          width: '5rem',
          height: '1rem',
          borderRadius: 10,
          fontWeight: 'Bold',
        }}
        onClick={handleOpen}
      >
        {BtnText}
      </Button>
      <ClothesPopup open={open} onClose={handleClose} value={value} />
    </>
  );
};
export default AddClothesBtn;
