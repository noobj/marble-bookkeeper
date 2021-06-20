import { HttpEffect, HttpRequest } from '@marblejs/core';
import { of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import {
    getEntriesWithinCategories,
    QueryCollection,
} from '../model/entries.dao';

interface EntryCateSummary {
    categories: Category[];
    total: number;
}

interface Category {
    _id: number;
    name: string;
    entries: Entry[];
    sum: number;
    percentage: number;
    color: string;
}

interface Entry {
    _id: number;
    amount: number;
    date: string;
    descr: string;
}

export const getEntriesEffect$: HttpEffect = (req$) =>
    req$.pipe(
        mergeMap((req) =>
            of(req).pipe(
                map((req: HttpRequest) => req.query),
                map((query: QueryCollection) => ({
                    timeStartInput: query.timeStartInput,
                    timeEndInput: query.timeEndInput,
                    entriesSortByDate: query.entriesSortByDate,
                    categoriesExclude: [],
                })),
                mergeMap(getEntriesWithinCategories),
                map((categories: Category[]) =>
                    categories.filter(
                        (category) => category.entries.length != 0
                    )
                ),
                map((entries) => ({ body: entries }))
            )
        )
    );
