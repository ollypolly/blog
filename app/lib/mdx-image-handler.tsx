import { readFile } from 'fs/promises';

export const createImageComponent = (slug: string) => {
  return async ({ src, ...rest }: { src?: string; [key: string]: any }) => {
    if (!src) return <img {...rest} />;

    // Handle external URLs (http/https)
    if (/^https?:\/\//.test(src)) {
      return <img src={src} {...rest} />;
    }

    // Handle SVGs - inline them like Dan does
    if (src.endsWith('.svg')) {
      try {
        const svgPath = `./public/posts/${slug}/${src}`;
        const svgContent = await readFile(svgPath, 'utf8');
        
        // Clean up SVG content
        const maxWidth = src.endsWith('-full.svg') ? '100%' : '450px';
        const colorReplacedSvg = svgContent
          .replace(/<metadata>.*?<\/metadata>/s, '')
          .replace(
            '<svg',
            `<svg style="max-width: ${maxWidth}; width: 100%; height: auto;"`
          );

        return (
          <span
            dangerouslySetInnerHTML={{ __html: colorReplacedSvg }}
            style={{
              display: 'inline-block',
              ...rest.style,
            }}
            {...rest}
          />
        );
      } catch (error) {
        console.warn(`Failed to load SVG: ${src}`, error);
        // Fallback to regular img tag
        return <img src={`/posts/${slug}/${src}`} {...rest} />;
      }
    }

    // Handle regular images - convert relative to absolute paths
    const finalSrc = `/posts/${slug}/${src}`;
    return <img src={finalSrc} {...rest} />;
  };
};