'use client';

import { Tooltip } from '@base-ui/react/tooltip';

export default function EditorialProviders({ children }: { children: React.ReactNode }) {
  return (
    <Tooltip.Provider delay={260} closeDelay={80}>
      {children}
    </Tooltip.Provider>
  );
}
