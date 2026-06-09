import { createListCollection } from '@ark-ui/solid';
import {
  Accordion,
  Anchor,
  Avatar,
  Banner,
  Block,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  Checkbox,
  Combobox,
  DataBlock,
  DelayedSpinner,
  Divider,
  EmptyState,
  Field,
  Label,
  LoadingSpinner,
  Modal,
  NumberInput,
  PageTitle,
  Pagination,
  Pill,
  Progress,
  RadioGroup,
  ScrollArea,
  SectionTitle,
  Select,
  Shimmer,
  Slider,
  Switch,
  Tabs,
  TagsInput,
  Text,
  TextField,
  Tooltip,
} from '@sgreengolf/ui';
import { createMemo, createSignal, For, Show } from 'solid-js';

function Section(props: { title: string; children: any }) {
  return (
    <div class="mb-12">
      <SectionTitle>{props.title}</SectionTitle>
      <div class="mt-4">{props.children}</div>
    </div>
  );
}

const sampleOptions = [
  'Apple', 'Banana', 'Cherry', 'Dragonfruit', 'Elderberry', 'Fig',
  'Grape', 'Honeydew', 'Kiwi', 'Lemon', 'Mango', 'Nectarine',
  'Orange', 'Papaya', 'Quince', 'Raspberry', 'Strawberry', 'Tangerine',
  'Ugli Fruit', 'Watermelon',
];

export default function App() {
  const [selectVal, setSelectVal] = createSignal<string[]>([]);
  const [comboVal, setComboVal] = createSignal<string[]>([]);
  const [tags, setTags] = createSignal<string[]>(['solid', 'tailwind']);
  const [modalOpen, setModalOpen] = createSignal(false);
  const [textVal, setTextVal] = createSignal('');
  const [page, setPage] = createSignal(1);
  const [data, setData] = createSignal<string | null>(null);
  const [checked, setChecked] = createSignal(false);
  const [switchOn, setSwitchOn] = createSignal(true);
  const [radioVal, setRadioVal] = createSignal('individual');
  const [numVal, setNumVal] = createSignal('5');
  const [sliderVal, setSliderVal] = createSignal<number[]>([40]);
  const [progressVal, setProgressVal] = createSignal(60);
  const [toggleVal, setToggleVal] = createSignal<string[]>(['list']);
  const [accordionVal, setAccordionVal] = createSignal<string[]>(['item-1']);
  const [tabVal, setTabVal] = createSignal('tab-1');

  const sampleCollection = createMemo(() => createListCollection({ items: sampleOptions }));

  return (
    <Block variant="page" class="gap-8 p-8">
      <PageTitle>solid-md3 Demo</PageTitle>

      <Section title="Color Palette">
        <div class="flex flex-wrap gap-2">
          <div class="bg-md3-primary text-md3-on-primary rounded-md3-sm px-4 py-2 text-sm font-medium">Primary</div>
          <div class="bg-md3-primary-container text-md3-on-primary-container rounded-md3-sm px-4 py-2 text-sm font-medium">Primary Container</div>
          <div class="bg-md3-secondary text-md3-on-secondary rounded-md3-sm px-4 py-2 text-sm font-medium">Secondary</div>
          <div class="bg-md3-secondary-container text-md3-on-secondary-container rounded-md3-sm px-4 py-2 text-sm font-medium">Secondary Container</div>
          <div class="bg-md3-surface text-md3-on-surface border border-md3-outline-variant rounded-md3-sm px-4 py-2 text-sm font-medium">Surface</div>
          <div class="bg-md3-surface-container-high text-md3-on-surface rounded-md3-sm px-4 py-2 text-sm font-medium">Surface High</div>
          <div class="bg-md3-error text-md3-on-error rounded-md3-sm px-4 py-2 text-sm font-medium">Error</div>
        </div>
      </Section>

      <Section title="Typography">
        <div class="space-y-1">
          <Label>Typography Scale</Label>
          <div class="text-md3-display-sm">Display Small</div>
          <div class="text-md3-headline-lg">Headline Large</div>
          <div class="text-md3-headline-sm">Headline Small</div>
          <div class="text-md3-title-lg">Title Large</div>
          <div class="text-md3-title-md">Title Medium</div>
          <div class="text-md3-body-lg">Body Large</div>
          <div class="text-md3-body-md">Body Medium</div>
          <div class="text-md3-label-lg">Label Large</div>
          <div class="text-md3-label-md">Label Medium</div>
        </div>
      </Section>

      <Section title="Buttons">
        <div class="flex flex-wrap items-center gap-3">
          <Button variant="filled">Filled</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
          <Button variant="elevated">Elevated</Button>
          <Button variant="tonal">Tonal</Button>
        </div>
        <div class="mt-3 flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button variant="filled" disabled>Disabled</Button>
          <Button variant="outlined" iconOnly aria-label="Star">
            <span class="material-symbols-outlined text-lg">star</span>
          </Button>
        </div>
      </Section>

      <Section title="Anchors">
        <div class="flex flex-wrap items-center gap-3">
          <Anchor href="#">Default Link</Anchor>
          <Anchor href="#" variant="filled">Filled</Anchor>
          <Anchor href="#" variant="outlined">Outlined</Anchor>
          <Anchor href="#" preset="forward">Forward</Anchor>
          <Anchor href="#" preset="new-tab">New Tab</Anchor>
          <Anchor href="#" preset="download">Download</Anchor>
        </div>
      </Section>

      <Section title="Button Group">
        <ButtonGroup value={toggleVal()} onValueChange={setToggleVal}>
          <ButtonGroup.Item value="list">List</ButtonGroup.Item>
          <ButtonGroup.Item value="grid">Grid</ButtonGroup.Item>
          <ButtonGroup.Item value="table">Table</ButtonGroup.Item>
        </ButtonGroup>
      </Section>

      <Section title="Cards & Blocks">
        <Block variant="grid">
          <Card variant="elevated">
            <Text weight="semibold">Elevated Card</Text>
            <Text size="sm" secondary>Shadow with container-low background.</Text>
          </Card>
          <Card variant="filled">
            <Text weight="semibold">Filled Card</Text>
            <Text size="sm" secondary>Container-highest background.</Text>
          </Card>
          <Card variant="outlined">
            <Text weight="semibold">Outlined Card</Text>
            <Text size="sm" secondary>Surface with outline border.</Text>
          </Card>
        </Block>
        <Block variant="between" class="mt-4">
          <Text>Between layout</Text>
          <Button size="sm">Action</Button>
        </Block>
      </Section>

      <Section title="Divider">
        <div class="flex flex-col gap-3">
          <Text>Regular divider</Text>
          <Divider />
          <Text>Strong divider</Text>
          <Divider weight="strong" />
        </div>
        <div class="mt-4 flex items-center gap-4">
          <Text>Left</Text>
          <Divider orientation="vertical" />
          <Text>Right</Text>
        </div>
      </Section>

      <Section title="Accordion">
        <Accordion value={accordionVal()} onValueChange={setAccordionVal} multiple>
          <Accordion.Item value="item-1" title="First Section" description="A description here">
            <p>Content for the first accordion item.</p>
          </Accordion.Item>
          <Accordion.Item value="item-2" title="Second Section">
            <p>Content for the second accordion item.</p>
          </Accordion.Item>
          <Accordion.Item value="item-3" title="Disabled Section" disabled>
            <p>This should not be visible.</p>
          </Accordion.Item>
        </Accordion>
      </Section>

      <Section title="Empty State">
        <EmptyState
          icon={<span class="material-symbols-outlined text-4xl">inbox</span>}
          title="No devices found"
          description="Try adjusting your filters or add a new device."
        >
          <Button size="sm" variant="tonal">Add Device</Button>
        </EmptyState>
      </Section>

      <Section title="Text Field">
        <div class="flex max-w-sm flex-col gap-4">
          <TextField
            label="Default"
            placeholder="Type something..."
            value={textVal()}
            onInput={(e) => setTextVal((e.target as HTMLInputElement).value)}
          />
          <TextField
            label="With helper"
            helperText="This is helper text"
            value={textVal()}
            onInput={(e) => setTextVal((e.target as HTMLInputElement).value)}
          />
          <TextField
            label="With error"
            error="This field is required"
            value=""
            onInput={() => {}}
          />
        </div>
      </Section>

      <Section title="Field (composable)">
        <div class="max-w-sm">
          <Field>
            <Field.Label>Custom field</Field.Label>
            <input
              class="rounded-md3-sm border border-md3-outline-variant bg-md3-surface-container-lowest h-10 w-full px-3 text-sm outline-none focus:border-md3-primary focus:ring-1 focus:ring-md3-primary"
              placeholder="Using Field primitives directly"
            />
            <Field.HelperText>Helper text from Field.HelperText</Field.HelperText>
          </Field>
        </div>
      </Section>

      <Section title="Select">
        <div class="max-w-xs">
          <Select
            collection={sampleCollection()}
            value={selectVal()}
            onValueChange={(v) => setSelectVal(v.value)}
            placeholder="Choose a fruit..."
          />
        </div>
        <Text size="sm" secondary class="mt-2">Selected: {selectVal().join(', ') || '(none)'}</Text>
      </Section>

      <Section title="Combobox">
        <div class="max-w-xs">
          <Combobox
            collection={sampleCollection()}
            value={comboVal()}
            onValueChange={(v) => setComboVal(v.value)}
            placeholder="Search fruits..."
          />
        </div>
        <Text size="sm" secondary class="mt-2">Selected: {comboVal() || '(none)'}</Text>
      </Section>

      <Section title="Tags Input">
        <div class="max-w-sm">
          <TagsInput value={tags()} onValueChange={setTags} placeholder="Add tag..." />
        </div>
        <Text size="sm" secondary class="mt-2">Tags: {tags().join(', ')}</Text>
      </Section>

      <Section title="Checkbox">
        <div class="flex flex-col gap-3">
          <Checkbox checked={checked()} onCheckedChange={(c) => setChecked(c === true)} label="Accept terms" />
          <Checkbox label="With description" description="Additional context here" />
          <Checkbox checked="indeterminate" label="Indeterminate" />
          <Checkbox disabled label="Disabled" />
        </div>
      </Section>

      <Section title="Switch">
        <Switch checked={switchOn()} onCheckedChange={setSwitchOn} label="Enable notifications" />
      </Section>

      <Section title="Radio Group">
        <RadioGroup value={radioVal()} onValueChange={setRadioVal}>
          <RadioGroup.Item value="individual" label="Individual" description="A single person" />
          <RadioGroup.Item value="entity" label="Entity" description="A company or organization" />
        </RadioGroup>
        <Text size="sm" secondary class="mt-2">Selected: {radioVal()}</Text>
      </Section>

      <Section title="Number Input">
        <div class="max-w-xs">
          <NumberInput value={numVal()} onValueChange={(d) => setNumVal(d.value)} min={0} max={100} step={1} />
        </div>
      </Section>

      <Section title="Slider">
        <div class="max-w-sm">
          <Slider value={sliderVal()} onValueChange={(d) => setSliderVal(d.value)} min={0} max={100} step={5} labels={['0', '50', '100']} />
        </div>
        <Text size="sm" secondary class="mt-2">Value: {sliderVal()[0]}</Text>
      </Section>

      <Section title="Pill">
        <div class="flex flex-wrap gap-2">
          <Pill variant="filled">Filled</Pill>
          <Pill variant="tonal">Tonal</Pill>
          <Pill variant="outlined">Outlined</Pill>
          <Pill variant="error">Error</Pill>
          <Pill variant="warning">Warning</Pill>
          <Pill variant="surface">Surface</Pill>
        </div>
      </Section>

      <Section title="Progress">
        <div class="max-w-sm">
          <Progress value={progressVal()} />
        </div>
        <div class="mt-3 flex items-center gap-2">
          <Button size="sm" variant="outlined" onClick={() => setProgressVal(Math.max(0, progressVal() - 10))}>-10</Button>
          <Button size="sm" variant="outlined" onClick={() => setProgressVal(Math.min(100, progressVal() + 10))}>+10</Button>
          <Text size="sm" secondary>{progressVal()}%</Text>
        </div>
      </Section>

      <Section title="Shimmer / Data Block">
        <div class="flex flex-col gap-3">
          <Shimmer width="12rem" height="1.25rem" />
          <Shimmer width="6rem" height="1rem" rounded="full" />
          <DataBlock value={data()}>{(v) => <Text>{v}</Text>}</DataBlock>
          <Button size="sm" onClick={() => setData(data() ? null : 'Hello from DataBlock!')}>
            {data() ? 'Clear' : 'Set value'}
          </Button>
        </div>
      </Section>

      <Section title="Banner">
        <div class="flex flex-col gap-3">
          <Banner variant="info" text="This is an informational banner." />
          <Banner variant="warning" text="This is a warning banner." onClose={() => {}} />
          <Banner variant="error" text="Something went wrong." />
          <Banner variant="success" text="Operation completed successfully." />
        </div>
      </Section>

      <Section title="Tooltip">
        <div class="flex items-center gap-3">
          <Tooltip content="Tooltip on top" placement="top">
            <Button variant="outlined" size="sm">Hover me (top)</Button>
          </Tooltip>
          <Tooltip content="Tooltip on right" placement="right">
            <Button variant="outlined" size="sm">Hover me (right)</Button>
          </Tooltip>
        </div>
      </Section>

      <Section title="Modal">
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Modal open={modalOpen()} onOpenChange={setModalOpen} width="small">
          <Modal.Header title="Confirm Action" onClose={() => setModalOpen(false)} />
          <Modal.Body>
            <Text size="sm">Are you sure you want to proceed? This action cannot be undone.</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outlined" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setModalOpen(false)}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </Section>

      <Section title="Tabs">
        <Tabs value={tabVal()} onValueChange={setTabVal}>
          <Tabs.List>
            <Tabs.Trigger value="tab-1">Overview</Tabs.Trigger>
            <Tabs.Trigger value="tab-2">Details</Tabs.Trigger>
            <Tabs.Trigger value="tab-3" disabled>Disabled</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab-1"><Text size="sm">Overview content here.</Text></Tabs.Content>
          <Tabs.Content value="tab-2"><Text size="sm">Details content here.</Text></Tabs.Content>
        </Tabs>
      </Section>

      <Section title="Breadcrumb">
        <Breadcrumb items={[
          { label: 'Home', href: '#' },
          { label: 'Devices', href: '#' },
          { label: 'Device Details' },
        ]} />
      </Section>

      <Section title="Avatar">
        <div class="flex items-center gap-3">
          <Avatar src="https://i.pravatar.cc/100?img=1" name="John Doe" size="sm" />
          <Avatar src="https://i.pravatar.cc/100?img=2" name="Jane Smith" size="md" />
          <Avatar name="Alice Wonder" size="lg" />
          <Avatar name="Bob" size="md" />
        </div>
      </Section>

      <Section title="Pagination">
        <Pagination count={100} pageSize={10} page={page()} onPageChange={setPage} />
        <Text size="sm" secondary class="mt-2">Page {page()} of 10</Text>
      </Section>

      <Section title="Loading & Delayed Spinner">
        <LoadingSpinner />
        <DelayedSpinner loading={true} delay={500} />
      </Section>

      <Section title="ScrollArea">
        <ScrollArea class="rounded-md3-sm border-md3-outline-variant bg-md3-surface h-40 max-w-sm border p-3 pr-1">
          <div class="space-y-2">
            <For each={Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`)}>
              {(item) => (
                <div class="rounded-md3-xs bg-md3-surface-container-highest px-3 py-2 text-sm">{item}</div>
              )}
            </For>
          </div>
        </ScrollArea>
      </Section>
    </Block>
  );
}