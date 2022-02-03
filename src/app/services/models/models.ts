// export interface UiState {
//   openedRight: boolean;
// }

// export interface LoadingState {
//   loading: boolean;
//   last:{
//     id: string;
//     status:boolean;
//     component?:NamesLog,
//     desc:string
//   }
//   stack:string[];  
// }

// export interface StateOptions {
//   persist: 'NO' | 'YES' | 'DEMAND';
//   nameStore?: string;
// }


// export abstract class NavegationState {}


// export class NavEntity extends NavegationState{
//   constructor(public message:string){super()}
// }

 export interface Entity{
   id:string|number;
 }