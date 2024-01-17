import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface WishBtnProps {
  handleWish: React.MouseEventHandler<HTMLButtonElement>;
  isWished: boolean;
}

const WishBtn: React.FC<WishBtnProps> = ({ handleWish, isWished = false }: WishBtnProps) => {
  return (
    <IconButton onClick={handleWish} size="small">
      {isWished ? <FavoriteIcon sx={{ color: 'black' }} /> : <FavoriteBorderIcon sx={{ color: 'black' }} />}
    </IconButton>
  );
};

export default WishBtn;
