import { Slider as ArkSlider } from '@ark-ui/solid/slider';
import { For, Show, splitProps, type JSX } from 'solid-js';

import { cn } from '../../cn';

interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  invalid?: boolean;
  orientation?: 'horizontal' | 'vertical';
  name?: string;
  onValueChange?: (details: { value: number[] }) => void;
  labels?: string[];
  class?: string;
  children?: JSX.Element;
}

export function Slider(props: SliderProps) {
  const [local, rest] = splitProps(props, [
    'value',
    'defaultValue',
    'min',
    'max',
    'step',
    'disabled',
    'invalid',
    'orientation',
    'name',
    'onValueChange',
    'labels',
    'class',
    'children',
  ]);

  return (
    <ArkSlider.Root
      value={local.value}
      defaultValue={local.defaultValue}
      min={local.min}
      max={local.max}
      step={local.step}
      disabled={local.disabled}
      invalid={local.invalid}
      orientation={local.orientation}
      name={local.name}
      onValueChange={(details) => local.onValueChange?.({ value: details.value })}
      class={cn('flex w-full flex-col gap-2', local.class)}
      {...rest}
    >
      <ArkSlider.Control class="relative flex h-5 w-full items-center">
        <ArkSlider.Track class="bg-md3-surface-container-highest h-1 w-full rounded-full" />
        <ArkSlider.Range class="bg-md3-primary absolute h-1 rounded-full" />
        <For each={local.value ?? local.defaultValue ?? [0]}>
          {(_, index) => (
            <ArkSlider.Thumb
              index={index()}
              class={cn(
                'block h-4 w-4 rounded-full bg-md3-primary border-2 border-md3-surface shadow-md3-elevation-1',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-md3-primary',
                'disabled:opacity-38 disabled:cursor-not-allowed',
              )}
            />
          )}
        </For>
      </ArkSlider.Control>
      <Show when={local.labels && local.labels.length > 0}>
        <div class="flex justify-between px-1">
          <For each={local.labels}>
            {(label) => <span class="text-xs text-md3-on-surface-variant">{label}</span>}
          </For>
        </div>
      </Show>
      {local.children}
      <ArkSlider.HiddenInput />
    </ArkSlider.Root>
  );
}

export type { SliderProps };