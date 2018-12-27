export function createMessage(data) {
    const obj = formatParams(data);

    return {
        "gdc": {
            "product": "analyticalDesigner",
            "event": {
                "name": "openInsight",
                "data": {...obj}
            }
        }
    };
}

export function formatMessage(data) {
    let msg = '';
    const spaces = '            ';
    const obj = formatParams(data);
    const keys = Object.keys(obj);

    keys.forEach((key, index) => {
        msg += `${spaces}    "${key}": `;

        if (typeof obj[key] === 'boolean') {
            msg += `${obj[key]}`;
        } else {
            msg += `"${obj[key]}"`;
        }

        if (index < keys.length - 1) {
            msg += ',\r\n';
        }
    });

    return `
{
    "gdc": {
        "product": "analyticalDesigner",
        "event": {
            "name": "openInsight",
            "data": {${msg ? '\r\n' + msg + '\r\n' + spaces : ''}}
        }
    }
}`.trim();
}

function formatParams(data) {
    // filter out empty values
    return Object.keys(data).reduce((result, key) => {
        if (data[key] && data[key].length) {
            result[key] = data[key] === '[]' ? '' : data[key];
        }

        return result;
    }, {});
}
