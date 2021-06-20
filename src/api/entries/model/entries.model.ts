import { prop, Typegoose } from 'typegoose';

export class Entry extends Typegoose {
    @prop({ required: true })
    account_id?: string;

    @prop({ required: true })
    amount?: number;

    @prop({ required: true })
    category_id?: string;

    @prop({ required: true })
    date?: string;

    @prop({ required: true })
    descr?: string;

    @prop({ required: true })
    routine_id?: string;
}
