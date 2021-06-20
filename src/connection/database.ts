import * as chalk from 'chalk';
import * as mongoose from 'mongoose';
import { Config } from '@config';

const { urlMain } = Config.db;

const onOpen = () => {
    console.info(chalk.green('[database] connected'));
};

const onError = (error: mongoose.Error) => {
    console.error(chalk.red(`[database] connection error: ${error.message}`));
    process.exit();
};

export const connect = () =>
    mongoose
        .connect(urlMain, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(onOpen)
        .catch(onError);

export const disconnect = () => mongoose.disconnect();

export const drop = () => mongoose.connection.dropDatabase();
