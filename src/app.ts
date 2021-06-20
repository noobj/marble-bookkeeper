import { httpListener } from "@marblejs/core";
import { bodyParser$ } from "@marblejs/middleware-body";
import { logger$, cors$ } from "api/common/middlewares";
import { api$ } from "api";

const middlewares = [cors$, logger$, bodyParser$()];

const effects = [api$];

export const listener = httpListener({ middlewares, effects });
