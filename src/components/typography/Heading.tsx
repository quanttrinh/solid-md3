import { splitProps, type Component, type JSX } from 'solid-js';

import { cn } from '../../cn';

interface HeadingProps {
  class?: string;
  children: JSX.Element;
}

export const PageTitle: Component<HeadingProps> = (props) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <h2 class={cn('text-md3-headline-sm font-medium leading-tight', local.class)} {...rest}>
      {local.children}
    </h2>
  );
};

export const SectionTitle: Component<HeadingProps> = (props) => {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <h3 class={cn('text-md3-primary text-lg font-medium', local.class)} {...rest}>
      {local.children}
    </h3>
  );
};
