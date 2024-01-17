import { useState } from 'react';
import { Button } from '@mui/material';

import { Item } from '../../models/item';

interface ChipProps {
  handleChipClick: (label: string, isSelected: boolean) => void;
  item: Item;
}
export default function Chip(props: ChipProps) {
  const { item } = props;
  const [isSelected, setisSelected] = useState(item.isSelected);
  const handleClick = () => {
    setisSelected(!isSelected);
    props.handleChipClick(item.label, !isSelected);
  };
  return (
    <Button
      onClick={handleClick}
      sx={{
        mr: 2,
        padding: 0,
        paddingInline: 1,
        color: 'black',
        fontSize: 13,
        fontWeight: isSelected ? 'bold' : 'medium',
        backgroundColor: isSelected ? '#D9D9D9' : 'white',
        boxShadow: '0 0 0 1px black',
        borderRadius: 100,
      }}
    >
      {item.label}
    </Button>
  );
}
