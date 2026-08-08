'use client';

import { Tooltip } from '@base-ui/react/tooltip';

interface DefinitionTermProps {
  children: React.ReactNode;
  definition: string;
}

export default function DefinitionTerm({ children, definition }: DefinitionTermProps) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        className="definition-term"
        aria-label={`${String(children)}: ${definition}`}
      >
        <dfn>{children}</dfn>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner className="definition-positioner" sideOffset={9} collisionPadding={12}>
          <Tooltip.Popup className="definition-popup">
            <Tooltip.Arrow className="definition-arrow" />
            <span className="definition-label">Definition</span>
            {definition}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
