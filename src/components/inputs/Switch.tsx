import { Switch as ArkSwitch } from '@ark-ui/solid/switch';
import { Show, splitProps } from 'solid-js';

import { cn } from '../../cn';

interface SwitchProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  name?: string;
  value?: string | number;
  onCheckedChange?: (checked: boolean) => void;
  class?: string;
}

export function Switch(props: SwitchProps) {
  const [local, rest] = splitProps(props, [
    'label',
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
    <ArkSwitch.Root
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
      <ArkSwitch.Control
        class={cn(
          'relative inline-flex h-5 w-10 shrink-0 items-center rounded-full transition-colors duration-200',
          'data-[state=checked]:bg-md3-primary data-[state=unchecked]:bg-md3-surface-container-highest',
          'data-[state=checked]:border-md3-primary data-[state=unchecked]:border-md3-outline-variant border-2',
        )}
      >
        <ArkSwitch.Thumb
          class={cn(
            'pointer-events-none block h-4 w-4 rounded-full bg-md3-outline transition-transform duration-200',
            'data-[state=checked]:translate-x-[1.125rem] data-[state=unchecked]:translate-x-0',
            'data-[state=checked]:bg-md3-on-primary data-[state=unchecked]:bg-md3-outline',
          )}
        />
      </ArkSwitch.Control>
      <Show when={local.label}>
        <ArkSwitch.Label class="text-sm font-medium text-md3-on-surface cursor-pointer">
          {local.label}
        </ArkSwitch.Label>
      </Show>
      <ArkSwitch.HiddenInput />
    </ArkSwitch.Root>
  );
}

export type { SwitchProps };