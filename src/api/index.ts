import { combineRoutes, r } from '@marblejs/core';
import { versionEffect$, notFoundEffect$ } from './common/effects';
import { entries$ } from './entries/entries.api';

const root$ = r.pipe(
    r.matchPath('/'),
    r.matchType('GET'),
    r.useEffect(versionEffect$)
);

const notFound$ = r.pipe(
    r.matchPath('*'),
    r.matchType('*'),
    r.useEffect(notFoundEffect$)
);

// eslint-disable-next-line prettier/prettier
export const api$ = combineRoutes('/api/v1', [
    entries$,
    root$,
    notFound$
]);
