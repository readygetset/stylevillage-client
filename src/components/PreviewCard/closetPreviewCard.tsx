import * as React from 'react';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

interface ClosetPreviewCardProps {
  closetname: string;
}

const ClosetPreviewCard: React.FC<ClosetPreviewCardProps> = ({ closetname }: ClosetPreviewCardProps) => {
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

  return (
    <Card
      sx={{
        width: 200,
        boxShadow,
        ...hoverStyles,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <CardMedia
        sx={{ height: 200, width: '100%', objectFit: 'cover' }}
        component="img"
        alt="Closet Image"
        image="https://cdn-icons-png.flaticon.com/512/1347/1347743.png"
      />
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {closetname}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ClosetPreviewCard;
