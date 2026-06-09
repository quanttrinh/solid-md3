import { Tabs as ArkTabs } from "@ark-ui/solid/tabs";
import { splitProps, type JSX } from "solid-js";

import { cn } from "../../cn";

interface TabsRootProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  class?: string;
  children?: JSX.Element;
}

function TabsRoot(props: TabsRootProps) {
  const [local, rest] = splitProps(props, [
    "value",
    "defaultValue",
    "onValueChange",
    "orientation",
    "class",
    "children",
  ]);

  return (
    <ArkTabs.Root
      value={local.value}
      defaultValue={local.defaultValue}
      onValueChange={(details) => local.onValueChange?.(details.value)}
      orientation={local.orientation}
      class={cn("flex flex-col gap-4", local.class)}
      {...rest}
    >
      {local.children}
    </ArkTabs.Root>
  );
}

function TabsList(
  props: JSX.HTMLAttributes<HTMLDivElement> & { class?: string },
) {
  const [local, rest] = splitProps(props, ["class", "children"]);
  return (
    <ArkTabs.List
      class={cn("border-md3-outline-variant flex gap-1 border-b", local.class)}
      {...rest}
    >
      {local.children}
    </ArkTabs.List>
  );
}

interface TabsTriggerProps {
  value: string;
  disabled?: boolean;
  class?: string;
  children?: JSX.Element;
}

function TabsTrigger(props: TabsTriggerProps) {
  const [local, rest] = splitProps(props, [
    "value",
    "disabled",
    "class",
    "children",
  ]);
  return (
    <ArkTabs.Trigger
      value={local.value}
      disabled={local.disabled}
      class={cn(
        "state-layer text-md3-label-lg border-md3-primary -mb-px border-b-2",
        "px-3 py-2 font-medium transition-colors",
        "data-[state=active]:text-md3-primary data-[state=active]:border-b-2 data-[state=active]:border-md3-primary",
        "data-[state=inactive]:text-md3-on-surface-variant data-[state=inactive]:border-transparent",
        "disabled:opacity-38 disabled:pointer-events-none",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </ArkTabs.Trigger>
  );
}

interface TabsContentProps {
  value: string;
  class?: string;
  children?: JSX.Element;
}

function TabsContent(props: TabsContentProps) {
  const [local, rest] = splitProps(props, ["value", "class", "children"]);
  return (
    <ArkTabs.Content
      value={local.value}
      class={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out text-md3-body-md text-md3-on-surface",
        local.class,
      )}
      {...rest}
    >
      {local.children}
    </ArkTabs.Content>
  );
}

TabsRoot.List = TabsList;
TabsRoot.Trigger = TabsTrigger;
TabsRoot.Content = TabsContent;

export { TabsRoot as Tabs, type TabsRootProps as TabsProps };
