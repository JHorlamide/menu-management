import { Button, FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React from 'react';

interface MenuDetailsProps {
  menuId: number;
  depth: number;
  parentData: string;
  name: string;
}

export default function MenuDetails(props: MenuDetailsProps) {
  const [menuInfo, setMenuInfo] = React.useState<MenuDetailsProps>({
    ...props
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setMenuInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '20rem' } }}
      noValidate
      autoComplete="off"
    >
      <FormControl>
        <TextField
          required
          id="menuId"
          name='menuId'
          label="MenuID"
          variant="filled"
          value={menuInfo.menuId}
          sx={{ borderRadius: "16px" }}
          onChange={handleChange}
        />
        <TextField
          id="depth"
          name="depth"
          label="Depth"
          variant="filled"
          value={menuInfo.depth}
          sx={{ borderRadius: "16px" }}
          onChange={handleChange}
        />
        {menuInfo.parentData ? (
          <TextField
            id="parentData"
            name="parentData"
            label="ParentData"
            variant="filled"
            value={menuInfo.parentData}
            sx={{ borderRadius: "16px" }}
            onChange={handleChange}
          />
        ) : null}

        <TextField
          id="name"
          name="name"
          label="Name"
          variant="filled"
          value={menuInfo.name}
          sx={{ borderRadius: "16px" }}
          onChange={handleChange}
        />
        <Button
          type='submit'
          sx={{
            mt: 2,
            backgroundColor: "#253BFF",
            borderRadius: "48px",
            width: "100%",
            '&:hover': {
              backgroundColor: '#253BFF',
              boxShadow: 'none',
            }
          }}
          variant="contained"
        >
          Save
        </Button>
      </FormControl>
    </Box>
  );
}
