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
      <ReactDataTable columns={columns} data={data} option={option} title="Hello World" theme="bootstrap" />
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