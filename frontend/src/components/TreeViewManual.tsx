import React, { useState, ReactNode } from 'react';

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
}

interface TreeItemProps {
  label: string;
  children?: ReactNode;
}

interface SimpleTreeViewProps {
  data: TreeNode[];
}

const TreeItem: React.FC<TreeItemProps> = ({ label, children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <li>
      <div onClick={() => setExpanded(!expanded)} style={{ cursor: 'pointer' }}>
        {label}
      </div>
      {expanded && children && (
        <ul style={{ marginLeft: '20px' }}>
          {children}
        </ul>
      )}
    </li>
  );
};

// SimpleTreeView component
const SimpleTreeView: React.FC<SimpleTreeViewProps> = ({ data }) => {
  // Function to render tree recursively
  const renderTree = (nodes: TreeNode): ReactNode => (
    <TreeItem label={nodes.name} key={nodes.id}>
      {nodes.children && nodes.children.map((node) => renderTree(node))}
    </TreeItem>
  );

  return (
    <ul>
      {data.map((tree) => renderTree(tree))}
    </ul>
  );
};

export default SimpleTreeView;
