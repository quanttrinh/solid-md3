import { splitProps, type JSX } from 'solid-js';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../cn';

const pill = cva('rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase', {
  variants: {
    variant: {
      filled: 'bg-md3-primary-container text-md3-on-primary-container',
      tonal: 'bg-md3-secondary-container text-md3-on-secondary-container',
      outlined: 'border border-md3-outline text-md3-on-surface',
      error: 'bg-md3-error-container text-md3-on-error-container',
      warning: 'bg-md3-warning-container text-md3-on-warning-container',
      surface: 'bg-md3-surface-container-high text-md3-on-surface',
    },
  },
  defaultVariants: {
    variant: 'tonal',
  },
});

export type PillProps = VariantProps<typeof pill> & {
  class?: string;
  children: JSX.Element;
};

export function Pill(props: PillProps) {
  const [local, rest] = splitProps(props, ['variant', 'class', 'children']);

  return (
    <span class={cn(pill({ variant: local.variant }), local.class)} {...rest}>
      {local.children}
    </span>
  );
}
