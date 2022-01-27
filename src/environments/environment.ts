// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlHostApi: 'http://localhost:3000',
  urlHostCalendarApi: 'http://localhost:8000',
  pathMonthDays:'month/formatbydays',
  pathIssues:'issue',
  pathWork:'month/work',
  pathWorkTask:'month/work/task',
  pathHollidays:'hollidays',
  pathContents: '/confluence/content/search',
  pathContent: '/confluence/content',
  urlApiLogin: '/login',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
