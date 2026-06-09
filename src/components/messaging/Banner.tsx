import { cva, type VariantProps } from "class-variance-authority";
import { Show, splitProps, type JSX } from "solid-js";

import { cn } from "../../cn";

const banner = cva("flex items-start gap-3 rounded-md3-md p-4 items-center", {
  variants: {
    variant: {
      info: "bg-md3-surface-container-high text-md3-on-surface",
      warning: "bg-md3-warning-container text-md3-on-warning-container",
      error: "bg-md3-error-container text-md3-on-error-container",
      success: "bg-md3-primary-container text-md3-on-primary-container",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

const bannerIcon = cva(
  "material-symbols-outlined text-lg leading-none mt-0.5",
  {
    variants: {
      variant: {
        info: "after:content-['info']",
        warning: "after:content-['warning']",
        error: "after:content-['error']",
        success: "after:content-['check\\\\_circle']",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

type BannerProps = VariantProps<typeof banner> & {
  text: JSX.Element;
  onClose?: () => void;
  class?: string;
};

export function Banner(props: BannerProps) {
  const [local, rest] = splitProps(props, [
    "variant",
    "text",
    "onClose",
    "class",
  ]);
  return (
    <div class={cn(banner({ variant: local.variant }), local.class)} {...rest}>
      <span class={cn(bannerIcon({ variant: local.variant }))} />
      <div class="flex-1 text-sm">{local.text}</div>
      <Show when={local.onClose}>
        <button
          onClick={local.onClose}
          class="state-layer rounded-full flex h-7 w-7 shrink-0 items-center justify-center"
        >
          <span class="material-symbols-outlined text-base leading-none after:content-['close']" />
        </button>
      </Show>
    </div>
  );
}

export type { BannerProps };
