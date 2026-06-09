import { Pagination as ArkPagination } from "@ark-ui/solid/pagination";
import { For } from "solid-js";

import { cn } from "../../cn";

export interface PaginationProps {
  count: number;
  pageSize: number;
  page: number;
  onPageChange: (page: number) => void;
}

export function Pagination(props: PaginationProps) {
  const totalPages = () => Math.max(1, Math.ceil(props.count / props.pageSize));

  return (
    <ArkPagination.Root
      count={props.count}
      pageSize={props.pageSize}
      page={props.page}
      siblingCount={1}
      boundaryCount={1}
      onPageChange={(details) => props.onPageChange(details.page)}
    >
      <div class="flex items-center gap-2">
        <ArkPagination.PrevTrigger
          class={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40",
            props.page > 1 &&
              "text-md3-on-surface-variant hover:bg-md3-surface-container-highest",
          )}
        >
          <span class="material-symbols-outlined text-lg">chevron_left</span>
        </ArkPagination.PrevTrigger>

        <ArkPagination.Context>
          {(api) => (
            <div class="flex items-center gap-1">
              <For each={api().pages}>
                {(page, index) =>
                  page.type === "page" ? (
                    <ArkPagination.Item
                      type="page"
                      value={page.value}
                      class={cn(
                        "flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors",
                        api().page === page.value
                          ? "bg-md3-primary-container text-md3-on-primary-container"
                          : "text-md3-on-surface-variant hover:bg-md3-surface-container-highest hover:text-md3-on-surface",
                      )}
                    >
                      {page.value}
                    </ArkPagination.Item>
                  ) : (
                    <ArkPagination.Ellipsis
                      index={index()}
                      class="text-md3-on-surface-variant flex h-9 w-9 items-center justify-center text-sm"
                    >
                      ...
                    </ArkPagination.Ellipsis>
                  )
                }
              </For>
            </div>
          )}
        </ArkPagination.Context>

        <ArkPagination.NextTrigger
          class={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40",
            props.page < totalPages() &&
              "text-md3-on-surface-variant hover:bg-md3-surface-container-highest",
          )}
        >
          <span class="material-symbols-outlined text-lg">chevron_right</span>
        </ArkPagination.NextTrigger>
      </div>
    </ArkPagination.Root>
  );
}
