import {
  Select as ArkSelect,
  createListCollection,
} from "@ark-ui/solid/select";
import { createVirtualizer } from "@tanstack/solid-virtual";
import {
  createEffect,
  createMemo,
  createSignal,
  Index,
  JSX,
  Show,
} from "solid-js";
import { Portal } from "solid-js/web";

import { cn } from "../../cn";
import { ScrollArea } from "../containers/ScrollArea";
import { Text } from "../typography/Text";

export type SelectProps = {
  placeholder?: string;
  nonce?: string;
} & Omit<
  ArkSelect.RootProps<string>,
  "scrollToIndexFn" | "asChild" | "positioning"
>;

export function Select(props: SelectProps) {
  const [scrollElement, setScrollRef] = createSignal<HTMLDivElement | null>(
    null,
  );

  const virtualizer = createVirtualizer({
    get count() {
      return props.collection?.items.length || 0;
    },
    getScrollElement: () => scrollElement(),
    estimateSize: () => 40,
    overscan: 1,
    useCachedMeasurements: true,
    useAnimationFrameWithResizeObserver: true,
  });

  return (
    <ArkSelect.Root
      positioning={{ flip: true, sameWidth: true }}
      lazyMount
      unmountOnExit
      scrollToIndexFn={(details) => {
        virtualizer.scrollToIndex(details.index, {
          align: "auto",
          behavior: details.immediate ? "instant" : "smooth",
        });
      }}
      {...props}
    >
      <ArkSelect.Control class="relative">
        <ArkSelect.Trigger class="rounded-md3-sm border-md3-outline-variant bg-md3-surface-container-lowest text-md3-body-md text-md3-on-surface hover:border-md3-outline focus:border-md3-primary focus:ring-md3-primary data-[state=open]:border-md3-primary group flex h-10 w-full items-center justify-between border py-1.5 pl-3 pr-2 outline-none transition-colors focus:ring-1">
          <ArkSelect.ValueText
            class="text-left"
            placeholder={props.placeholder}
            asChild={(props) => (
              <Text {...props}>{(props as any).children}</Text>
            )}
          />

          <div class="state-layer rounded-md3-full text-md3-on-surface-variant flex h-7 w-7 items-center justify-center overflow-hidden">
            <ArkSelect.Indicator class="material-symbols-outlined !text-base">
              unfold_more
            </ArkSelect.Indicator>
          </div>
        </ArkSelect.Trigger>
      </ArkSelect.Control>
      <Portal>
        <ArkSelect.Positioner
          ref={(el) => {
            createEffect(() => {
              el.style.setProperty(
                "--total-size",
                `${virtualizer.getTotalSize()}px`,
              );
            });
          }}
          class="z-50"
        >
          <ArkSelect.Content class="w-(--reference-width) min-h-(--reference-height) h-(--total-size) rounded-md3-md border-md3-outline-variant bg-md3-surface-container shadow-md3-elevation-3 box-content flex max-h-[min(480px,var(--available-height))] flex-col border py-2">
            <ScrollArea
              class="h-full w-full"
              scrollbarClass="my-0"
              viewportRef={setScrollRef}
              nonce={props.nonce}
            >
              <div
                ref={(el) => {
                  createEffect(() => {
                    el.style.setProperty(
                      "--total-size",
                      `${virtualizer.getTotalSize()}px`,
                    );
                  });
                }}
                class="h-(--total-size) relative w-full"
              >
                <Index each={virtualizer.getVirtualItems()}>
                  {(virtualItem) => {
                    const item = createMemo(() => {
                      const items = props.collection?.items;
                      const index = virtualItem().index;
                      return index >= 0 && index < items.length
                        ? items[index]
                        : undefined;
                    });

                    return (
                      <Show when={item()} keyed>
                        {(item) => (
                          <ArkSelect.Item
                            data-index={virtualItem().index}
                            ref={(el) => {
                              createEffect(() => {
                                virtualItem();
                                virtualizer.measureElement(el);
                                el.style.setProperty(
                                  "--item-offset",
                                  `${virtualItem().start}px`,
                                );
                              });
                            }}
                            item={item}
                            class={cn(
                              "translate-y-(--item-offset) absolute left-0 top-0 w-full",
                              "flex items-center justify-between",
                              "overflow-hidden px-3 py-2",
                              "text-md3-body-md text-md3-on-surface font-medium",
                              "state-layer cursor-pointer",
                              "data-[highlighted]:bg-md3-surface-container-highest",
                              "data-[state=checked]:bg-md3-primary-container",
                              "data-[state=checked]:text-md3-on-primary-container",
                            )}
                          >
                            <ArkSelect.ItemText
                              asChild={(props) => (
                                <Text {...props}>
                                  {(props as any).children}
                                </Text>
                              )}
                            >
                              {item}
                            </ArkSelect.ItemText>
                            <ArkSelect.ItemIndicator class="material-symbols-outlined text-lg">
                              check
                            </ArkSelect.ItemIndicator>
                          </ArkSelect.Item>
                        )}
                      </Show>
                    );
                  }}
                </Index>
              </div>
            </ScrollArea>
          </ArkSelect.Content>
        </ArkSelect.Positioner>
      </Portal>
      <ArkSelect.HiddenSelect />
    </ArkSelect.Root>
  );
}
