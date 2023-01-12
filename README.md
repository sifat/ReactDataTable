# React Data Table Component
A customizable react component with additional function.

## Key Features
- Searching
- Sorting
- Pagination
- Customizable

## Usage

```js
const columns = [
    { title: '#', dataIndex: 'userId' },
    {
      title: 'Firstname', render: (item) => {
        return (
          <b>{item.firstname}</b>
        )
      }, sort: true, dataIndex: 'firstname'
    },
    {
      title: 'Lastname', render: (item) => {
        return (
          <b>{item.lastname}</b>
        )
      }, sort: true, dataIndex: 'lastname'
    },
    { title: 'Country code', dataIndex: 'countrycode', sort: true }
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

  return (
    <>
      <ReactDataTable columns={columns} data={data} option={null} />
    </>
  );

```

use with remote source
```js
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