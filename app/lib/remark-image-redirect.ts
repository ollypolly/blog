import { visit } from 'unist-util-visit';
import { Node } from 'unist';

interface ImageNode extends Node {
  type: 'image';
  url: string;
  alt?: string;
}

interface ElementNode extends Node {
  type: 'element';
  tagName: string;
  properties?: {
    src?: string;
    [key: string]: any;
  };
}

export function remarkImageRedirect(postSlug: string) {
  return (tree: Node) => {
    // Handle markdown images ![alt](./image.png)
    visit(tree, 'image', (node: ImageNode) => {
      if (node.url.startsWith('./')) {
        node.url = `/posts/${postSlug}/${node.url.slice(2)}`;
      }
    });

    // Handle MDX Image components <Image src="./image.png" />
    visit(tree, 'element', (node: ElementNode) => {
      if (node.tagName === 'img' && node.properties?.src?.startsWith('./')) {
        node.properties.src = `/posts/${postSlug}/${node.properties.src.slice(2)}`;
      }
    });
  };
}