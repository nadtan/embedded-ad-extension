// (C) 2007-2018 GoodData Corporation
import * as queryString from 'query-string';

function safeMatch(regExp, group = 1) {
    return (str) => {
        return (str.match(regExp) || [])[group];
    };
}

const extractors = {
    project: {
        projectId: safeMatch(/#\/(\w+)/),
        reportId: safeMatch(/#\/\w+\/([^/?]+)/),
        forceReload: (str: string) => /#(\/\w+){2,}\/reload(\W|$)/.test(str)
    },

    client: {
        clientId: safeMatch(/#\/client\/\w+:(\w+)/),
        productId: safeMatch(/#\/client\/(\w+):\w/),
        reportId: safeMatch(/#\/client\/\w+:\w+\/([^/?]+)/),
        forceReload: (str) => /#\/client(\/[^/]+?){2,}\/reload(\W|$)/.test(str)
    }
};

function isHashWithClient(hash) {
    return hash.startsWith('/#/client');
}

function parseQuery(hash) {
    const queryPart = queryString.extract(hash);
    return queryString.parse(queryPart);
}

function parseHashWithClient(hash) {
    return {
        clientId: extractors.client.clientId(hash),
        productId: extractors.client.productId(hash),
        reportId: extractors.client.reportId(hash),
        forceReload: extractors.client.forceReload(hash),
        query: parseQuery(hash)
    };
}

function parseHashWithProject(hash) {
    return {
        projectId: extractors.project.projectId(hash),
        reportId: extractors.project.reportId(hash),
        forceReload: extractors.project.forceReload(hash),
        query: parseQuery(hash)
    };
}

export function parseUrl(url) {
    const hash = `/#${url.split('#')[1]}`;

    if (isHashWithClient(hash)) {
        return parseHashWithClient(hash);
    }

    return parseHashWithProject(hash);
}
