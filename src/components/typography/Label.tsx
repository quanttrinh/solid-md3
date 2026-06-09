import { splitProps, type Component, type JSX } from 'solid-js';

import { cn } from '../../cn';

export interface LabelProps {
  class?: string;
  children: JSX.Element;
}

export const Label: Component<LabelProps> = (props) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <label
      class={cn('text-md3-on-surface-variant text-xs uppercase tracking-wide', local.class)}
      {...rest}
    >
      {local.children}
    </label>
  );
};
