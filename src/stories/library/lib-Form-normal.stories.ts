// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { FieldsModule } from 'projects/my-lib-display/src/lib/fields/fields.module';
import { FormModule } from 'projects/my-lib-display/src/lib/material/form/form.module';
import FormFieldsNormalComponent from './formfields.normal.component';




export default {
  title: 'Example-Library/FormFieldsNormal',
  component: FormFieldsNormalComponent,
  argTypes: {
    backgroundColor: { control: 'color' },    
  },
  decorators: [
    moduleMetadata({
      declarations: [FormFieldsNormalComponent],
      imports: [ReactiveFormsModule,FormModule,FieldsModule ],
    }),
  ],
} as Meta;


const Template: Story<FormFieldsNormalComponent> = (args: FormFieldsNormalComponent) => ({
  component: FormFieldsNormalComponent,
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


