import {
  Combobox as ArkCombobox,
  createListCollection,
} from "@ark-ui/solid/combobox";
import { debounce } from "@sgreengolf/helpers";
import { createVirtualizer } from "@tanstack/solid-virtual";
import Fuse from "fuse.js";
import { createEffect, createMemo, createSignal, Index, Show } from "solid-js";
import { Portal } from "solid-js/web";

import { cn } from "../../cn";
import { ScrollArea } from "../containers/ScrollArea";
import { Text } from "../typography/Text";

export type ComboboxProps = {
  placeholder?: string;
  filter?: (query: string) => boolean;
  nonce?: string;
} & Omit<
  ArkCombobox.RootProps<string>,
  "scrollToIndexFn" | "asChild" | "positioning"
>;

export function Combobox(props: ComboboxProps) {
  const [filteredCollection, setFilteredCollection] = createSignal(
    props.collection,
  );
  const [scrollRef, setScrollRef] = createSignal<HTMLDivElement | null>(null);

  const fuse = createMemo(() => {
    return new Fuse(props.collection.items, {
      threshold: 0.4,
      isCaseSensitive: false,
      ignoreDiacritics: true,
      useTokenSearch: true,
    });
  });

  const virtualizer = createVirtualizer({
    get count() {
      return filteredCollection().items.length;
    },
    getScrollElement: () => scrollRef(),
    estimateSize: () => 40,
    overscan: 1,
    useCachedMeasurements: true,
    useAnimationFrameWithResizeObserver: true,
  });

  return (
    <ArkCombobox.Root
      collection={filteredCollection()}
      onInputValueChange={(details) => {
        debounce(() => {
          const trimmedValue = details.inputValue.trim();
          if (!trimmedValue) {
            setFilteredCollection(props.collection);
            return;
          }
          setFilteredCollection(
            createListCollection<string>({
              items: fuse()
                .search(trimmedValue)
                .map((result) => result.item),
            }),
          );
        }, 300)();
      }}
      openOnChange
      closeOnSelect
      positioning={{ flip: true, sameWidth: true }}
      lazyMount
      unmountOnExit
      scrollToIndexFn={(details) => {
        virtualizer.scrollToIndex(details.index, {
          align: "auto",
          behavior: details.immediate ? "instant" : "smooth",
        });
      }}
    >
      <ArkCombobox.Control class="relative">
        <ArkCombobox.Input
          placeholder={props.placeholder}
          class="rounded-md3-sm border-md3-outline-variant bg-md3-surface-container-lowest text-sm text-md3-on-surface placeholder:text-md3-on-surface-variant hover:border-md3-outline focus:border-md3-primary focus:ring-md3-primary h-10 w-full border py-1.5 pl-3 pr-20 outline-none transition-colors focus:ring-1"
        />
        <div class="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
          <Show when={props.value}>
            <ArkCombobox.ClearTrigger class="state-layer rounded-md3-full text-md3-on-surface-variant relative flex h-7 w-7 items-center justify-center overflow-hidden">
              <span class="material-symbols-outlined text-base">close</span>
            </ArkCombobox.ClearTrigger>
          </Show>
          <ArkCombobox.Trigger class="state-layer rounded-md3-full text-md3-on-surface-variant relative flex h-7 w-7 items-center justify-center overflow-hidden">
            <span class="material-symbols-outlined text-base!">
              unfold_more
            </span>
          </ArkCombobox.Trigger>
        </div>
      </ArkCombobox.Control>
      <Portal>
        <ArkCombobox.Positioner class="z-50">
          <ArkCombobox.Content
            ref={(el) => {
              createEffect(() => {
                el.style.setProperty(
                  "--total-size",
                  `${virtualizer.getTotalSize()}px`,
                );
              });
            }}
            class="w-(--reference-width) min-h-(--reference-height) h-(--total-size) rounded-md3-md border-md3-outline-variant bg-md3-surface-container shadow-md3-elevation-3 box-content flex max-h-[min(480px,var(--available-height))] flex-col border py-2"
          >
            <Show
              when={filteredCollection().items.length > 0}
              fallback={
                <div class="text-md3-label-md text-md3-on-surface-variant h-full w-full content-center px-3">
                  <Text>No results found</Text>
                </div>
              }
            >
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
                        const items = filteredCollection().items;
                        const index = virtualItem().index;
                        return index >= 0 && index < items.length
                          ? items[index]
                          : undefined;
                      });

                      return (
                        <Show when={item()} keyed>
                          {(item) => (
                            <ArkCombobox.Item
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
                                "data-highlighted:bg-md3-surface-container-highest",
                                "data-[state=checked]:bg-md3-primary-container",
                                "data-[state=checked]:text-md3-on-primary-container",
                              )}
                            >
                              <ArkCombobox.ItemText
                                asChild={(props) => (
                                  <Text {...props}>
                                    {(props as any).children}
                                  </Text>
                                )}
                              >
                                {item}
                              </ArkCombobox.ItemText>
                              <ArkCombobox.ItemIndicator class="material-symbols-outlined text-lg">
                                check
                              </ArkCombobox.ItemIndicator>
                            </ArkCombobox.Item>
                          )}
                        </Show>
                      );
                    }}
                  </Index>
                </div>
              </ScrollArea>
            </Show>
          </ArkCombobox.Content>
        </ArkCombobox.Positioner>
      </Portal>
    </ArkCombobox.Root>
  );
}
