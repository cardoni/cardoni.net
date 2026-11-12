// Minimal mdast node shape for the hard-break plugin.
// Kept structural so no extra unist type dependencies are needed.
interface MdastNode {
  type: string;
  value?: string;
  children?: MdastNode[];
}

/**
 * Remark plugin that turns single newlines inside a paragraph into hard line
 * breaks. The posts were authored for the original Hexo site, whose markdown
 * renderer ran with `breaks: true`, so a lone newline was always meant to
 * render as a `<br>` rather than collapse into a space.
 */
export function remarkHardBreaks() {
  return (tree: MdastNode) => {
    const visit = (node: MdastNode): void => {
      if (!node.children) return;

      node.children = node.children.flatMap((child) => {
        if (child.type !== 'text' || typeof child.value !== 'string' || !/\r?\n/.test(child.value)) {
          return [child];
        }

        return child.value.split(/\r?\n/).flatMap((line, index) => {
          const text: MdastNode = { type: 'text', value: line };
          return index === 0 ? [text] : [{ type: 'break' }, text];
        });
      });

      node.children.forEach(visit);
    };

    visit(tree);
  };
}
