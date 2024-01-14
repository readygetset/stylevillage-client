import { Box, Typography } from '@mui/material';

import Chip from '../Chip';

interface Props {
  category: string;
  items: { label: string; isSelected: boolean }[];
}

export default function CategoryChips(props: Props) {
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      sx={{
        mt: 2,
        backgroundColor: 'none',
        wrap: 'nowrap',
      }}
    >
      <Typography variant="h4" sx={{ width: '70px', mr: 2, fontSize: 20, fontWeight: 'bold' }}>
        {props.category}
      </Typography>
      {props.items.map((item, index) => (
        <Chip key={index} label={item.label} isSelected={item.isSelected} />
      ))}
    </Box>
  );
}
