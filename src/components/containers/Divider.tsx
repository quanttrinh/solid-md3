import { cva, type VariantProps } from 'class-variance-authority';
import { splitProps } from 'solid-js';

import { cn } from '../../cn';

const divider = cva('flex shrink-0', {
  variants: {
    weight: {
      regular: 'bg-md3-outline-variant',
      strong: 'bg-md3-outline',
    },
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'w-px self-stretch',
    },
  },
  defaultVariants: {
    weight: 'regular',
    orientation: 'horizontal',
  },
});

type DividerProps = VariantProps<typeof divider> & {
  class?: string;
};

export function Divider(props: DividerProps) {
  const [local, rest] = splitProps(props, ['weight', 'orientation', 'class']);
  return <div class={cn(divider({ weight: local.weight, orientation: local.orientation }), local.class)} {...rest} />;
}

export type { DividerProps };