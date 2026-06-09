import { Avatar as ArkAvatar } from "@ark-ui/solid/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { createMemo, Show, splitProps } from "solid-js";

import { cn } from "../../cn";

const avatarSize = cva("rounded-full overflow-hidden", {
  variants: {
    size: {
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-12 w-12 text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface AvatarProps extends VariantProps<typeof avatarSize> {
  src?: string;
  name?: string;
  class?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function Avatar(props: AvatarProps) {
  const [local, rest] = splitProps(props, ["src", "name", "size", "class"]);

  const initials = createMemo(() => getInitials(local.name ?? "?"));

  return (
    <ArkAvatar.Root
      class={cn(
        avatarSize({ size: local.size }),
        "bg-md3-primary-container text-md3-on-primary-container inline-flex items-center justify-center font-medium",
        local.class,
      )}
      {...rest}
    >
      <Show
        when={local.src}
        fallback={<ArkAvatar.Fallback>{initials()}</ArkAvatar.Fallback>}
      >
        <ArkAvatar.Image
          src={local.src}
          alt={local.name ?? "Avatar"}
          class="h-full w-full object-cover"
        />
      </Show>
    </ArkAvatar.Root>
  );
}

export type { AvatarProps };
