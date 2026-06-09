import { ToggleGroup as ArkToggleGroup } from '@ark-ui/solid/toggle-group';
import { splitProps, type JSX } from 'solid-js';

import { cn } from '../../cn';

interface ButtonGroupRootProps {
  value?: string[];
  defaultValue?: string[];
  multiple?: boolean;
  onValueChange?: (value: string[]) => void;
  disabled?: boolean;
  class?: string;
  children?: JSX.Element;
}

function ButtonGroupRoot(props: ButtonGroupRootProps) {
  const [local, rest] = splitProps(props, [
    'value',
    'defaultValue',
    'multiple',
    'onValueChange',
    'disabled',
    'class',
    'children',
  ]);

  return (
    <ArkToggleGroup.Root
      value={local.value}
      defaultValue={local.defaultValue}
      multiple={local.multiple}
      onValueChange={(details) => local.onValueChange?.(details.value)}
      disabled={local.disabled}
      class={cn('rounded-md3-sm bg-md3-surface-container inline-flex p-1', local.class)}
      {...rest}
    >
      {local.children}
    </ArkToggleGroup.Root>
  );
}

interface ButtonGroupItemProps {
  value: string;
  disabled?: boolean;
  class?: string;
  children?: JSX.Element;
}

function ButtonGroupItem(props: ButtonGroupItemProps) {
  const [local, rest] = splitProps(props, ['value', 'disabled', 'class', 'children']);
  return (
    <ArkToggleGroup.Item
      value={local.value}
      disabled={local.disabled}
      class={cn(
        'state-layer text-md3-label-md rounded-md3-xs px-3 py-1.5 text-sm font-medium transition-colors',
        'data-[state=on]:bg-md3-primary-container data-[state=on]:text-md3-on-primary-container',
        'data-[state=off]:text-md3-on-surface-variant',
        'disabled:opacity-38 disabled:pointer-events-none',
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </ArkToggleGroup.Item>
  );
}

ButtonGroupRoot.Item = ButtonGroupItem;

export { ButtonGroupRoot as ButtonGroup, type ButtonGroupRootProps as ButtonGroupProps };