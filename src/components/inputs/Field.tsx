import { Field as ArkField } from '@ark-ui/solid/field';
import { splitProps, type JSX } from 'solid-js';

import { cn } from '../../cn';

const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  HelperText: FieldHelperText,
  ErrorText: FieldErrorText,
};

function FieldRoot(props: JSX.HTMLAttributes<HTMLDivElement> & { invalid?: boolean; required?: boolean; disabled?: boolean; readOnly?: boolean }) {
  const [local, rest] = splitProps(props, ['invalid', 'required', 'disabled', 'readOnly', 'class', 'children']);
  return (
    <ArkField.Root
      invalid={local.invalid}
      required={local.required}
      disabled={local.disabled}
      readOnly={local.readOnly}
      class={cn('flex flex-col gap-1.5', local.class)}
      {...rest}
    >
      {local.children}
    </ArkField.Root>
  );
}

function FieldLabel(props: JSX.LabelHTMLAttributes<HTMLLabelElement>) {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <ArkField.Label class={cn('text-sm font-medium text-md3-on-surface', local.class)} {...rest}>
      {local.children}
    </ArkField.Label>
  );
}

function FieldHelperText(props: JSX.HTMLAttributes<HTMLSpanElement>) {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <ArkField.HelperText class={cn('text-xs text-md3-on-surface-variant', local.class)} {...rest}>
      {local.children}
    </ArkField.HelperText>
  );
}

function FieldErrorText(props: JSX.HTMLAttributes<HTMLSpanElement>) {
  const [local, rest] = splitProps(props, ['class', 'children']);
  return (
    <ArkField.ErrorText class={cn('text-xs text-md3-error', local.class)} {...rest}>
      {local.children}
    </ArkField.ErrorText>
  );
}

export { Field };