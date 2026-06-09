import { Field } from '@ark-ui/solid/field';
import { splitProps, type JSX } from 'solid-js';

import { cn } from '../../cn';

export interface TextFieldProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function TextField(props: TextFieldProps) {
  const [local, rest] = splitProps(props, ['label', 'error', 'helperText', 'class']);

  return (
    <Field.Root class="flex flex-col gap-1.5" invalid={!!local.error}>
      {local.label && (
        <Field.Label class="text-sm font-medium text-md3-on-surface">{local.label}</Field.Label>
      )}
      <Field.Input
        {...rest}
        class={cn(
          'rounded-md3-sm border bg-md3-surface-container-lowest px-3 py-1.5 text-sm text-md3-on-surface outline-none transition-colors placeholder:text-md3-on-surface-variant w-full h-10',
          'hover:border-md3-outline focus:border-md3-primary focus:ring-md3-primary focus:ring-1',
          local.error ? 'border-md3-error' : 'border-md3-outline-variant',
          local.error ? 'focus:border-md3-error focus:ring-md3-error' : 'focus:border-md3-primary focus:ring-md3-primary',
          local.class,
        )}
      />
      {local.helperText && !local.error && (
        <Field.HelperText class="text-xs text-md3-on-surface-variant">
          {local.helperText}
        </Field.HelperText>
      )}
      {local.error && (
        <Field.ErrorText class="text-xs text-md3-error">{local.error}</Field.ErrorText>
      )}
    </Field.Root>
  );
}
