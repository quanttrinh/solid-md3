import { cva, type VariantProps } from 'class-variance-authority';
import { splitProps, type JSX } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import { cn } from '../../cn';

const anchorBase = cva(
  'state-layer inline-flex items-center justify-center rounded-full font-medium transition-all cursor-pointer select-none disabled:opacity-38 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-md3-primary',
  {
    variants: {
      variant: {
        filled:
          'bg-md3-primary text-md3-on-primary shadow-md3-elevation-1 hover:shadow-md3-elevation-2',
        outlined: 'border border-md3-outline text-md3-primary',
        text: 'text-md3-primary',
        elevated:
          'bg-md3-surface-container-low text-md3-primary shadow-md3-elevation-1 hover:shadow-md3-elevation-2',
        tonal: 'bg-md3-secondary-container text-md3-on-secondary-container',
      },
      size: {
        sm: 'h-8 px-3 gap-1.5 text-sm',
        md: 'h-10 px-6 gap-2 text-sm',
        lg: 'h-12 px-8 gap-2.5 text-base',
      },
      iconOnly: {
        true: '',
      },
      preset: {
        forward: '',
        backward: '',
        'new-tab': '',
        download: '',
      },
    },
    compoundVariants: [
      { iconOnly: true, size: 'sm', class: 'px-0 w-8' },
      { iconOnly: true, size: 'md', class: 'px-0 w-10' },
      { iconOnly: true, size: 'lg', class: 'px-0 w-12' },
    ],
    defaultVariants: {
      variant: 'text',
      size: 'md',
      iconOnly: false,
    },
  },
);

type AnchorProps = Omit<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, 'classList'> &
  VariantProps<typeof anchorBase> & {
    href?: string;
  };

function PresetIcon(props: { preset: NonNullable<VariantProps<typeof anchorBase>['preset']> }) {
  const icons: Record<string, string> = {
    forward: 'arrow_forward',
    backward: 'arrow_back',
    'new-tab': 'open_in_new',
    download: 'download',
  };
  return <span class="material-symbols-outlined text-base">{icons[props.preset]}</span>;
}

export function Anchor(props: AnchorProps) {
  const [local, rest] = splitProps(props, [
    'variant',
    'size',
    'iconOnly',
    'preset',
    'href',
    'class',
    'children',
  ]);

  return (
    <Dynamic
      component="a"
      href={local.href}
      target={local.preset === 'new-tab' ? '_blank' : undefined}
      rel={local.preset === 'new-tab' ? 'noopener noreferrer' : undefined}
      download={local.preset === 'download' ? '' : undefined}
      class={cn(
        anchorBase({
          variant: local.variant,
          size: local.size,
          iconOnly: local.iconOnly,
          preset: local.preset,
        }),
        local.class,
      )}
      {...rest}
    >
      {local.preset && !local.iconOnly && <PresetIcon preset={local.preset} />}
      {local.children}
    </Dynamic>
  );
}

export type { AnchorProps };