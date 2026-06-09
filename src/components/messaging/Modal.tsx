import { Dialog as ArkDialog } from '@ark-ui/solid/dialog';
import { Show, splitProps, type JSX } from 'solid-js';
import { Portal } from 'solid-js/web';

import { cn } from '../../cn';

const widthPresets: Record<string, string> = {
  mini: 'sm:max-w-xs',
  small: 'sm:max-w-md',
  medium: 'sm:max-w-2xl',
  large: 'sm:max-w-4xl',
};

interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  width?: 'mini' | 'small' | 'medium' | 'large';
  children?: JSX.Element;
  class?: string;
  closeOnInteractOutside?: boolean;
}

function ModalRoot(props: ModalProps) {
  const [local, rest] = splitProps(props, [
    'open',
    'defaultOpen',
    'onOpenChange',
    'width',
    'children',
    'class',
    'closeOnInteractOutside',
  ]);

  return (
    <ArkDialog.Root
      open={local.open}
      defaultOpen={local.defaultOpen}
      onOpenChange={(details) => local.onOpenChange?.(details.open)}
      closeOnInteractOutside={local.closeOnInteractOutside ?? true}
      lazyMount
      unmountOnExit
    >
      <Portal>
        <ArkDialog.Backdrop class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in fixed inset-0 z-50 bg-black/40" />
        <ArkDialog.Positioner class="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <ArkDialog.Content
            class={cn(
              'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
              'border-md3-outline-variant bg-md3-surface-container shadow-md3-elevation-3',
              'relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-xl border outline-none sm:rounded-xl',
              widthPresets[local.width ?? 'mini'] ?? 'sm:max-w-md',
              local.class,
            )}
          >
            {local.children}
          </ArkDialog.Content>
        </ArkDialog.Positioner>
      </Portal>
    </ArkDialog.Root>
  );
}

interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
  class?: string;
}

function ModalHeader(props: ModalHeaderProps) {
  const [local, rest] = splitProps(props, ['title', 'onClose', 'class']);
  return (
    <div class={cn('border-md3-outline-variant flex items-center justify-between gap-4 border-b px-6 py-4', local.class)} {...rest}>
      <ArkDialog.Title class="text-md3-title-md text-md3-on-surface font-semibold">
        {local.title}
      </ArkDialog.Title>
      <Show when={local.onClose}>
        <ArkDialog.CloseTrigger
          onClick={local.onClose}
          class="state-layer text-md3-on-surface-variant rounded-full flex h-8 w-8 items-center justify-center transition-colors"
        >
          <span class="material-symbols-outlined text-lg">close</span>
        </ArkDialog.CloseTrigger>
      </Show>
    </div>
  );
}

function ModalBody(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <div class={cn('scrollbar-hide flex-1 overflow-y-auto px-6 py-4', local.class)} {...rest}>
      {local.children}
    </div>
  );
}

function ModalFooter(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <div
      class={cn('border-md3-outline-variant flex items-center justify-end gap-3 border-t px-6 py-4', local.class)}
      {...rest}
    >
      {local.children}
    </div>
  );
}

ModalRoot.Header = ModalHeader;
ModalRoot.Body = ModalBody;
ModalRoot.Footer = ModalFooter;

export { ModalRoot as Modal, type ModalProps };