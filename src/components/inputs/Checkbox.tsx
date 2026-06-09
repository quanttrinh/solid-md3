import { Checkbox as ArkCheckbox } from '@ark-ui/solid/checkbox';
import { Show, splitProps } from 'solid-js';

import { cn } from '../../cn';

interface CheckboxProps {
  label?: string;
  description?: string;
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean | 'indeterminate';
  disabled?: boolean;
  invalid?: boolean;
  name?: string;
  value?: string;
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  class?: string;
}

export function Checkbox(props: CheckboxProps) {
  const [local, rest] = splitProps(props, [
    'label',
    'description',
    'checked',
    'defaultChecked',
    'disabled',
    'invalid',
    'name',
    'value',
    'onCheckedChange',
    'class',
  ]);

  return (
    <ArkCheckbox.Root
      checked={local.checked}
      defaultChecked={local.defaultChecked}
      disabled={local.disabled}
      invalid={local.invalid}
      name={local.name}
      value={local.value}
      onCheckedChange={(details) => local.onCheckedChange?.(details.checked)}
      class={cn('inline-flex items-center gap-2', local.class)}
      {...rest}
    >
      <ArkCheckbox.Control
        class={cn(
          'flex h-5 w-5 items-center justify-center border-2 border-md3-outline rounded-md3-xs transition-colors',
          'data-[state=checked]:bg-md3-primary data-[state=checked]:border-md3-primary',
          'data-[state=indeterminate]:bg-md3-primary data-[state=indeterminate]:border-md3-primary',
          !local.disabled && 'state-layer',
        )}
      >
        <ArkCheckbox.Indicator class="text-md3-on-primary flex items-center justify-center">
          <span class="material-symbols-outlined text-base leading-none">check</span>
        </ArkCheckbox.Indicator>
        <ArkCheckbox.Indicator indeterminate class="text-md3-on-primary flex items-center justify-center">
          <span class="material-symbols-outlined text-base leading-none">remove</span>
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      <Show when={local.label || local.description}>
        <div class="flex flex-col">
          <ArkCheckbox.Label class="text-sm font-medium text-md3-on-surface cursor-pointer">
            {local.label}
          </ArkCheckbox.Label>
          <Show when={local.description}>
            <span class="text-xs text-md3-on-surface-variant">{local.description}</span>
          </Show>
        </div>
      </Show>
      <ArkCheckbox.HiddenInput />
    </ArkCheckbox.Root>
  );
}

export type { CheckboxProps };