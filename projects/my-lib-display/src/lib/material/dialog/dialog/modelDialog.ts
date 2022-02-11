import { IWithForm, IWithFormButtons } from "../../form/mixinsForm";
import { AbstractDialogComponent } from "../dialog.module";


export interface IDialog extends AbstractDialogComponent,Partial<IWithForm>, Partial<IWithFormButtons>{

    
}