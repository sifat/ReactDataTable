import * as React from 'react';
import { OptionContext, DataContext, ColumnContext } from './Contexts';
import Table from './Components/Table';
import { defaultOptions, getDefaultAppState, getRemoteData, mergeOptions, pagintateData, sortArrayObj } from './utils';
import TableHeader from './Components/TableHeader';
import TableBody from './Components/TableBody';
import useFetch from './useFetch';
import Pagination from './Components/Pagination';

function ReactDataTable({ columns, data, option }) {
    const tableOptions = option ? mergeOptions(option) : defaultOptions;
    const defaultAppState = getDefaultAppState(tableOptions, columns);
    let iniTotalPages = 1;
    
    if (!tableOptions.remote && tableOptions.pagination.enablePagination) {
        iniTotalPages = Math.ceil(data.length / tableOptions.pagination.perPage);
    }
    console.log(tableOptions);
    
    const [appState, setAppState] = React.useState(defaultAppState);
    const filteredData = React.useRef([]);
    const [tableData, setData] = React.useState(data ? data : []);
    const [totalPage, setTotalPage] = React.useState(iniTotalPages);

    const dataContextValue = {
        current: tableData,
        original: data,
        setData: setData,
        filteredData: filteredData,
        appState: appState,
        setAppState: setAppState,
        totalPage: totalPage,
        setTotalPage: setTotalPage
    }

    React.useEffect(() => {
        if (tableOptions.remote) {
            getRemoteData(tableOptions, dataContextValue);
        }

    }, [appState]);

    React.useEffect(() => {
        if (!tableOptions.remote && defaultAppState.hasOwnProperty('orderby')) {
            filteredData.current = sortArrayObj(data, defaultAppState.sort, defaultAppState.orderby);
            if (tableOptions.pagination.enablePagination) {
                setData(pagintateData(filteredData.current, tableOptions.pagination.perPage, 1));
            } else {
                setData([...filteredData.current]);
            }
        }
    }, []);


    return (
        <OptionContext.Provider value={tableOptions}>
            <DataContext.Provider value={dataContextValue} >
                <Table>
                    <ColumnContext.Provider value={columns} >
                        <TableHeader />
                        <TableBody />
                    </ColumnContext.Provider>
                </Table>
                <Pagination />
            </DataContext.Provider>
        </OptionContext.Provider>
    );
}



export default ReactDataTable;