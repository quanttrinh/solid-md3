export function LoadingSpinner() {
  return (
    <div class="flex items-center justify-center py-12">
      <div class="flex flex-col items-center gap-3">
        <div class="border-md3-outline-variant border-t-md3-primary h-8 w-8 animate-spin rounded-full border-2" />
        <span class="text-md3-on-surface-variant text-sm">Loading...</span>
      </div>
    </div>
  );
}
