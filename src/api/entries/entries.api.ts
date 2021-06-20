import { combineRoutes, r } from '@marblejs/core';
import { getEntriesEffect$ } from './effects/getEntry.effect';

const getEntries$ = r.pipe(
    r.matchPath('/'),
    r.matchType('GET'),
    r.useEffect(getEntriesEffect$)
);

export const entries$ = combineRoutes('/entries', {
    effects: [getEntries$],
});
