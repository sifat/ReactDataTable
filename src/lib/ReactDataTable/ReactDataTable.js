import * as React from 'react';
import { OptionContext, DataContext, ColumnContext, NoResultFoundContext } from './Contexts';
import Table from './Components/Table';
import { defaultOptions, getDefaultAppState, getRemoteData, mergeOptions, pagintateData, sortArrayObj } from './utils';
import TableHeader from './Components/TableHeader';
import TableBody from './Components/TableBody';
import Pagination from './Components/Pagination';
import { Loading } from './Components/Elements';

function ReactDataTable({ columns, data, option, loader }) {
    const tableOptions = option ? mergeOptions(option) : defaultOptions;
    const defaultAppState = getDefaultAppState(tableOptions, columns);
    let iniTotalPages = 1;

    if (!tableOptions.remote && tableOptions.pagination.enablePagination) {
        iniTotalPages = Math.ceil(data.length / tableOptions.pagination.perPage);
    }
    // console.log(tableOptions);

    const [appState, setAppState] = React.useState(defaultAppState);
    const filteredData = React.useRef([]);
    const [tableData, setData] = React.useState(data ? data : []);
    const [totalPage, setTotalPage] = React.useState(iniTotalPages);
    const [checkboxStatus, setCheckbocStatus] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [noResultFound, setNoResultFound] = React.useState(false);

    const dataContextValue = {
        current: tableData,
        original: data,
        setData: setData,
        filteredData: filteredData,
        appState: appState,
        setAppState: setAppState,
        totalPage: totalPage,
        setTotalPage: setTotalPage,
        checkboxStatus: checkboxStatus,
        setCheckbocStatus: setCheckbocStatus,
        isLoading: isLoading,
        setIsLoading: setIsLoading
    }

    const noResultContextValue = {
        noResultFound: noResultFound,
        setNoResultFound: setNoResultFound
    };

    React.useEffect(() => {
        if (tableOptions.remote) {
            getRemoteData(tableOptions, dataContextValue, noResultContextValue);
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
            setIsLoading(false);
        }
    }, []);

    if (!loader) loader = <Loading numColumn={columns.length} />;


    return (
        <OptionContext.Provider value={tableOptions}>
            <DataContext.Provider value={dataContextValue} >
                <NoResultFoundContext.Provider value={noResultContextValue} >
                    <Table>
                        <ColumnContext.Provider value={columns} >
                            <TableHeader />
                            <TableBody loader={loader} />
                        </ColumnContext.Provider>
                    </Table>
                </NoResultFoundContext.Provider>
                <Pagination />
            </DataContext.Provider>
        </OptionContext.Provider>
    );
}



export default ReactDataTable;