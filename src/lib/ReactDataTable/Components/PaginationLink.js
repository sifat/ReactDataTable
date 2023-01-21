import { useContext } from "react";
import { DataContext, OptionContext } from "../Contexts";
import { pagintateData } from "../utils";

export default function PaginationLink({num}) {
    const option = useContext(OptionContext);
    const data = useContext(DataContext);

    const isActive = num == data.appState.currentPage;

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
            <a className={option.pagination.anchorClassName} >{num}</a>
        </li>
    );
}