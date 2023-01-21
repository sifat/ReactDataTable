import { useContext } from "react";
import { DataContext, OptionContext } from "../Contexts";
import { pagintateData } from "../utils";

export default function PaginationLink({num}) {
    const option = useContext(OptionContext);
    const data = useContext(DataContext);

    const isActive = num == data.appState.currentPage;
    
    let span = null;
    let text = num;
    if (num == 0) {
        span = <span aria-hidden="true">&laquo;</span>;
        num = data.appState.currentPage > 1 ? data.appState.currentPage - 1 : 1;
        text = null;
    }
    if (num > data.totalPage) {
        span = <span aria-hidden="true">&raquo;</span>;
        num = data.appState.currentPage < data.totalPage ? data.appState.currentPage + 1 : data.totalPage;
        text = null;
    }

    return (
        <li className={`${option.pagination.pageItemClassName} ${isActive ? 'active' : ''}`} onClick={() => {
            if (isActive) return true;

            data.setAppState((prev) => {
                return {
                    ...prev,
                    currentPage: num
                }
                
            });

            if (option.remote) {
                return true;
            }
            data.setIsLoading(true);
            data.setData(pagintateData([...data.filteredData.current], option.pagination.perPage, num));
            data.setIsLoading(false);
        }}>
            <a className={option.pagination.anchorClassName} >
                {text}
                {span}
            </a>
        </li>
    );
}