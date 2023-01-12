import ReactDataTable from './lib/ReactDataTable/ReactDataTable';
function App() {

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
    {
      "userId": "24066",
      "firstname": "Nannie",
      "lastname": "Auer",
      "countrycode": "CC"
    },
    {
      "userId": "35652",
      "firstname": "Delfina",
      "lastname": "Goyette",
      "countrycode": "PY"
    },
    {
      "userId": "26733",
      "firstname": "Scot",
      "lastname": "Thompson",
      "countrycode": "GF"
    },
    {
      "userId": "95479",
      "firstname": "Earnest",
      "lastname": "Bednar",
      "countrycode": "GH"
    },
    {
      "userId": "63012",
      "firstname": "Bertram",
      "lastname": "O&#x27;Keefe",
      "countrycode": "ME"
    },
    {
      "userId": "71251",
      "firstname": "Juliana",
      "lastname": "Zboncak",
      "countrycode": "BQ"
    },
    {
      "userId": "94800",
      "firstname": "Al",
      "lastname": "Kling",
      "countrycode": "KI"
    },
    {
      "userId": "89540",
      "firstname": "Delbert",
      "lastname": "O&#x27;Conner",
      "countrycode": "AI"
    }
  ];

  return (
    <>
      <ReactDataTable columns={columns} data={data} option={null} />
    </>
  );
}

export default App;
