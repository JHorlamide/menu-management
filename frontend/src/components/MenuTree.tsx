import React from 'react';
import { SimpleTreeView, TreeItem, treeItemClasses } from '@mui/x-tree-view';
import { styled, alpha } from '@mui/material/styles';
import { Box, Button, Grid, IconButton, TextField } from '@mui/material';
import AddIcon from "@mui/icons-material/Add"
import MenuDetails from './MenuDetails';
import { createNestedChild } from '../services/api';

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

interface SimpleTreeViewProps {
  menus: TreeNode | undefined;
}

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.grey[200],
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: {
      fontSize: '0.8rem',
      fontWeight: 500,
    },
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(0, 0.5),
    ...theme.applyStyles('light', {
      backgroundColor: alpha(theme.palette.primary.main, 0.25),
    }),
    ...theme.applyStyles('dark', {
      color: theme.palette.primary.contrastText,
    }),
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  ...theme.applyStyles('light', {
    color: theme.palette.grey[800],
  }),

  // Hide the IconButton by default
  [`& .${treeItemClasses.content}:hover .plus-icon`]: {
    visibility: 'visible',
  },
  [`& .plus-icon`]: {
    visibility: 'hidden',
    position: 'relative',
  },
}));

const RoundedInput = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    '& fieldset': {
      borderRadius: '16px',
    },
    '&:hover fieldset': {
      borderColor: '#000', // Customize hover border color if needed
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3f51b5', // Customize focused border color
    },
  },
});


const RoundedButton = styled(Button)({
  borderRadius: '50px',
  textTransform: 'none',
  padding: '6px 16px',
  fontSize: '0.875rem',
  backgroundColor: "#1D2939",
  '&:hover': {
    backgroundColor: '#1D2939',
    boxShadow: 'none',
  }
});

const RenderTree = ({ nodes }: { nodes: TreeNode }) => {
  const [open, setOpen] = React.useState(false);
  const [menuName, setMenuName] = React.useState('');
  const [selectedNode, setSelectedNode] = React.useState<MenuChildrenType>();

  const handlePlusClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, node: MenuChildrenType) => {
    e.stopPropagation();
    setOpen(!open);
    setSelectedNode(node)
  };

  const handleSubmit = async () => {
    if (!selectedNode) return;

    const response = await createNestedChild({
      name: menuName,
      menu: selectedNode.children.length === 0 ? selectedNode.id : selectedNode.menu,
      parent: selectedNode.children.length === 0 ? null : selectedNode.id
    });

    if (response.data) {
      alert("Menu created successfully");
    }

    setOpen(!open);
  };

  return (
    <CustomTreeItem
      key={nodes.id}
      itemId={nodes.id.toString()}
      label={
        <>
          {nodes.name}
          <IconButton
            className="plus-icon"
            aria-label="add"
            size="small"
            onClick={(e) => handlePlusClick(e, nodes as MenuChildrenType)}
          >
            <AddIcon fontSize="small" sx={{ bgcolor: "#253BFF", color: "white", borderRadius: 10 }} />
          </IconButton>
        </>
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => <RenderTree key={node.id} nodes={node} />)
        : null}
      {open && (
        <Box display="flex" gap={3}>
          <RoundedInput
            size="small"
            required
            id="filled-required"
            label="Menu name"
            variant="filled"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
          />

          <RoundedButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            create
          </RoundedButton>
        </Box>
      )}
    </CustomTreeItem>
  )
}

const MenuTree: React.FC<SimpleTreeViewProps> = ({ menus }) => {
  const selected_menus = menus ? [menus] : [];

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button sx={{
              backgroundColor: "#1D2939",
              borderRadius: "48px",
              '&:hover': {
                backgroundColor: '#1D2939',
                boxShadow: 'none',
              }
            }}
              variant="contained"
            >
              Expand All
            </Button>

            <Button sx={{
              borderRadius: "48px",
              outlineColor: "white",
              backgroundColor: "white",
              color: "black",
              '&:hover': {
                backgroundColor: 'white',
                boxShadow: 'none',
              }
            }}
              variant="contained"
            >
              Collapse All
            </Button>
          </Box>

          {selected_menus ? (
            <SimpleTreeView defaultExpandedItems={['1', '3']}>
              {selected_menus.map((tree) => <RenderTree key={tree.id} nodes={tree} />)}
            </SimpleTreeView>
          ) : (
            <h4>No Menu selected</h4>
          )}
        </Box>
      </Grid>

      <Grid item xs={4}>
        {selected_menus ? (
          <>
            {selected_menus.map((menu) => (
              <MenuDetails
                key={menu.id}
                name={menu.name}
                menuId={menu.id}
                depth={menu.children.length + 1}
                parentData={menu.name}
              />
            ))}
          </>
        ) : null}
      </Grid>
    </Grid>
  );
}

export default MenuTree;
