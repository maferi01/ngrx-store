// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { MaterialFieldsModule } from 'my-lib-display';
import { FormModule } from 'projects/my-lib-display/src/lib/material/form/form.module';
import FormFieldsSelectsComponent from './formfields.selects.component';





export default {
  title: 'Example-Library/FormFieldsSelect',
  component: FormFieldsSelectsComponent,
  argTypes: {
    backgroundColor: { control: 'color' },    
  },
  decorators: [
    moduleMetadata({
      declarations: [FormFieldsSelectsComponent],
      imports: [BrowserAnimationsModule,FormModule ,MaterialFieldsModule],
    }),
  ],
} as Meta;


const Template: Story<FormFieldsSelectsComponent> = (args: FormFieldsSelectsComponent) => ({
  component: FormFieldsSelectsComponent,
  props: args,
});

export const FormFieldsAll = Template.bind({});
FormFieldsAll.args = {
  
};

// export const Disabled = Template.bind({});
// Disabled.args = {
//   label: 'Button Library',
//   disabled: true
// };


