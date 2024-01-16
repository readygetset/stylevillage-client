import * as React from 'react';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface ClothPreviewCardProps {
  clothname: string;
  imgsrc: string;
  status: 0 | 1;
}

const ClothPreviewCard: React.FC<ClothPreviewCardProps> = ({ clothname, imgsrc, status }: ClothPreviewCardProps) => {
  const renderStatusContent = () => {
    switch (status) {
      case 1:
        return (
          <Typography variant="body2" color="text.secondary">
            <span style={{ color: 'green', marginRight: '5px' }}>●</span>대여 가능
          </Typography>
        );
      case 0:
        return (
          <Typography variant="body2" color="text.secondary">
            <span style={{ color: 'red', marginRight: '5px' }}>●</span>대여 불가
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <Card sx={{ width: 200, borderRadius: 16 }}>
      <CardMedia sx={{ height: 200 }} image={imgsrc} title="Cloth Image" />
      <CardContent sx={{ height: 50, textAlign: 'center' }}>
        <Typography variant="body2" color="text.primary" gutterBottom>
          {clothname}
        </Typography>
        {status === 0 ? null : renderStatusContent()}
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ClothPreviewCard;
