import { Button, FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface MenuDetailsProps {
  menuId: string;
  depth: string;
  parentData: string;
  name: string;
}

export default function MenuDetails() {
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
          id="filled-required"
          label="Required"
          variant="filled"
          sx={{ borderRadius: "16px" }}
        />
        <TextField
          disabled
          id="filled-disabled"
          label="Disabled"
          variant="filled"
          sx={{ borderRadius: "16px" }}
        />

        <Button
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
