import { Box, Typography } from '@mui/material';

import Chip from '../Chip';
import { Item } from '../../models/item';

interface Props {
  onClickHandler: (category: string, label: string, isSelected: boolean) => void;
  category: string;
  items: Item[];
}

export default function CategoryChips(props: Props) {
  const handleChipClick = (label: string, isSelected: boolean) => {
    props.onClickHandler(props.category, label, isSelected);
  };
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      sx={{
        mt: 1,
        backgroundColor: 'none',
        wrap: 'nowrap',
      }}
    >
      <Typography variant="h6" sx={{ width: '70px', mr: 1.5, fontSize: 17, fontWeight: 'bold' }}>
        {props.category}
      </Typography>
      {props.items.map((item, index) => (
        <Chip key={index} onClickHandler={handleChipClick} item={item} />
      ))}
    </Box>
  );
}
