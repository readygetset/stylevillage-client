import * as React from 'react';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface ClothPreviewCardProps {
  clothname: string;
  imgsrc: string;
  status: string;
  cardAction?: () => void;
}

const ClothPreviewCard: React.FC<ClothPreviewCardProps> = ({
  clothname,
  imgsrc,
  status,
  cardAction,
}: ClothPreviewCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  let boxShadow = 'none';

  if (isClicked) {
    boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
  } else if (isHovered) {
    boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
  }

  const hoverStyles = {
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
      boxShadow: isClicked ? '0 8px 16px rgba(0,0,0,0.2)' : '0 4px 8px rgba(0,0,0,0.1)',
    },
  };

  const handleClick = () => {
    if (cardAction) {
      cardAction(); // Call the provided cardAction function
    }
  };
  const renderStatusContent = () => {
    if (status === '대여불가능') {
      return (
        <Typography variant="body2" color="text.secondary">
          <span style={{ color: 'red', marginRight: '5px' }}>●</span>대여 불가능
        </Typography>
      );
    }
    if (status === '대여가능') {
      return (
        <Typography variant="body2" color="text.secondary">
          <span style={{ color: 'green', marginRight: '5px' }}>●</span>대여 가능
        </Typography>
      );
    }
    return null;
  };

  return (
    <Card
      sx={{ width: 200, borderRadius: 16, boxShadow, ...hoverStyles, border: '1px solid #E6E6E6' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      <CardMedia sx={{ height: 200 }} image={imgsrc} title="Cloth Image" />
      <CardContent sx={{ height: 50, textAlign: 'center' }}>
        <Typography variant="body2" color="text.primary" gutterBottom>
          {clothname}
        </Typography>
        {status === '비공개' ? null : renderStatusContent()}
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon sx={{ color: '#DF013A' }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ClothPreviewCard;
