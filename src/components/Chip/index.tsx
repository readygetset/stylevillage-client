import { useState } from 'react';
import { Button } from '@mui/material';

interface Props {
  label: string;
  isSelected: boolean;
}

export default function Chip(props: Props) {
  const [isSelected, setisSelected] = useState(props.isSelected);
  const clickHandler = () => setisSelected(!isSelected);
  return isSelected ? (
    <Button
      onClick={clickHandler}
      sx={{
        mr: 2,
        padding: 0,
        paddingInline: 1,
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold',
        backgroundColor: '#D9D9D9',
        boxShadow: '0 0 0 1px black',
        borderRadius: 100,
      }}
    >
      {props.label}
    </Button>
  ) : (
    <Button
      onClick={clickHandler}
      sx={{
        mr: 2,
        padding: 0,
        paddingInline: 1,
        color: 'black',
        fontSize: 15,
        fontWeight: 'medium',
        backgroundColor: 'white',
        boxShadow: '0 0 0 1px black',
        borderRadius: 100,
      }}
    >
      {props.label}
    </Button>
  );
}
