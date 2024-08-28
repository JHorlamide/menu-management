import { SimpleTreeView, TreeItem, treeItemClasses } from '@mui/x-tree-view';
import { styled, alpha } from '@mui/material/styles';
import { Box, Button, Grid, IconButton } from '@mui/material';
import AddIcon from "@mui/icons-material/Add"
import MenuDetails from './MenuDetails';

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

const handlePlusClick = (node: TreeNode) => {
  console.log("NODE: ", node);
};

const renderTree = (nodes: TreeNode) => (
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
          onClick={() => handlePlusClick(nodes)}
        >
          <AddIcon fontSize="small" sx={{ bgcolor: "#253BFF", color: "white", borderRadius: 10 }} />
        </IconButton>
      </>
    }
  >
    {Array.isArray(nodes.children)
      ? nodes.children.map((node) => renderTree(node))
      : null}
  </CustomTreeItem>
);

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
              {selected_menus.map((tree) => renderTree(tree))}
            </SimpleTreeView>
          ) : (
            <h4>No Menu selected</h4>
          )}
        </Box>
      </Grid>
      <Grid item xs={4}>
        <MenuDetails />
      </Grid>
    </Grid>
  );
}

export default MenuTree
