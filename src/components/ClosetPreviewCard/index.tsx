import * as React from 'react';
import { CardActionArea, Typography, CardContent, Card } from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';

interface ClosetPreviewCardProps {
  closetid: number;
  closetname: string;
}

const ClosetPreviewCard: React.FC<ClosetPreviewCardProps> = ({ closetid, closetname }: ClosetPreviewCardProps) => {
  return (
    <Card sx={{ width: 200, borderRadius: 10, boxShadow: 0 }}>
      <CardActionArea href={`/closet/${closetid}`}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CheckroomIcon sx={{ fontSize: 100 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {closetname}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ClosetPreviewCard;
