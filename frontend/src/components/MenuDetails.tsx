import React from 'react';
import { TextField, Button } from '@mui/material';

const MenuDetails = ({ selectedMenu, handleSave }) => {
  const [menuData, setMenuData] = React.useState(selectedMenu);

  const handleChange = (e) => {
    setMenuData({ ...menuData, [e.target.name]: e.target.value });
  };

  return (
    <div className="menu-details">
      <TextField
        label="Menu ID"
        value={menuData.id}
        name="id"
        fullWidth
        disabled
      />
      <TextField
        label="Depth"
        value={menuData.depth}
        name="depth"
        fullWidth
        disabled
      />
      <TextField
        label="Parent Data"
        value={menuData.parent}
        name="parent"
        fullWidth
        disabled
      />
      <TextField
        label="Name"
        value={menuData.name}
        name="name"
        onChange={handleChange}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={() => handleSave(menuData)}>
        Save
      </Button>
    </div>
  );
};

export default MenuDetails;
