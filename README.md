# React Data Table Component
A customizable react component with additional function.

## Key Features
Searching
Sorting
Pagination
Customizable

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