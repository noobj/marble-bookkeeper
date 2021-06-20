import * as Database from '@connection';
import { createServer } from '@marblejs/core';
import { IO } from 'fp-ts/lib/IO';
import { listener } from '@app';

const server = createServer({
    port: 1337,
    hostname: '0.0.0.0',
    listener,
});

const main: IO<void> = async () => {
    await Database.connect();
    await (
        await server
    )();
};

main();
