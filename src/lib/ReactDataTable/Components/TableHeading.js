import { useContext, useState } from "react";
import { ColumnContext, DataContext, OptionContext } from "../Contexts";
import { sortArrayObj, pagintateData } from "../utils";


export default function TableHeading({column}) {
    
    const data = useContext(DataContext);
    const option = useContext(OptionContext);
    
    const [sortingState, setSortingState] = useState('asc');
    const sortEnable = column.hasOwnProperty('sort') ? column.sort : false;
    const orderby = data.appState.hasOwnProperty('orderby') && data.appState.orderby ? data.appState.orderby : null;
    const className = sortEnable && orderby == column.dataIndex ? `sort-col sort-${sortingState}` : null;
    const sortAsc = sortEnable && orderby == column.dataIndex ? <span className="sorticon asc">{option.table.tableHeader.sortingIcon.asc}</span> : null;
    const sortDesc = sortEnable && orderby == column.dataIndex ? <span className="sorticon desc">{option.table.tableHeader.sortingIcon.desc}</span> : null;
    

    return (
        <th className={className} onClick={() => {
            if (!sortEnable) return false;

            setSortingState((prev) => prev == 'asc' ? 'desc' : 'asc');
            data.setAppState((prev) => {
                return {
                    ...prev,
                    orderby: column.dataIndex,
                    sort: sortingState,
                    currentPage: 1
                }


            });
            if (option.remote) {
                // getRemoteData(option, data);
                return true;
            }

            data.setIsLoading(true);
            let sortedArray = sortArrayObj([...data.filteredData.current], sortingState, column.dataIndex);
            data.filteredData.current = sortedArray;
            if (option.pagination.enablePagination) {
                sortedArray = pagintateData(sortedArray, data.appState.perPage, 1);
            }
            data.setData(sortedArray);
            data.setIsLoading(false);

        }}>
            {column.title}
            {sortAsc}
            {sortDesc}
        </th>
    );
}