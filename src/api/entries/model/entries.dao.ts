import { from } from 'rxjs';
import { Entry } from './entries.model';
import { Category } from './categories.model';
import * as moment from 'moment';

const model = new Category().getModelForClass(Category);
const test = new Entry().getModelForClass(Entry);
export const findAll = () => from(test.find().exec());

export type QueryCollection = {
    timeStartInput: string;
    timeEndInput: string;
    entriesSortByDate: boolean;
    categoriesExclude: [string] | [];
};

export const getEntriesWithinCategories = ({
    timeStartInput = moment().add(-30, 'days').toISOString(),
    timeEndInput = moment().add(0, 'days').toISOString(),
    entriesSortByDate = true,
    categoriesExclude = [],
}: QueryCollection) => {
    // Set the time range, if the date format is wrong then get the previous 30 days
    const timeStart = moment(timeStartInput, 'YYYY-MM-DD', true).isValid()
        ? timeStartInput
        : moment().add(-30, 'days').toISOString();
    const timeEnd = moment(timeEndInput, 'YYYY-MM-DD', true).isValid()
        ? timeEndInput
        : moment().add(0, 'days').toISOString();

    // Used for deciding sort by which column, amount by default
    const sortByWhichColumn = entriesSortByDate ? 'date' : 'amount';

    const sort = {};
    sort[sortByWhichColumn] = -1;

    const andCondition = [
        { $gte: ['$date', timeStart] },
        { $lte: ['$date', timeEnd] },
        { $eq: ['$category_id', '$$cate_id'] },
    ];
    // andCondition = andCondition.concat(
    //     categoriesExclude.map((x) => {
    //         return { $ne: ['$category_id', x] };
    //     })
    // );
    return from(
        model.aggregate([
            {
                $lookup: {
                    as: 'entries',
                    from: 'entries',
                    let: {
                        cate_id: '$_id',
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: andCondition,
                                },
                            },
                        },
                        { $project: { amount: 1, date: 1, descr: 1 } },
                        { $sort: { amount: -1 } },
                    ],
                },
            },
        ])
    );
};
