// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { FieldsModule } from 'projects/my-lib-display/src/lib/fields/fields.module';

import { FormModule } from 'projects/my-lib-display/src/lib/material/form/form.module';
import { MaterialFieldsModule } from 'projects/my-lib-display/src/lib/material/material-fields/material-fields.module';
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
      imports: [BrowserAnimationsModule, FormModule,MaterialFieldsModule,FieldsModule ],
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


