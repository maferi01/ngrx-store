// tslint:disable-next-line: no-namespace

export interface ErrorState {
  descKey: string;
  error: ErrorsApp.ErrorApp;
}

// tslint:disable-next-line: no-namespace
export namespace ErrorsApp {
  export class ErrorApp extends Error {
    constructor(message?: string, typeclass?) {
      super(message);
      fixProto(typeclass || ErrorApp, this);

      this.name = 'ErrorApp';
      this.message = message || 'Generic Error App';
    }
  }

  export class ErrorAuth extends ErrorApp {
    constructor(message?: string) {
      super(message, ErrorAuth);
      this.name = 'ErrorAuth';
      this.message = message || 'Error Authentification';
    }
  }

  export class ErrorServer extends ErrorApp {
    constructor(message?: string) {
      super(message, ErrorServer);
      this.name = 'ErrorServer';
      this.message = message || 'Error Server';
    }
  }


  /**
   * Fix protptype problem es5.
   * @param typeclass
   * @param inst
   */
  function fixProto(typeclass, inst) {
    inst.constructor = typeclass;
    inst.__proto__ = typeclass.prototype;
  }
}
