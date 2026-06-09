import { ScrollArea as ArkScrollArea } from "@ark-ui/solid/scroll-area";
import type { JSX } from "solid-js";

import { cn } from "../../cn";

export type ScrollAreaProps = {
  children: JSX.Element;
  class?: string;
  viewportRef?: (el: HTMLDivElement | null) => void;
  nonce?: string;
};

export function ScrollArea(props: ScrollAreaProps) {
  return (
    <ArkScrollArea.Root
      class={cn("relative w-full min-h-0", props.class)}
      nonce={props.nonce}
    >
      <ArkScrollArea.Viewport
        ref={props.viewportRef}
        class="scrollbar-hide -mx-4 box-content h-full w-full pl-4 outline-none size-full"
        nonce={props.nonce}
      >
        <ArkScrollArea.Content class="size-full" nonce={props.nonce}>
          {props.children}
        </ArkScrollArea.Content>
      </ArkScrollArea.Viewport>
      <ArkScrollArea.Scrollbar
        orientation="vertical"
        class={cn(
          "bg-md3-surface-container-high absolute right-0 top-0 h-full rounded-full duration-150",
          "opacity-0 transition-opacity hover:opacity-100 data-scrolling:opacity-100",
          "w-1.5 transition-[width] active:w-3 hover:w-3",
          "before:absolute before:content-[''] before:top-0 before:h-full before:-left-3 before:w-12",
        )}
        nonce={props.nonce}
      >
        <ArkScrollArea.Thumb
          class="bg-md3-outline min-h-5 w-full rounded-full"
          nonce={props.nonce}
        />
      </ArkScrollArea.Scrollbar>
    </ArkScrollArea.Root>
  );
}
