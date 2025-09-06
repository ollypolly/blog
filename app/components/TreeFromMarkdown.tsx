'use client';

import { parseAsciiTree } from '@/app/lib/ascii-tree-parser';
import TreeNode from './TreeNode';

interface TreeFromMarkdownProps {
  children: string;
  className?: string;
}

export default function TreeFromMarkdown({ children, className = '' }: TreeFromMarkdownProps) {
  try {
    const treeData = parseAsciiTree(children);
    
    if (treeData.length === 0) {
      return (
        <div className={`p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border ${className}`}>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No tree structure found. Make sure folders end with `/`
          </p>
        </div>
      );
    }

    return (
      <div className={`p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto ${className}`}>
        <div className="min-w-fit">
          {treeData.map((node, index) => (
            <TreeNode
              key={`${node.name}-${index}`}
              node={node}
              isLast={index === treeData.length - 1}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error parsing ASCII tree:', error);
    
    return (
      <div className={`p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 ${className}`}>
        <p className="text-red-600 dark:text-red-400 text-sm font-medium mb-2">
          Tree parsing error
        </p>
        <pre className="text-red-500 dark:text-red-300 text-xs whitespace-pre-wrap">
          {children}
        </pre>
      </div>
    );
  }
}