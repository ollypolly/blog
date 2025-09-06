'use client';

import { useState } from 'react';
import { TreeNode as TreeNodeType } from '@/app/lib/ascii-tree-parser';

interface TreeNodeProps {
  node: TreeNodeType;
  isLast?: boolean;
  prefix?: string;
}

export default function TreeNode({ node, isLast = false, prefix = '' }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(node.isExpanded || false);
  
  const handleToggle = () => {
    if (node.type === 'folder' && node.children) {
      setIsExpanded(!isExpanded);
    }
  };

  const getIcon = () => {
    if (node.type === 'folder') {
      return isExpanded ? '📂' : '📁';
    }
    
    // File icons based on extension
    const ext = node.name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'tsx':
      case 'jsx':
        return '⚛️';
      case 'ts':
      case 'js':
        return '🟨';
      case 'css':
      case 'scss':
        return '🎨';
      case 'md':
      case 'mdx':
        return '📝';
      case 'json':
        return '📋';
      case 'svg':
        return '🖼️';
      case 'png':
      case 'jpg':
      case 'jpeg':
        return '🖼️';
      default:
        return '📄';
    }
  };

  const getConnector = () => {
    return isLast ? '└─' : '├─';
  };

  const getVerticalLine = () => {
    return isLast ? '  ' : '│ ';
  };

  return (
    <div className="font-mono text-sm">
      {/* Current node */}
      <div 
        className={`flex items-center gap-1 py-0.5 ${
          node.type === 'folder' ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-1' : ''
        }`}
        onClick={handleToggle}
      >
        <span className="text-gray-400 dark:text-gray-500 select-none">
          {prefix}
          {getConnector()}
        </span>
        <span className="select-none">{getIcon()}</span>
        <span className={`${
          node.type === 'folder' 
            ? 'font-medium text-blue-600 dark:text-blue-400' 
            : 'text-gray-700 dark:text-gray-300'
        }`}>
          {node.name}
        </span>
      </div>

      {/* Children */}
      {node.type === 'folder' && node.children && isExpanded && (
        <div>
          {node.children.map((child, index) => {
            const isChildLast = index === node.children!.length - 1;
            const childPrefix = prefix + getVerticalLine();
            
            return (
              <TreeNode
                key={`${child.name}-${index}`}
                node={child}
                isLast={isChildLast}
                prefix={childPrefix}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}