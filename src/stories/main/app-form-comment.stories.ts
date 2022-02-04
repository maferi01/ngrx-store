// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { FormCommentComponent } from 'src/app/posts/components/form-comment/form-comment.component';
import { FormCommentModule } from 'src/app/posts/components/form-comment/form.comment.module';

export default {
  title: 'Main-App/Form-Comment',
  component: FormCommentComponent,
  decorators: [
    moduleMetadata({
   //   declarations: [Button],
      imports: [BrowserAnimationsModule, FormCommentModule],
    }),
  ],
} as Meta;

const Template: Story<FormCommentComponent> = (args: FormCommentComponent) => ({
  component:FormCommentComponent,
  props: args,
});

export const Enabled = Template.bind({});
Enabled.args = {
  
};



