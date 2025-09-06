import { visit } from 'unist-util-visit';
import type { Code, Root } from 'mdast';
import type { MdxJsxFlowElement } from 'mdast-util-mdx-jsx';

export function remarkTreeTransform() {
  return (tree: Root) => {
    visit(tree, 'code', (node: Code, index, parent) => {
      if (node.lang === 'tree' && parent && typeof index === 'number') {
        // Create JSX element for TreeFromMarkdown component
        const jsxElement: MdxJsxFlowElement = {
          type: 'mdxJsxFlowElement',
          name: 'TreeFromMarkdown',
          attributes: [],
          children: [
            {
              type: 'text',
              value: node.value,
            },
          ],
        };

        // Replace the code block with our component
        parent.children[index] = jsxElement;
      }
    });
  };
}