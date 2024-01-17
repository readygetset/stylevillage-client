import React, { useState } from 'react';

import ClothesPopup from '../../components/AddClothesPopUp';

export function MainPage() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpen}>옷 추가하기</button>
      <ClothesPopup open={open} onClose={handleClose} />
    </div>
  );

  return null;
}
