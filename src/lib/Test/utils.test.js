import { deepMerge, defaultOptions, getDefaultAppState, initalProps, mergeOptions, pagintateData, sortArrayObj } from '../ReactDataTable/utils';
const {format: prettyFormat} = require('pretty-format');



test('option test', () => {
    const option = mergeOptions({pagination: {enablePagination: false}});
    expect(option['pagination']['enablePagination']).toBeFalsy();

    const anotherOption = mergeOptions({pagination: false});
    expect(anotherOption['pagination']['enablePagination']).toBeFalsy();
    expect(anotherOption['table']['className']).toBe('table table-striped table-hover');

    const searchOption = mergeOptions({table: {className: 'other'}, search: false});
    expect(searchOption['search']['enablePagination']).toBeFalsy();
    expect(searchOption['table']['className']).toBe('other');

    const tableHeader = mergeOptions({table: {tableHeader: false, tableFooter: true}});
    expect(tableHeader['table']['tableHeader']['enableTableHeader']).toBeFalsy();
    expect(tableHeader['table']['className']).toBe('table table-striped table-hover');
});

test('deep merge test', () => {
    let obj1 = {
        "key1": {
            "value": {
                number: 1,
                "string": "two"
            }
        },
        "key2": "other"
    };

    const obj2 = {
        key1: {
            value: {
                "string": "one"
            }
        }
    };

    obj1 = deepMerge(obj1, obj2);
    // console.log(obj1);
    // console.log(prettyFormat(obj1));
    expect(obj1['key1']['value']['string']).toBe('one');
    expect(obj1['key1']['value']['number']).toBe(1);

    const obj3 = { key3: {key: 'value'} };

    obj1 = deepMerge(obj1, obj3);
    expect(obj1['key3']['key']).toBe('value');
});

test('initial prop test', () => {
    const option = mergeOptions({table: {attr: {a: 'b'}}}); 
    expect(initalProps(option, 'table')).toEqual({className: 'table table-striped table-hover', a: 'b'});
});

test('sorting test', () => {
    //empty array
    let arr = [];
    expect(sortArrayObj(arr, 'asc', 'key')).toEqual([]);

    arr = [
        {number: 0, text: 'zero', date: '1/12/2023'},
        {number: 5, text: 'five', date: '6/11/2023'},
        {number: 2, text: 'two', date: '1/10/2023'},
        {number: 100, text: 'hundred', date: '1/10/2023 6:00 PM'},
        {number: '100', text: 'hundred', date: '1/10/2023 7:00 PM'}

    ];
    
    let sortedArr = sortArrayObj(arr, 'asc', 'number');
    // console.log(sortedArr);
    expect(sortedArr).toEqual([
        {number: 0, text: 'zero', date: '1/12/2023'},
        {number: 2, text: 'two', date: '1/10/2023'},
        {number: 5, text: 'five', date: '6/11/2023'},
        {number: 100, text: 'hundred', date: '1/10/2023 6:00 PM'},
        {number: '100', text: 'hundred', date: '1/10/2023 7:00 PM'}
    ]);
    // sortedArr = sortArrayObj(arr, 'asc', 'number');
    expect(sortArrayObj(arr, 'desc', 'number')).toEqual([
        {number: 100, text: 'hundred', date: '1/10/2023 6:00 PM'},
        {number: '100', text: 'hundred', date: '1/10/2023 7:00 PM'},
        {number: 5, text: 'five', date: '6/11/2023'},
        {number: 2, text: 'two', date: '1/10/2023'},
        {number: 0, text: 'zero', date: '1/12/2023'}
    ]);

    expect(sortArrayObj(arr, 'asc', 'text')).toEqual([
        {number: 5, text: 'five', date: '6/11/2023'},
        {number: 100, text: 'hundred', date: '1/10/2023 6:00 PM'},
        {number: '100', text: 'hundred', date: '1/10/2023 7:00 PM'},
        {number: 2, text: 'two', date: '1/10/2023'},
        {number: 0, text: 'zero', date: '1/12/2023'}
    ]);
    expect(sortArrayObj(arr, 'desc', 'text')).toEqual([
        {number: 0, text: 'zero', date: '1/12/2023'},
        {number: 2, text: 'two', date: '1/10/2023'},
        {number: 100, text: 'hundred', date: '1/10/2023 6:00 PM'},
        {number: '100', text: 'hundred', date: '1/10/2023 7:00 PM'},
        {number: 5, text: 'five', date: '6/11/2023'}
        
    ]);
    // console.log(sortArrayObj(arr, 'asc', 'date'));
    expect(sortArrayObj(arr, 'asc', 'date')).toEqual([
        {number: 2, text: 'two', date: '1/10/2023'},
        {number: 100, text: 'hundred', date: '1/10/2023 6:00 PM'},
        {number: '100', text: 'hundred', date: '1/10/2023 7:00 PM'},
        {number: 0, text: 'zero', date: '1/12/2023'},
        {number: 5, text: 'five', date: '6/11/2023'}
        
    ]);

    expect(sortArrayObj(arr, 'desc', 'date')).toEqual([
        {number: 5, text: 'five', date: '6/11/2023'},
        {number: 0, text: 'zero', date: '1/12/2023'},
        {number: '100', text: 'hundred', date: '1/10/2023 7:00 PM'},
        {number: 100, text: 'hundred', date: '1/10/2023 6:00 PM'},
        {number: 2, text: 'two', date: '1/10/2023'},
    ]);
});

test('default app state', () => {
    const columns = [
        { title: 'ID', dataIndex: 'userId' },
        { title: 'firstname', dataIndex: 'firstname', sort: true },
        { title: 'lastname', dataIndex: 'lastname', sort: true },
        {
          title: 'friends', dataIndex: 'friends', render: (item) => {
            const li = item.friends.map((friend) => <li key={friend.id}>{friend.id}</li>);
            return (
              <ul>
                {li}
              </ul>
            );
          }
        }
      ];
    const appState = getDefaultAppState(defaultOptions, columns);
    expect(appState).toEqual({
        perPage: 20,
        currentPage: 1,
        keyword: '',
        orderby: 'firstname',
        sort: 'asc'
    });
});

test('paginate data', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(pagintateData(data, 3, 2));
    expect(pagintateData(data, 3, 1)).toEqual([1, 2, 3]);
    expect(pagintateData(data, 3, 2)).toEqual([4, 5, 6]);
    expect(pagintateData(data, 3, 3)).toEqual([7, 8, 9]);
    expect(pagintateData(data, 3, 4)).toEqual([10]);
    expect(pagintateData(data, 2, 4)).toEqual([7, 8]);
});