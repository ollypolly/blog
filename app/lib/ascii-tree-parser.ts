export interface TreeNode {
  name: string;
  type: 'file' | 'folder';
  children?: TreeNode[];
  isExpanded?: boolean;
  depth: number;
}

interface ParsedLine {
  depth: number;
  name: string;
  isLast: boolean;
}

export function parseAsciiTree(input: string): TreeNode[] {
  const lines = input.trim().split('\n').filter(line => line.trim());
  
  if (lines.length === 0) return [];
  
  const parsedLines = lines.map(line => parseLine(line));
  return buildTreeStructure(parsedLines);
}

function parseLine(line: string): ParsedLine {
  // Remove leading/trailing whitespace but preserve structure
  const trimmed = line.trimEnd();
  
  // Count depth by looking at the structure
  let depth = 0;
  let cleanName = trimmed;
  
  // Handle Unicode box-drawing characters
  if (trimmed.includes('├─') || trimmed.includes('└─')) {
    const match = trimmed.match(/^(.*?)[├└]─\s*(.*)$/);
    if (match) {
      const prefix = match[1];
      cleanName = match[2];
      // Count depth by number of vertical bars or spaces before the connector
      depth = Math.floor(prefix.replace(/[^│|]/g, '').length);
      if (prefix.includes('│') || prefix.includes('|')) depth++;
    }
  }
  // Handle ASCII tree characters
  else if (trimmed.includes('+--') || trimmed.includes('\\--') || trimmed.includes('|--')) {
    const match = trimmed.match(/^(\s*[|]*\s*)[+\\|]--\s*(.*)$/);
    if (match) {
      const prefix = match[1];
      cleanName = match[2];
      depth = Math.floor(prefix.replace(/[^|]/g, '').length);
    }
  }
  // Handle simple indentation (fallback)
  else {
    const match = trimmed.match(/^(\s*)(.*)$/);
    if (match) {
      const spaces = match[1];
      cleanName = match[2];
      // Assume 2 or 4 spaces per level
      const spaceCount = spaces.length;
      depth = Math.floor(spaceCount / (spaceCount > 0 && spaceCount % 4 === 0 ? 4 : 2));
    }
  }
  
  return {
    depth,
    name: cleanName.trim(),
    isLast: trimmed.includes('└') || trimmed.includes('\\')
  };
}

function buildTreeStructure(parsedLines: ParsedLine[]): TreeNode[] {
  const result: TreeNode[] = [];
  const stack: TreeNode[] = [];
  
  for (let i = 0; i < parsedLines.length; i++) {
    const current = parsedLines[i];
    
    // Determine if this is a folder by trailing slash
    const isFolder = current.name.endsWith('/');
    const displayName = isFolder ? current.name.slice(0, -1) : current.name;
    
    const node: TreeNode = {
      name: displayName,
      type: isFolder ? 'folder' : 'file',
      depth: current.depth,
      children: isFolder ? [] : undefined,
      isExpanded: false // Start collapsed
    };
    
    // Pop stack until we find the correct parent
    while (stack.length > 0 && stack[stack.length - 1].depth >= current.depth) {
      stack.pop();
    }
    
    // Add to parent or root
    if (stack.length === 0) {
      result.push(node);
    } else {
      const parent = stack[stack.length - 1];
      if (parent.children) {
        parent.children.push(node);
      }
    }
    
    // Push to stack if it's a folder (could be a parent)
    if (isFolder) {
      stack.push(node);
    }
  }
  
  return result;
}