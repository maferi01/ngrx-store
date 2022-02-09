// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { ButtonComponent, ButtonModule } from 'projects/my-lib-display/src/lib/material/button/button.module';

export default {
  title: 'Example-Library/Button',
  component: ButtonComponent,
  argTypes: {
    backgroundColor: { control: 'color' },    
  },
  decorators: [
    moduleMetadata({
   //   declarations: [Button],
      imports: [ButtonModule],
    }),
  ],
} as Meta;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  component: ButtonComponent,
  props: {
    ...args
  },
});

export const Enabled = Template.bind({});
Enabled.args = {
  label: 'Button Library'
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Button Library',
  disabled: true
};


