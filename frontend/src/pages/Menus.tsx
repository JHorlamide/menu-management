import React from 'react';
import { Box, Button, TextField } from '@mui/material'
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
  const [menuName, setMenuName] = React.useState('');
  const [selectedMenu, setSelectedMenu] = React.useState<TreeNode>();
  const [open, setOpen] = React.useState(false);

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

  const handleCreate = async () => {
    const response = await createMenu({ name: menuName });
    console.log(response);
    setOpen(false);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


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
            onClick={() => setOpen(true)}
          >
            Create menu
          </Button>
        </Select>
      </FormControl>

      {open && (
        <Box sx={style}>
          <TextField
            sx={{ width: "100%" }}
            required
            id="filled-required"
            label="Menu name"
            variant="filled"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
          />

          <Button
            sx={{
              mt: 2,
              backgroundColor: "#1D2939",
              borderRadius: "48px",
              width: "100%",
              '&:hover': {
                backgroundColor: '#1D2939',
                boxShadow: 'none',
              }
            }}
            variant="contained"
            onClick={handleCreate}
          >
            Submit
          </Button>
        </Box>
      )}

      <MenuTree menus={selectedMenu} />
    </Box>

  )
}

export default Menus