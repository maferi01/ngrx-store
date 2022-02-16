import { ErrorHandler, Inject, Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { errorHandlerAngular } from "src/app/store/actions/error.actions";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    handleError(error: any) {
        const store = this.injector.get(Store);
        const router = this.injector.get(Router);
        try {
            store.dispatch(errorHandlerAngular({ error: error.message || error}))
        }
        catch (e) {
            console.error('Error sending store',  e)
        }
        console.error('Erro in handler',error.message, error)
        //router.navigate(['error']);  
    }
    constructor(private injector: Injector) {

    }
}