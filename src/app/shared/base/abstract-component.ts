import { ComponentType } from '@angular/cdk/portal';
import {
  ChangeDetectorRef,
  ComponentFactoryResolver,
  Directive,
  Injector,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, Subject, throwError } from 'rxjs';
import { catchError, finalize, map, takeUntil, tap } from 'rxjs/operators';
import { ErrorsApp } from 'src/app/services/models/error';
import { prepare } from 'src/app/services/utils/indicate';
import { ErrorStoreService } from 'src/app/shared/loading/services/error-store.service';

import { AbstractDialogComponent } from '../../abstractcomps/dialog/abstract-dialog/abstract-dialog.component';
import { DialogService } from '../../abstractcomps/dialog/dialog.service';
import { NavegationState } from '../../services/models/models';
import { NavegationQueryService } from '../../services/queries/navegation-query.service';
import { NavegationStoreService } from '../../services/stores/navegation-store.service';
import { NamesLog } from '../../services/utils/names-classes';
import { LoadingStoreService } from '../loading/services/loading-store.service';
import { AbstractApp } from './abstract-app';

@Directive()
export abstract class AbstractComponent extends AbstractApp implements OnInit,OnChanges, OnDestroy {
  
  errorStore: ErrorStoreService;
  loadingStore: LoadingStoreService;
  navStore: NavegationStoreService<NavegationState>;
  navQuery: NavegationQueryService;
  router: Router;
  activatedRouter: ActivatedRoute;
  protected viewContainerRef: ViewContainerRef;
  protected componentFactoryResolver: ComponentFactoryResolver;
  protected dialogServ: DialogService;
  changeDetectorRef: ChangeDetectorRef;

  
  constructor(protected injector: Injector,@Optional() protected  nameLogNew?:NamesLog) {
    super(injector,nameLogNew);
    
    this.errorStore = this.injector.get(ErrorStoreService);
    this.loadingStore = this.injector.get(LoadingStoreService);
    this.navStore = this.injector.get(NavegationStoreService);
    this.navQuery = this.injector.get(NavegationQueryService);
    this.router = this.injector.get(Router);
    this.activatedRouter = this.injector.get(ActivatedRoute);
    this.viewContainerRef = this.injector.get(ViewContainerRef);
    this.changeDetectorRef = this.injector.get(ChangeDetectorRef);
    this.componentFactoryResolver = this.injector.get(ComponentFactoryResolver);
    this.dialogServ = this.injector.get(DialogService);

    
  }
  
  // control error
  showError = false;
  protected _showLoad = false;
  public get showLoad() {
    return this._showLoad;
  }
  
  
  subjectDest = new Subject();
  
  ngOnInit(): void {
    this.console.debug('On Init...');
  }
  
  ngOnDestroy(): void {
    this.console.debug('Destroy component');
    this.errorStore.updateState(null);
    this.subjectDest.next();
  }
 
 
  ngOnChanges(changes: SimpleChanges): void {
    this.console.debug('Changes Inputs', {...changes});
  }
  
  ngAfterViewChecked(){
    //this.console.debug('Do check');
  }


  protected checkError(err: ErrorsApp.ErrorApp, id?: string):Observable<never> {
    this.console.error('Error Component',id, err);
    this.showError = true;

    this.errorStore.nextError(err);
    return EMPTY;
  }

  protected setShowLoad(value: boolean, id?: string, desc?:string) {
    this.loadingStore.updateLoading(value, id, this.nameLog ,desc);
    this._showLoad = value;
  }


  


  rxInd<T>(emitLoad=true,desc?:string,catchErr=true): (source: Observable<T>) => Observable<T> {
    const key = Math.random().toString(32);
    return (source: Observable<T>): Observable<T> => source.pipe(
      prepare(() =>(emitLoad)?this.setShowLoad(true,key,desc):null),
      tap(
        (d) => {
           desc?this.console.debug( `Tap value ${desc}`,d):null;    
        },
        (er) => {
          if(catchErr)this.checkError(er, key);
        },
        () => {
        }
      ),
      takeUntil(this.subjectDest),
      catchError((er) => catchErr?this.checkError(er, key): throwError(er)),
      finalize(()=>desc?this.console.debug('Finalize --',desc,key):null),
      finalize(() =>emitLoad?this.setShowLoad(false,key,desc):null)
    )
  }

  protected getIdLoad() {
    return Math.random().toString(32);
  }


  navigate(url: string, state?: object): Promise<boolean> {
    return this.router.navigateByUrl(url, { state });
  }

  getStateRouter<T>(): Observable<T> {
    return this.activatedRouter.paramMap.pipe(map(() => window.history.state));
  }

  openDialog<T extends AbstractDialogComponent, S>(compDialog: ComponentType<T>, data?: object): Observable<S> {
    return this.dialogServ.openDialog(compDialog, data, this.viewContainerRef, this.componentFactoryResolver);
  }
}
