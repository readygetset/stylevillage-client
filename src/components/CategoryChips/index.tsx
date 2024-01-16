import { Box, Typography } from '@mui/material';

import Chip from '../Chip';
import { Item } from '../../models/item';

interface CategoryChipsProps {
  handleCategoryChipsClick: (category: string, label: string, isSelected: boolean) => void;
  category: string;
  items: Item[];
}

export default function CategoryChips(props: CategoryChipsProps) {
  const { category, items } = props;
  const handleChipClick = (label: string, isSelected: boolean) => {
    props.handleCategoryChipsClick(category, label, isSelected);
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
        {category}
      </Typography>
      {items.map((item, index) => (
        <Chip key={index} handleChipClick={handleChipClick} item={item} />
      ))}
    </Box>
  );
}
