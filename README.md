# React Data Table Component
A customizable react component with additional function.

## Key Features
- Searching
- Sorting
- Pagination
- Customizable

## Usage

```js
import { ReactTableCheckBox } from './lib/ReactDataTable/Components/Elements';
const columns = [
    { title: <ReactTableCheckBox name="test" checked={true}/>, key: 'userId' },
    {
      title: 'Firstname', render: (item) => {
        return (
          <b>{item.firstname}</b>
        )
      }, sort: true, key: 'firstname'
    },
    {
      title: 'Lastname', render: (item) => {
        return (
          <b>{item.lastname}</b>
        )
      }, sort: true, key: 'lastname'
    },
    { title: 'Country code', key: 'countrycode', sort: true }
  ];

  const data = [
    {
      "userId": "56615",
      "firstname": "Kaelyn",
      "lastname": "Hane",
      "countrycode": "CL"
    },
    {
      "userId": "66680",
      "firstname": "Jovani",
      "lastname": "Mosciski",
      "countrycode": "AT"
    },
    
  ];

  const option = {
    pagination: { perPage: 5 }
  };

  return (
      <ReactDataTable columns={columns} data={data} option={option} title="Users" theme="bootstrap" />
  );

```

use with remote source
```js
const columns = [
    { title: 'ID', key: 'userId' },
    { title: 'firstname', key: 'firstname', sort: true },
    { title: 'lastname', key: 'lastname', sort: true },
    {
      title: 'friends', key: 'friends', render: (item) => {
        const li = item.friends.map((friend) => <li key={friend.id}>{friend.id}</li>);
        return (
          <ul>
            {li}
          </ul>
        );
      }
    }
  ];

const option = {
    ajax: {
      url: 'http://localhost:3001/',
      requestOption: {
        mode: 'cors', credentials: 'omit',
        headers: {
          'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer'
      }
    }
  }
  const data = [];
  return (
    <>
      <ReactDataTable columns={columns} data={data} option={option} />
    </>
  );
  ```
## Props
| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| columns | array | yes | | Please view columns section |
| data | array | no | [] | array of objects | 
| option | object| no | default option object | Please view option section | 
| title | string \| component | no | | Displayed on table caption |
| theme | string | no | default | Values: default \| bootstap. When use with bootstrap please set theme to bootstrap  |
| loader | component | no | <Loading /> component | Shows while table loads data.  |

## columns Props
| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| title | string \| component | yes | | The name of the column. e.g. `Firstname`. You can also a valid react component. |
| key | string | no | |  `key` is required if you want to display data. This will map to data object key. e.g. if you have data like this [{"userId": "56615","firstname": "Kaelyn"}] and you want to display firstname then set `key` to `firstname`. |
| sort | boolean | no | false | Set to true if you want this column to be sortable | 
| render | function(item) | no | | Custom function to display cell data. The record of the row passed as parameter. Returned value displayed on table cell  |

## option example

### Table
Change CSS class for table
```js
{table: className: 'my-table'}
```

### Pagination
Disable pagination
```js
{pagination: false}
```
Changing class for pagination `ul`
```js
{pagination: className: 'custom-class-name'}
```

Changing class for pagination `li`
```js
{pagination: pageItemClassName: 'custom-class-name'}
```

Changing class for pagination `a`
```js
{pagination: anchorClassName: 'custom-class-name'}
```

Changing class for pagination wrapper `nav`
```js
{pagination: wrapperClassName: 'custom-class-name'}
```

Changing number of items to display per page
```js
{pagination: perPage: 5}
```

Changing dropdown for number of items per page
```js
{pagination: lengthMenu: menu: [10, 20, 30, 50]}
```

### Search

Disable Search
```js
{search: false}
```
Changing Not found text
```js
{search: notFoundText: 'nothing found'}
```
Place search box to left
```js
{search: position: 'left'}
```
Change label for search
```js
{search: searchLabel: 'Find'}
```

## Default option object
```js
{
    heading: {
        enableHeading: true,
        title: '',
        className: 'table-header'
    },
    table: {
        className: 'react-datatable',
        tableHeader: {
            enableTableHeader: true,
            className: '',
            sortingIcon: {
                asc: '\u2191',
                desc: '\u2193'
            }
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
        className: 'react-table-pagination',
        pageItemClassName: 'react-table-page-item',
        anchorClassName: 'react-table-page-link',
        wrapperClassName: '',
        lengthMenu: {
            className: '',
            position: 'left',
            menu: [5, 10, 15, 20],
            wrapperClassName: '',
            labelClassName: '',
            style: '{}'
        }
    },
    search: {
        enableSearch: true,
        position: 'right',
        className: '',
        notFoundText: 'Sorry, no record found with the search criteria',
        casesensitive: false,
        wrapperClassName: '',
        name: 'search',
        searchLabel: 'Search',
        searchLabelClassName: '',
        style: '{}'
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

```
