import { ScrollArea as ArkScrollArea } from '@ark-ui/solid/scroll-area';
import type { JSX } from 'solid-js';

import { cn } from '../../cn';

export type ScrollAreaProps = {
  children: JSX.Element;
  class?: string;
  scrollbarClass?: string;
  viewportRef?: (el: HTMLDivElement | null) => void;
  nonce?: string;
};

export function ScrollArea(props: ScrollAreaProps) {
  return (
    <ArkScrollArea.Root class={cn('group relative flex flex-col', props.class)} nonce={props.nonce}>
      <ArkScrollArea.Viewport
        ref={props.viewportRef}
        class="scrollbar-hide -mx-4 box-content h-full w-full flex-1 pl-4 outline-none"
        nonce={props.nonce}
      >
        <ArkScrollArea.Content
          class="relative h-full w-full duration-150 data-[overflow-y]:pr-4"
          nonce={props.nonce}
        >
          {props.children}
        </ArkScrollArea.Content>
      </ArkScrollArea.Viewport>
      <ArkScrollArea.Scrollbar
        orientation="vertical"
        class={cn(
          'bg-md3-surface-container-highest absolute bottom-1 right-0 top-1 m-2 hidden w-1.5 rounded-full before:absolute before:left-1/2 before:h-full before:w-5 before:-translate-x-1/2 before:content-[""] data-[overflow-y]:flex data-[overflow-y]:flex-col',
          props.scrollbarClass,
        )}
        nonce={props.nonce}
      >
        <ArkScrollArea.Thumb
          class="bg-md3-outline relative min-h-[20px] w-full rounded-full"
          nonce={props.nonce}
        />
      </ArkScrollArea.Scrollbar>
    </ArkScrollArea.Root>
  );
}
