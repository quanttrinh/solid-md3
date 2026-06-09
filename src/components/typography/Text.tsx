import { splitProps, type Component, type JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../cn';

const text = cva('', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
    },
    secondary: {
      true: 'text-md3-on-surface-variant',
      false: 'text-md3-on-surface',
    },
    mono: {
      true: 'font-mono',
    },
    weight: {
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    size: 'sm',
    secondary: false,
  },
});

export type TextProps = VariantProps<typeof text> & {
  as?: 'span' | 'p' | 'div' | 'strong';
  class?: string;
  children?: JSX.Element;
};

export const Text: Component<TextProps> = (props) => {
  const [local, rest] = splitProps(props, ['size', 'secondary', 'mono', 'weight', 'as', 'class', 'children']);

  return (
    <Dynamic component={local.as ?? 'span'} class={cn(text({ size: local.size, secondary: local.secondary, mono: local.mono, weight: local.weight }), local.class)} {...rest}>
      {local.children}
    </Dynamic>
  );
};
