# React Data Table Component

A customizable react table component with additional functions.

## Key Features

- Searching
- Sorting
- Pagination
- Customizable

## Usage

```js
import ReactDataTable, {ReactTableCheckBox} from '@sifatkabir/reactdatatable';
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
      <ReactDataTable columns={columns} data={data} option={option} title="Users" />
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
    <ReactDataTable columns={columns} data={data} option={option} />
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
| loader | component | no | `<Loading />` component | Shows while table loads data.  |

## columns Props

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| title | string \| component | yes | | The name of the column. e.g. `Firstname`. You can also a valid react component. |
| key | string | no | |  `key` is required if you want to display data. This will map to data object key. e.g. if you have data like this [{"userId": "56615","firstname": "Kaelyn"}] and you want to display firstname then set `key` to `firstname`. |
| sort | boolean | no | false | Set to true if you want this column to be sortable |
| render | function(item) | no | | Custom function to display cell data. The record of the row passed as parameter. Returned value displayed on table cell  |

## option Props

| Name | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |
| heading| boolean \| object | no |  enabled by default    | `div` containing search element or dropdown containing number of entries per page before table. You can set `{heading: false}` to hide this element. |
| heading.className | string | no | table-header | CSS class for heading |
| table.title | string \| JSX element | no | | This value will showup in the caption of the table. |
| table.className | string | no | react-datatable | CSS class for the table |
| table.tableHeader | boolean \| object | no | enabled by default | `<thead>` element of the table. You can set `{table: {tableHeader: false}}` to hide this element. |
| table.tableHeader.className | string | no | | CSS class for `<thead>` |
| table.tableHeader.sortingIcon.asc | string \| JSX element | no | \u2191 | If that column has sorting enable then this icon will showup and will be highlighted it is in ascending order. |
| table.tableHeader.sortingIcon.desc | string \| JSX element | no | \u2193 | If that column has sorting enable then this icon will showup and will be highlighted it is in descending order. |
| pagination | boolean \| object | no | enabled by default | You can set `{pagination: false}` to disable pagination |
| pagination.perPage | number | no| 20 | Number of items to be shown in a page |
| pagination.className | string | no | react-table-pagination | CSS class for `<ul>` element of the pagination. |
| pagination.pageItemClassName | string | no | react-table-page-item | CSS class for `<li>` items of the pagination. |
| pagination.anchorClassName | string | no | react-table-page-link | CSS class for `<a>` items or links for the pagination. |
| pagination.wrapperClassName | string | no | | There is a wrapper `<nav>` element for the pagination. This will set the CSS class for that element. |
| pagination.lengthMenu.className | string | no | | CSS class for per page dropdown. |
| pagination.lengthMenu.position | string | no | left | This determines in which side the per page dropdown will be displayed. By default it is left. You can set it to `right` to show this on right.|
| pagination.lengthMenu.menu | array | no | `[5, 10, 15, 20]` | Menu items for per page dropdown. |
| pagination.lengthMenu.wrapperClassName | string | no | | CSS class for a wrapper `<div>` element |
| pagination.lengthMenu.labelClassName | string | no | | CSS class for the label of the dropdown |
| pagination.lengthMenu.style | string | no | '{}' | Inline style for the dropdown. |
| search | boolean \| object | no | enabled by default | You can disable search by setting search to false |
| search.position | string | no | right | This determines in whcih side the search box will show up. By default it is right. You can set it to `left` to show this on left side. |
| search.className | string | no | | CSS class for the search box |
| search.notFoundText | string | no | Sorry, no record found with the search criteria | Text to display if there is no result with search criteria. |
| search.casesensitive | boolean | no | false | Set it true if you want to make search case-sensitive. |
| search.wrapperClassName | string | no | | CSS class for a wrapper `<div>` element. |
| search.name | string | no | search | name attribute for the search input box. |
| search.searchLabel | string | no | Search | Label for the search box. |
| search.searchLabelClassName | string | no | | CSS class for the search label. |
| search.style | string | no | '{}' | Inline style for search. |
| ajax.url | string | no | | url for your remote request. |
| ajax.requestOption | object | no | `{}` | `fetch` API options. For details please visit [MDN](https://developer.mozilla.org/en-US/docs/Web/API/fetch) |
| ajax.dataKey | string | no | data | Key of response json which contains the data. Data should be an array of objects. |
| ajax.totalRecordKey | string | no | total | Key of the response json whcih contains total number of pages for pagination. |

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
