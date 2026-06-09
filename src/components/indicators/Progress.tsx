import { Progress as ArkProgress } from '@ark-ui/solid/progress';
import { cva, type VariantProps } from 'class-variance-authority';
import { Show, splitProps } from 'solid-js';

import { cn } from '../../cn';

const progressVariant = cva('', {
  variants: {
    size: {
      sm: 'h-1',
      md: 'h-1.5',
      lg: 'h-2',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface ProgressProps extends VariantProps<typeof progressVariant> {
  value?: number;
  max?: number;
  min?: number;
  onValueChange?: (value: number) => void;
  class?: string;
}

export function Progress(props: ProgressProps) {
  const [local, rest] = splitProps(props, ['value', 'max', 'min', 'onValueChange', 'size', 'class']);

  return (
    <ArkProgress.Root
      value={local.value ?? undefined}
      max={local.max}
      min={local.min}
      onValueChange={(details) => local.onValueChange?.(details.value ?? 0)}
      class={cn('flex w-full flex-col gap-1', local.class)}
      {...rest}
    >
      <ArkProgress.Track class={cn('bg-md3-surface-container-highest rounded-full overflow-hidden', progressVariant({ size: local.size }))}>
        <ArkProgress.Range class="bg-md3-primary h-full rounded-full transition-all duration-300" />
      </ArkProgress.Track>
      <Show when={local.value !== undefined}>
        <ArkProgress.ValueText class="text-xs text-md3-on-surface-variant sr-only">
          {local.value}%
        </ArkProgress.ValueText>
      </Show>
    </ArkProgress.Root>
  );
}

export type { ProgressProps };