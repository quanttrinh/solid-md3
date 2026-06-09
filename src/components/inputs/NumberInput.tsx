import { NumberInput as ArkNumberInput } from "@ark-ui/solid/number-input";

import { cn } from "../../cn";
import { Show } from "solid-js";

interface NumberInputProps {
  value?: string;
  defaultValue?: string;
  readOnly?: boolean;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  name?: string;
  onValueChange?: (value: string) => void;
  class?: string;
  placeholder?: string;
  label?: string;
  allowMouseWheel?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
}

export function NumberInput(props: NumberInputProps) {
  return (
    <ArkNumberInput.Root
      value={props.value}
      defaultValue={props.defaultValue}
      min={props.min}
      max={props.max}
      step={props.step}
      disabled={props.disabled}
      invalid={props.invalid}
      required={props.required}
      name={props.name}
      onValueChange={(details) => props.onValueChange?.(details.value)}
      class={cn("inline-flex flex-col gap-2", props.class)}
      readOnly={props.readOnly}
      allowMouseWheel={props.allowMouseWheel}
      formatOptions={props.formatOptions}
    >
      <Show when={props.label}>
        <ArkNumberInput.Label class="text-sm font-medium text-md3-on-surface">
          {props.label}
        </ArkNumberInput.Label>
      </Show>
      <ArkNumberInput.Control class="rounded-md3-sm border-md3-outline-variant bg-md3-surface-container-lowest text-md3-on-surface hover:border-md3-outline focus-within:border-md3-primary focus-within:ring-md3-primary focus-within:ring-1 flex h-10 items-stretch border transition-colors">
        <ArkNumberInput.DecrementTrigger
          class="state-layer text-md3-on-surface-variant flex w-9 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-38"
          aria-label="Decrement"
        >
          <span class="material-symbols-outlined text-base">remove</span>
        </ArkNumberInput.DecrementTrigger>
        <ArkNumberInput.Input
          placeholder={props.placeholder}
          class="text-md3-body-md text-center border-none! ring-0! outline-none! bg-transparent! px-2 py-1.5 focus:ring-0! w-full"
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
