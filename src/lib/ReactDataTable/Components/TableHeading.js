import { useContext, useState } from "react";
import { ColumnContext, DataContext, OptionContext } from "../Contexts";
import { sortArrayObj, pagintateData } from "../utils";


export default function TableHeading({column}) {
    
    const data = useContext(DataContext);
    const option = useContext(OptionContext);
    
    const [sortingState, setSortingState] = useState('asc');
    const sortEnable = column.hasOwnProperty('sort') ? column.sort : false;
    const orderby = data.appState.hasOwnProperty('orderby') && data.appState.orderby ? data.appState.orderby : null;
    const className = sortEnable && orderby == column.dataIndex ? `sort-${sortingState}` : null;
    

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

            let sortedArray = sortArrayObj([...data.filteredData.current], sortingState, column.dataIndex);
            data.filteredData.current = sortedArray;
            if (option.pagination.enablePagination) {
                sortedArray = pagintateData(sortedArray, option.pagination.perPage, 1);
            }
            data.setData(sortedArray);

        }}>
            {column.title}
        </th>
    );
}