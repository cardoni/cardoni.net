// Minimal mdast node shape for the heading re-leveling plugin.
// Kept structural so no extra unist type dependencies are needed.
interface MdastNode {
  type: string;
  depth?: number;
  children?: MdastNode[];
  data?: {
    hProperties?: Record<string, unknown>;
    [key: string]: unknown;
  };
}

/**
 * Visual tier class that preserves a heading's original look, keyed to the
 * markdown level it was authored at. The site's article CSS sizes headings
 * by their authored level (`#` largest … `####`+ smallest); pairing the
 * re-leveled element with its original tier keeps rendering pixel-identical.
 */
export function headingTierClass(markdownLevel: number): string {
  if (markdownLevel <= 1) return 'ht-2';
  if (markdownLevel === 2) return 'ht-3';
  if (markdownLevel === 3) return 'ht-4';
  return 'ht-5';
}

/**
 * Semantic element level for a markdown heading.
 *
 * The page title is the document's h1, so authored `#`/`##` headings both
 * become h2; deeper levels keep their depth unless that would skip a level
 * relative to the previous heading, in which case they clamp to
 * previousLevel + 1. The result is a clean outline with no skipped levels.
 */
export function relevelHeading(markdownLevel: number, previousLevel: number): number {
  const desired = markdownLevel <= 2 ? 2 : Math.min(markdownLevel, 6);
  return Math.min(desired, previousLevel + 1);
}

/**
 * Remark plugin that re-levels article headings for a clean outline while
 * preserving their original visual size via tier classes (see
 * `headingTierClass`). Applied in document order; the page title h1 is
 * treated as the starting level.
 */
export function remarkRelevelHeadings() {
  return (tree: MdastNode) => {
    let previousLevel = 1;

    const visit = (node: MdastNode): void => {
      if (node.type === 'heading' && typeof node.depth === 'number') {
        const markdownLevel = node.depth;
        const level = relevelHeading(markdownLevel, previousLevel);
        node.depth = level;
        node.data = node.data ?? {};
        node.data.hProperties = {
          ...(node.data.hProperties ?? {}),
          className: headingTierClass(markdownLevel),
        };
        previousLevel = level;
      }
      node.children?.forEach(visit);
    };

    visit(tree);
  };
}
