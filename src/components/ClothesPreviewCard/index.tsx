import * as React from 'react';
import { Box, CardActionArea, Card, CardContent, CardMedia, Typography } from '@mui/material';

import WishBtn from '../WishBtn';
import StatusSign from '../StatusSign';
import { createWishAPICall, deleteWishAPICall } from '../../hooks/api/wish/wish';

interface ClothPreviewCardProps {
  clothesId: number;
  clothesname: string;
  imgsrc: string;
  status: string;
  userid: number;
  username: string;
  isWished: boolean;
}

const ClothPreviewCard: React.FC<ClothPreviewCardProps> = ({
  clothesId,
  clothesname,
  imgsrc,
  status,
  userid,
  username,
  isWished,
}: ClothPreviewCardProps) => {
  const isMyClothes = Number(sessionStorage.getItem('userId')) === userid;
  const token = sessionStorage.getItem('accessToken') ?? '';
  const [isWish, setIsWish] = React.useState(isWished);
  const handleWish = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    try {
      if (isWish) {
        const response = await deleteWishAPICall({ clothesId, token });
        if (response?.status === 200) {
          setIsWish(!isWish);
        }
      } else {
        const response = await createWishAPICall({ clothesId, token });
        if (response?.status === 200) {
          setIsWish(!isWish);
        }
      }
    } catch (error) {
      //
    }
  };
  return (
    <Card sx={{ width: 200, borderRadius: 10, boxShadow: 0, border: 1, borderColor: '#D9D9D9' }}>
      <CardActionArea href={`/clothes/${clothesId}`}>
        <CardMedia sx={{ height: 200 }} image={imgsrc} title="Cloth Image" />
        <CardContent sx={{ flex: 1, width: '100%', textAlign: 'left' }}>
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {clothesname}
            </Typography>
            {!isMyClothes && <WishBtn isWished={isWish} handleWish={handleWish} />}
          </Box>
          {isMyClothes ? <StatusSign status={status} /> : <Typography>{username}</Typography>}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ClothPreviewCard;
