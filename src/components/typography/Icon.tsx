import { cva, type VariantProps } from "class-variance-authority";

const iconVariants = cva(
  "material-symbols-outlined shrink-0 leading-none after:content-[attr(data-icon)]",
  {
    variants: {
      size: {
        sm: "text-sm!",
        md: "text-base!",
        lg: "text-lg!",
        xl: "text-xl!",
        "2xl": "text-2xl!",
        "3xl": "text-3xl!",
        "4xl": "text-4xl!",
        "5xl": "text-5xl!",
        "6xl": "text-6xl!",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type IconVariants = VariantProps<typeof iconVariants>;

interface IconProps {
  name: string;
  size?: IconVariants["size"];
}

export function Icon(props: IconProps) {
  return (
    <span class={iconVariants({ size: props.size })} data-icon={props.name} />
  );
}
