import CopyButton from './CopyButton';

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as React.ReactElement<{ children: React.ReactNode }>).props.children);
  }
  return '';
}

export default function CodeBlock({ children, ...props }: React.ComponentProps<'pre'>) {
  const code = extractText(children);
  const codeProps = (children as React.ReactElement<Record<string, unknown>>)?.props;
  const lang = codeProps?.['data-language'] as string | undefined;

  return (
    <div className="code-block-wrapper">
      <div className="code-block-toolbar">
        {lang && <span className="code-lang">{lang}</span>}
        <CopyButton text={code} />
      </div>
      <pre {...props}>{children}</pre>
    </div>
  );
}
