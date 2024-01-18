import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

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
    <Box>
      <Typography>{profile?.nickname}</Typography>
      <Typography>{profile?.location}</Typography>
      {clothes?.map((cloth) => (
        <ClothPreviewCard
          clothesId={cloth.id}
          clothesname={cloth.name}
          status={cloth.status}
          userid={userId}
          username={profile?.nickname ?? ''}
          isWished={cloth.isWished}
          imgsrc={cloth.image ?? ''}
        />
      ))}
    </Box>
  );
}
