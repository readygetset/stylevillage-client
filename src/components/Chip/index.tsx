import { useState } from 'react';
import { Button } from '@mui/material';

import { Item } from '../../models/item';

interface Props {
  onClickHandler: (label: string, isSelected: boolean) => void;
  item: Item;
}
export default function Chip(props: Props) {
  const [isSelected, setisSelected] = useState(props.item.isSelected);
  const handleClick = () => {
    setisSelected(!isSelected);
    props.onClickHandler(props.item.label, !isSelected);
  };
  return isSelected ? (
    <Button
      onClick={handleClick}
      sx={{
        mr: 2,
        padding: 0,
        paddingInline: 1,
        color: 'black',
        fontSize: 13,
        fontWeight: 'bold',
        backgroundColor: '#D9D9D9',
        boxShadow: '0 0 0 1px black',
        borderRadius: 100,
      }}
    >
      {props.item.label}
    </Button>
  ) : (
    <Button
      onClick={handleClick}
      sx={{
        mr: 2,
        padding: 0,
        paddingInline: 1,
        color: 'black',
        fontSize: 13,
        fontWeight: 'medium',
        backgroundColor: 'white',
        boxShadow: '0 0 0 1px black',
        borderRadius: 100,
      }}
    >
      {props.item.label}
    </Button>
  );
}
