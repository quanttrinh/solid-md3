import { Show, type JSX } from "solid-js";

import { cn } from "../../cn";

interface EmptyStateProps {
  icon?: JSX.Element;
  title: string;
  description?: string;
  children?: JSX.Element;
  class?: string;
}

export function EmptyState(props: EmptyStateProps) {
  return (
    <div
      class={cn(
        "flex flex-col items-center justify-center gap-3 py-12 text-center",
        props.class,
      )}
    >
      <Show when={props.icon}>
        <div class="text-md3-on-surface-variant flex h-12 w-12 items-center justify-center">
          {props.icon ?? (
            <span class="material-symbols-outlined text-4xl">inbox</span>
          )}
        </div>
      </Show>
      <div class="flex flex-col gap-1">
        <p class="text-md3-on-surface text-base font-medium">{props.title}</p>
        <Show when={props.description}>
          <p class="text-md3-on-surface-variant text-sm">{props.description}</p>
        </Show>
      </div>
      <Show when={props.children}>
        <div class="mt-2">{props.children}</div>
      </Show>
    </div>
  );
}

export type { EmptyStateProps };
