export const defaultOptions = {
    table: {
        className: 'table',
        tableHeader: {
            enableTableHeader: true,
            className: ''
        },
        tableFooter: {
            enableTableFooter: false,
            className: ''
        },


    },
    pagination: {
        enablePagination: true,
        position: 'bottom',
        perPage: 20,
        className: 'pagination',
        pageItemClassName: 'page-item',
        anchorClassName: 'page-link'
    },
    search: {
        enableSearch: true,
        position: 'top-right',
        className: 'form-control input-sm',
        notFoundText: 'Sorry, no record found with the search criteria',
        casesensitive: false,
        wrapperClassName: 'row',
        name: 'search'
    },
    ajax: {
        url: '',
        requestOption: {},
        dataKey: 'data',
        totalRecordKey: 'total'
    },
    socket: {

    },
    remote: false

};

export const mergeOptions = (option) => {
    let modifiedOption = option;
    for (const k in option) {
        switch (k) {
            case 'pagination':
                if (typeof (option['pagination']) !== 'object') {
                    // delete modifiedOption.pagination;
                    modifiedOption['pagination'] = { enablePagination: option['pagination'] };
                }
                break;
            case 'search':
                if (typeof (option['search']) !== 'object') {
                    modifiedOption['search'] = { enableSearch: option['search'] };
                }
                break;
            case 'table':

                if (option['table'].hasOwnProperty('tableHeader') && typeof (option['table']['tableHeader']) !== 'object') {
                    modifiedOption['table']['tableHeader'] = { enableTableHeader: option['table']['tableHeader'] };
                }
                if (option['table'].hasOwnProperty('tableFooter') && typeof (option['table']['tableFooter']) !== 'object') {
                    modifiedOption['table']['tableFooter'] = { enableTableFooter: option['table']['tableFooter'] };
                }
                break;
            case 'ajax':
                if (option['ajax'].hasOwnProperty('url') && option['ajax']['url']) {
                    modifiedOption['remote'] = true;
                }
                break;

        }
    }
    // console.log(modifiedOption);
    return deepMerge(defaultOptions, modifiedOption);
};

export function deepMerge(obj1, obj2) {
    // Create a new object that combines the properties of both input objects
    const merged = {
        ...obj1,
        ...obj2
    };

    // Loop through the properties of the merged object
    for (const key of Object.keys(merged)) {
        // Check if the property is an object
        if (typeof merged[key] === 'object' && merged[key] !== null) {
            // If the property is an object, recursively merge the objects
            if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
                merged[key] = deepMerge(obj1[key], obj2[key]);
            }

        }
    }

    return merged;
}

export const initalProps = (option, type) => {
    let props = {};
    if (option[type].hasOwnProperty('className')) {
        props['className'] = option[type].className;
    }
    if (option[type].hasOwnProperty('attr')) {
        props = deepMerge(props, option[type].attr);
    }

    return props;
}

export function sortArrayObj(arr, order, key) {
    const sortedArr = []
    arr.sort((a, b) => {
        if (order == 'desc') {
            const temp = a;
            a = b;
            b = temp;
        }

        if (!isNaN(a[key]) && !isNaN(b[key])) {
            return a[key] - b[key];
        }


        const date1 = Date.parse(a[key]);
        const date2 = Date.parse(b[key]);

        // console.log(date1);
        // console.log(date2);

        if (!isNaN(date1) && !isNaN(date2)) {
            return date1 - date2;
        }



        return String(a[key]).localeCompare(String(b[key]));


    });
    arr.forEach(element => {
        sortedArr.push(element);
    });

    return sortedArr;
}

export function getRemoteData(option, contextData) {
    const requestOption = option.ajax.requestOption;
    const url = new URL(option.ajax.url);
    const requestMethod = requestOption.hasOwnProperty('method') ? requestOption.method : 'GET';


    if (requestMethod.toLowerCase() == 'get') {
        for (const key in contextData.appState) {
            url.searchParams.append(key, contextData.appState[key]);
        }

    } else {
        let reqBody = {};
        if (requestOption.hasOwnProperty('body') && requestOption.body) {
            const body = typeof (requestOption.body) == 'string' ? JSON.parse(requestOption.body) : requestOption.body;
            reqBody = { ...body, ...contextData.appState };
        } else {
            reqBody = contextData.appState;
        }
        requestOption['body'] = JSON.stringify(reqBody);
    }


    fetch(url, requestOption)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            // console.log(response);
            return response.json();
        })
        .then((json) => {
            if (option.pagination.enablePagination) {
                const totalRecordKey = option.ajax.totalRecordKey;
                contextData.setTotalPage(json[totalRecordKey]);
            }
            const jsonData = option.ajax.dataKey ? json[option.ajax.dataKey] : json;
            contextData.setData(jsonData);
        })
        .catch((error) => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

export function getDefaultAppState(option, columns) {
    let defaultAppState = {};
    if (option.pagination.enablePagination) {
        defaultAppState['perPage'] = option.pagination.perPage;
        defaultAppState['currentPage'] = 1;
    }
    if (option.search.enableSearch) {
        defaultAppState['keyword'] = '';
    }

    let sortingColumn = '';
    for (const column of columns) {
        if (column.hasOwnProperty('defaultSort') && column.defaultSort) {
            sortingColumn = column.defaultSort;
            break;
        }

        if (column.hasOwnProperty('sort') && column.sort && !sortingColumn) {
            sortingColumn = column.dataIndex;

        }
    }

    if (sortingColumn) {
        defaultAppState['orderby'] = sortingColumn;
        defaultAppState['sort'] = 'asc';
    }


    return defaultAppState;
}

export function pagintateData(data, perPage, currentPage) {
    if (data.length == 0) return data;

    let startIndex = (currentPage - 1) * perPage;
    if (startIndex < 0) startIndex = 0;

    let endIndex = startIndex + perPage;
    if (endIndex > data.length) endIndex = data.length;

    // console.log(startIndex);
    // console.log(endIndex);

    return data.slice(startIndex, endIndex);
}



// export {defaultOptions, mergeOptions};