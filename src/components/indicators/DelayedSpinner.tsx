import { createEffect, createSignal, onCleanup, Show } from 'solid-js';

import { LoadingSpinner } from './LoadingSpinner';

export interface DelayedSpinnerProps {
  loading: boolean;
  delay?: number;
}

export function DelayedSpinner(props: DelayedSpinnerProps) {
  const [show, setShow] = createSignal(false);
  let timer: ReturnType<typeof setTimeout>;

  createEffect(() => {
    if (props.loading) {
      timer = setTimeout(() => setShow(true), props.delay ?? 100);
    } else {
      clearTimeout(timer);
      setShow(false);
    }
    onCleanup(() => clearTimeout(timer));
  });

  return (
    <Show when={show()}>
      <LoadingSpinner />
    </Show>
  );
}
