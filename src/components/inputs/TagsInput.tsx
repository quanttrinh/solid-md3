import { TagsInput as ArkTagsInput } from '@ark-ui/solid/tags-input';
import { Index } from 'solid-js';

import { cn } from '../../cn';
import { Pill } from '../indicators/Pill';

export interface TagsInputProps {
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
  validate?: (details: { inputValue: string; value: string[] }) => boolean;
  class?: string;
}

export function TagsInput(props: TagsInputProps) {
  return (
    <ArkTagsInput.Root
      value={props.value}
      onValueChange={(details) => props.onValueChange(details.value)}
      validate={props.validate}
      class={cn('flex flex-col gap-1.5', props.class)}
    >
      <ArkTagsInput.Context>
        {(api) => (
          <>
            <ArkTagsInput.Control class="rounded-md3-sm border border-md3-outline-variant bg-md3-surface-container-lowest focus-within:border-md3-primary focus-within:ring-md3-primary focus-within:ring-1 flex min-h-10 flex-wrap items-center gap-1.5 px-3 py-1.5 transition-colors">
              <Index each={api().value}>
                {(value, index) => (
                  <ArkTagsInput.Item
                    index={index}
                    value={value()}
                    class="inline-flex cursor-default items-center outline-none"
                  >
                    <ArkTagsInput.ItemPreview
                      asChild={(previewProps) => (
                        <Pill {...previewProps} class="inline-flex items-center gap-1">
                          <ArkTagsInput.ItemText>{value()}</ArkTagsInput.ItemText>
                          <ArkTagsInput.ItemDeleteTrigger class="text-md3-on-secondary-container/60 hover:text-md3-on-secondary-container flex items-center justify-center">
                            <span class="material-symbols-outlined text-sm leading-none">close</span>
                          </ArkTagsInput.ItemDeleteTrigger>
                        </Pill>
                      )}
                    />
                    <ArkTagsInput.ItemInput class="hidden" />
                  </ArkTagsInput.Item>
                )}
              </Index>
              <ArkTagsInput.Input
                placeholder={props.placeholder}
                class="text-md3-on-surface placeholder:text-md3-on-surface-variant min-w-[4rem] flex-1 border-none bg-transparent text-sm outline-none"
              />
            </ArkTagsInput.Control>
            <ArkTagsInput.HiddenInput />
          </>
        )}
      </ArkTagsInput.Context>
    </ArkTagsInput.Root>
  );
}
