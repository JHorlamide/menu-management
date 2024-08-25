import React from 'react';
import { Box, Button } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuTree from '../components/MenuTree';
import { createMenu, getMenus } from '../services/api';

type MenuChildrenType = {
  id: number,
  name: string,
  parent: null,
  menu: number,
  children: MenuChildrenType[];
}

type TreeNode = {
  id: number;
  name: string;
  children: MenuChildrenType[];
}

const Menus = () => {
  const [menus, setMenus] = React.useState<TreeNode[]>([]);
  const [selectedMenu, setSelectedMenu] = React.useState<TreeNode>();

  React.useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    const response = await getMenus();
    setMenus(response.data);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const menu = menus.find((menu) => menu.id === parseInt(event.target.value))
    setSelectedMenu(menu);
  };

  const handleSubmit = async () => {
    const response = await createMenu({ name: "" })
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select menu</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={String(selectedMenu?.id)}
          label="Select menu"
          onChange={handleChange}
        >
          {menus.map((menu) => (
            <MenuItem key={menu.id} value={menu.id}>{menu.name}</MenuItem>
          ))}

          <Button
            sx={{
              backgroundColor: "#1D2939",
              borderRadius: "48px",
              width: "100%",
              '&:hover': {
                backgroundColor: '#1D2939',
                boxShadow: 'none',
              }
            }}
            variant="contained"
            onSubmit={handleSubmit}
          >
            Create menu
          </Button>
        </Select>
      </FormControl>

      <MenuTree menus={selectedMenu} />
    </Box>
  )
}

export default Menus