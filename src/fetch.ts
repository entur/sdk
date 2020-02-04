import nodeFetch, { RequestInit, RequestInfo } from "node-fetch";
import { HttpsAgent as Agent } from "agentkeepalive";

const agent = new Agent({
    keepAlive: true
});

export default (url: RequestInfo, init?: RequestInit) =>
    nodeFetch(url, {
        agent,
        ...init
    });
