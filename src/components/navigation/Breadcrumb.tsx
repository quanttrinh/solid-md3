import { For, Show, splitProps, type JSX } from "solid-js";

import { cn } from "../../cn";

interface BreadcrumbProps {
  items: Array<{ label: string; href?: string }>;
  separator?: string;
  class?: string;
}

export function Breadcrumb(props: BreadcrumbProps) {
  const [local, rest] = splitProps(props, ["items", "separator", "class"]);

  return (
    <nav
      class={cn("flex items-center gap-1 text-sm", local.class)}
      {...rest}
      aria-label="Breadcrumb"
    >
      <For each={local.items}>
        {(item, index) => (
          <>
            <Show when={index() > 0}>
              <span class="text-md3-on-surface-variant material-symbols-outlined text-base leading-none">
                {local.separator ?? "chevron_right"}
              </span>
            </Show>
            <Show
              when={item.href && index() < local.items.length - 1}
              fallback={
                <span
                  class={cn(
                    "text-md3-on-surface-variant",
                    index() === local.items.length - 1 &&
                      "text-md3-on-surface font-medium",
                  )}
                >
                  {item.label}
                </span>
              }
            >
              <a
                href={item.href}
                class="text-md3-primary state-layer rounded-md3-xs px-1 transition-colors hover:opacity-80"
              >
                {item.label}
              </a>
            </Show>
          </>
        )}
      </For>
    </nav>
  );
}

export type { BreadcrumbProps };
