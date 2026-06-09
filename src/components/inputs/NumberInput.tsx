import { NumberInput as ArkNumberInput } from '@ark-ui/solid/number-input';
import { splitProps } from 'solid-js';

import { cn } from '../../cn';

interface NumberInputProps {
  value?: string;
  defaultValue?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  invalid?: boolean;
  name?: string;
  onValueChange?: (details: { value: string }) => void;
  class?: string;
  placeholder?: string;
}

export function NumberInput(props: NumberInputProps) {
  const [local, rest] = splitProps(props, [
    'value',
    'defaultValue',
    'min',
    'max',
    'step',
    'disabled',
    'invalid',
    'name',
    'onValueChange',
    'class',
    'placeholder',
  ]);

  return (
    <ArkNumberInput.Root
      value={local.value}
      defaultValue={local.defaultValue}
      min={local.min}
      max={local.max}
      step={local.step}
      disabled={local.disabled}
      invalid={local.invalid}
      name={local.name}
      onValueChange={(details) => local.onValueChange?.({ value: details.value })}
      class={cn('inline-flex w-full', local.class)}
      {...rest}
    >
      <ArkNumberInput.Control class="rounded-md3-sm border-md3-outline-variant bg-md3-surface-container-lowest text-md3-on-surface hover:border-md3-outline focus-within:border-md3-primary focus-within:ring-md3-primary focus-within:ring-1 flex h-10 items-stretch border transition-colors">
        <ArkNumberInput.DecrementTrigger
          class="state-layer text-md3-on-surface-variant flex w-9 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-38"
          aria-label="Decrement"
        >
          <span class="material-symbols-outlined text-base">remove</span>
        </ArkNumberInput.DecrementTrigger>
        <ArkNumberInput.Input
          placeholder={local.placeholder}
          class="text-md3-body-md text-center !border-none !ring-0 !outline-none !bg-transparent px-2 py-1.5 focus:!ring-0 w-full"
          style={{ border: 'none', outline: 'none', 'box-shadow': 'none' }}
        />
        <ArkNumberInput.IncrementTrigger
          class="state-layer text-md3-on-surface-variant flex w-9 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-38"
          aria-label="Increment"
        >
          <span class="material-symbols-outlined text-base">add</span>
        </ArkNumberInput.IncrementTrigger>
      </ArkNumberInput.Control>
      
    </ArkNumberInput.Root>
  );
}

export type { NumberInputProps };