import { SimpleTreeView, TreeItem, treeItemClasses } from '@mui/x-tree-view';
import { styled, alpha } from '@mui/material/styles';
import { ReactNode } from 'react';

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
}

interface TreeItemProps {
  label: string;
  id: string;
  children?: ReactNode;
}

interface SimpleTreeViewProps {
  data: TreeNode[];
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
}));

const TreeItemI: React.FC<TreeItemProps> = ({ id, label, children }) => {
  return (
    <>
      {children ? (
        <CustomTreeItem itemId={id} label={label}>
          {children}
        </CustomTreeItem>
      ) : (
        <CustomTreeItem itemId={id} label={label} />
      )}
    </>
  );
};

const TreeView: React.FC<SimpleTreeViewProps> = ({ data }) => {
  const renderTree = (nodes: TreeNode): ReactNode => (
    <TreeItemI id={nodes.id} label={nodes.name} key={nodes.id}>
      {nodes.children && nodes.children.map((node) => renderTree(node))}
    </TreeItemI>
  );

  return (
    <SimpleTreeView defaultExpandedItems={['grid']}>
      {data.map((tree) => renderTree(tree))}
    </SimpleTreeView>
  );
}

export default TreeView