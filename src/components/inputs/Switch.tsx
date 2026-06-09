import { Switch as ArkSwitch } from "@ark-ui/solid/switch";
import { Show, splitProps } from "solid-js";

import { cn } from "../../cn";

interface SwitchProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  name?: string;
  value?: string | number;
  onCheckedChange?: (checked: boolean) => void;
  class?: string;
}

export function Switch(props: SwitchProps) {
  const [local, rest] = splitProps(props, [
    "label",
    "checked",
    "defaultChecked",
    "disabled",
    "invalid",
    "name",
    "value",
    "onCheckedChange",
    "class",
  ]);

  return (
    <ArkSwitch.Root
      {...rest}
      checked={local.checked}
      defaultChecked={local.defaultChecked}
      disabled={local.disabled}
      invalid={local.invalid}
      name={local.name}
      value={local.value}
      onCheckedChange={(details) => local.onCheckedChange?.(details.checked)}
      class={cn("inline-flex items-center gap-2", local.class)}
    >
      <ArkSwitch.Control
        class={cn(
          "relative inline-flex h-6.5 w-12 shrink-0 items-center rounded-full border-2 transition-colors duration-200",
          "data-[state=checked]:bg-md3-primary data-[state=unchecked]:bg-md3-surface-container-highest",
          "data-[state=checked]:border-md3-primary data-[state=unchecked]:border-md3-outline-variant",
        )}
      >
        <ArkSwitch.Thumb
          class={cn(
            "group absolute pointer-events-none flex rounded-full transition-transform duration-200 justify-center",
            "data-[state=checked]:size-4.5 data-[state=unchecked]:size-3",
            "data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1.5",
            "data-[state=checked]:bg-md3-on-primary data-[state=unchecked]:bg-md3-outline",
          )}
        >
          <span
            class={cn(
              "absolute material-symbols-outlined text-xl! leading-none",
              "group-data-[state=checked]:text-md3-on-surface-variant group-data-[state=unchecked]:text-md3-outline-variant",
              "group-data-[state=checked]:after:content-['check']",
            )}
          />
        </ArkSwitch.Thumb>
      </ArkSwitch.Control>
      <Show when={local.label}>
        <ArkSwitch.Label class="text-sm font-medium text-md3-on-surface cursor-pointer">
          {local.label}
        </ArkSwitch.Label>
      </Show>
      <ArkSwitch.HiddenInput />
    </ArkSwitch.Root>
  );
}

export type { SwitchProps };
