// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { PaginatorComponent, PaginatorModule } from 'projects/my-lib-display/src/lib/material/paginator/paginator.module';

export default {
  title: 'Example-Library/Paginator',
  component: PaginatorComponent,
  argTypes: {
    backgroundColor: { control: 'color' },    
  },
  decorators: [
    moduleMetadata({
      imports: [PaginatorModule],
    }),
  ],
} as Meta;

const Template: Story<PaginatorComponent> = (args: PaginatorComponent) => ({
  component: PaginatorComponent,
  props: args,
});

export const PaginatorEnable = Template.bind({});
PaginatorEnable.args = {  
};



