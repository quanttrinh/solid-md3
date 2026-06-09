import { RadioGroup as ArkRadioGroup } from '@ark-ui/solid/radio-group';
import { Show, splitProps, type JSX } from 'solid-js';

import { cn } from '../../cn';

interface RadioGroupRootProps {
  value?: string;
  defaultValue?: string;
  orientation?: 'horizontal' | 'vertical';
  disabled?: boolean;
  invalid?: boolean;
  name?: string;
  onValueChange?: (value: string) => void;
  class?: string;
  children?: JSX.Element;
}

function RadioGroup(props: RadioGroupRootProps) {
  const [local, rest] = splitProps(props, [
    'value',
    'defaultValue',
    'orientation',
    'disabled',
    'invalid',
    'name',
    'onValueChange',
    'class',
    'children',
  ]);

  return (
    <ArkRadioGroup.Root
      value={local.value}
      defaultValue={local.defaultValue}
      orientation={local.orientation}
      disabled={local.disabled}
      invalid={local.invalid}
      name={local.name}
      onValueChange={(details) => local.onValueChange?.(details.value ?? '')}
      class={cn('flex gap-3', local.orientation === 'horizontal' ? 'flex-row' : 'flex-col', local.class)}
      {...rest}
    >
      {local.children}
    </ArkRadioGroup.Root>
  );
}

interface RadioGroupItemProps {
  value: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  invalid?: boolean;
  class?: string;
}

function RadioGroupItem(props: RadioGroupItemProps) {
  const [local, rest] = splitProps(props, ['value', 'label', 'description', 'disabled', 'invalid', 'class']);

  return (
    <ArkRadioGroup.Item
      value={local.value}
      disabled={local.disabled}
      invalid={local.invalid}
      class={cn('flex items-center gap-2', local.class)}
      {...rest}
    >
      <ArkRadioGroup.ItemControl
        class={cn(
          'flex h-5 w-5 items-center justify-center rounded-full border-2 border-md3-outline transition-colors',
          'data-[state=checked]:border-md3-primary',
          !local.disabled && 'state-layer',
        )}
      >
        <ArkRadioGroup.Indicator class="flex h-2.5 w-2.5 rounded-full bg-md3-primary data-[state=unchecked]:hidden" />
      </ArkRadioGroup.ItemControl>
      <Show when={local.label || local.description}>
        <div class="flex flex-col">
          <ArkRadioGroup.ItemText class="text-sm font-medium text-md3-on-surface cursor-pointer">
            {local.label}
          </ArkRadioGroup.ItemText>
          <Show when={local.description}>
            <span class="text-xs text-md3-on-surface-variant">{local.description}</span>
          </Show>
        </div>
      </Show>
      <ArkRadioGroup.ItemHiddenInput />
    </ArkRadioGroup.Item>
  );
}

RadioGroup.Item = RadioGroupItem;

export { RadioGroup, type RadioGroupRootProps as RadioGroupProps };