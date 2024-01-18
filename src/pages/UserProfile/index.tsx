import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';

import { UserClothes, UserProfile, getUserClothesAPICall, getUserProfileAPICall } from '../../hooks/api/user/user';
import ClothPreviewCard from '../../components/ClothesPreviewCard';

export function UserProfilePage() {
  const { id } = useParams();
  const userId = Number(id);
  const [clothes, setClothes] = useState<UserClothes[] | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const getUserClothes = async () => {
    try {
      const result = await getUserClothesAPICall(userId);
      setClothes(result);
    } catch (error) {
      //
    }
  };
  const getUserProfile = async () => {
    try {
      const result = await getUserProfileAPICall(userId);
      setProfile(result);
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    getUserClothes();
    getUserProfile();
  }, [userId]);
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Box sx={{ mb: 4 }} display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Typography sx={{ mt: 5, mb: 0.5 }} variant="h3" fontWeight={'bold'}>
          {profile?.nickname}
        </Typography>
        <Typography variant="h6">{profile?.location}</Typography>
      </Box>

      {clothes?.length ? (
        <Box display={'flex'} width={1200}>
          <Grid container spacing={3} justifyContent={'flex-start'} display={'flex'} flexDirection={'row'}>
            {clothes.map((cloth) => (
              <Grid item key={cloth.id}>
                <ClothPreviewCard
                  clothesId={cloth.id}
                  clothesname={cloth.name}
                  status={cloth.status}
                  userid={userId}
                  username={profile?.nickname ?? ''}
                  isWished={cloth.isWished}
                  imgsrc={cloth.image ?? ''}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <Typography variant="h6" sx={{ color: 'gray', mt: 5 }}>
            사용자가 보유한 옷이 없어요
          </Typography>
        </Box>
      )}
    </Box>
  );
}
