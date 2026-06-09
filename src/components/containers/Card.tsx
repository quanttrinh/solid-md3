import { type JSX } from "solid-js";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../cn";

const card = cva("rounded-2xl p-6 transition-all", {
  variants: {
    variant: {
      elevated: "bg-md3-surface-container-low shadow-md3-elevation-1",
      filled: "bg-md3-surface-container-highest",
      outlined: "border border-md3-outline-variant bg-md3-surface",
    },
  },
  defaultVariants: {
    variant: "elevated",
  },
});

type CardProps = VariantProps<typeof card> & {
  class?: string;
  children: JSX.Element;
};

export function Card(props: CardProps) {
  return (
    <div class={cn(card({ variant: props.variant }), props.class)}>
      {props.children}
    </div>
  );
}

export type { CardProps };
