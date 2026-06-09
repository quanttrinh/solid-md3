import { cva, type VariantProps } from "class-variance-authority";
import { splitProps } from "solid-js";

import { cn } from "../../cn";

const shimmer = cva("bg-md3-surface-container-highest animate-pulse", {
  variants: {
    rounded: {
      none: "rounded-none",
      sm: "rounded-md3-sm",
      md: "rounded-md3-md",
      lg: "rounded-md3-lg",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    rounded: "sm",
  },
});

type ShimmerProps = VariantProps<typeof shimmer> & {
  width?: string;
  height?: string;
  class?: string;
};

export function Shimmer(props: ShimmerProps) {
  const [local, rest] = splitProps(props, [
    "rounded",
    "width",
    "height",
    "class",
  ]);
  return (
    <div
      class={cn(shimmer({ rounded: local.rounded }), local.class)}
      style={{
        width: local.width ?? "100%",
        height: local.height ?? "1.25rem",
      }}
      {...rest}
    />
  );
}

export type { ShimmerProps };
