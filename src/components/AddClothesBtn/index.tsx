import { useState } from 'react';
import { Button } from '@mui/material';

import ClothesPopup from '../../hooks/api/clothes/addClothesPopUp';
import { ClothesInput } from '../../hooks/api/clothes/addClothes';

interface AddClothesBtnProps {
  value?: ClothesInput | null;
  BtnText: string;
}

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
      {value ? (
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ width: 10, color: 'white', backgroundColor: 'black', borderRadius: 10 }}
        >
          {BtnText}
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ color: 'white', backgroundColor: 'black', borderRadius: 10 }}
        >
          {BtnText}
        </Button>
      )}
      <ClothesPopup open={open} onClose={handleClose} value={value} />
    </>
  );
};

export default AddClothesBtn;
