import { splitProps, type JSX, type Ref } from 'solid-js';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../cn';

const block = cva('', {
  variants: {
    variant: {
      default: '',
      page: 'flex w-full h-full flex-col',
      toolbar:
        'flex shrink-0 flex-col gap-3 rounded-xl border border-md3-outline-variant bg-md3-surface-container px-4 py-3 shadow-md3-elevation-2 md:flex-row md:items-center md:justify-between',
      nested: 'rounded-lg border border-md3-outline-variant bg-md3-surface-container-low p-3',
      grid: 'grid grid-cols-1 gap-4 md:grid-cols-2',
      between: 'flex items-center justify-between',
      row: 'flex items-center gap-3',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type BlockProps = VariantProps<typeof block> & {
  class?: string;
  classList?: Record<string, boolean | undefined>;
  ref?: Ref<HTMLDivElement>;
  children?: JSX.Element;
};

export function Block(props: BlockProps) {
  const [local, rest] = splitProps(props, ['variant', 'class', 'classList', 'ref', 'children']);

  return (
    <div
      ref={local.ref}
      class={cn(block({ variant: local.variant }), local.class, local.classList)}
      {...rest}
    >
      {local.children}
    </div>
  );
}

export type { BlockProps };
