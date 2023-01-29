import ReactDataTable from './lib/ReactDataTable/ReactDataTable';
import { ReactTableCheckBox } from './lib/ReactDataTable/Components/Elements';
function App() {

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
  const option = {
    pagination: { perPage: 5 }
    // search: false
  };

  // const option = {
  //   ajax: {
  //     url: 'http://localhost:3001/',
  //     requestOption: {
  //       method: "POST",
  //       body: {a: "a", b: "b"},
  //       mode: 'cors', credentials: 'omit',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       referrerPolicy: 'no-referrer'
  //     }
  //   }
  // }
  // const data = [];

  return (
      <ReactDataTable columns={columns} data={data} option={option} title="Hello World" theme="" />
  );
}

export default App;
