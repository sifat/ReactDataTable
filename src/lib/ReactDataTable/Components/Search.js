import { useContext } from "react";
import { DataContext, NoResultFoundContext, OptionContext } from "../Contexts";
import { pagintateData, initalProps } from "../utils";

export default function Search() {
    const option = useContext(OptionContext);
    const data = useContext(DataContext);
    const noResult = useContext(NoResultFoundContext);
    
    let props = initalProps(option, 'search');
    return (
        <div className={option.search.wrapperClassName}>
            <input type={"text"} {...props} name={option.search.name} onKeyUp={(e) => {
                
                if (option.remote) {
                    // getRemoteData(option, data);
                    data.setAppState((prev) => {
                        return {
                            ...prev,
                            keyword: e.target.value,
                            currentPage: 1
                        }
                    });
                    return true;
                }

                
                if (noResult.noResultFound === true) {
                    noResult.setNoResultFound(false);
                } 

                data.setIsLoading(true);
                let newData = [];
                if (e.target.value.length == 0) {
                    newData = data.original;

                } else {
                    let keyword = option.search.casesensitive ? e.target.value : String(e.target.value).toLocaleLowerCase();
                    for (const i in data.original) {
                        for (const j in data.original[i]) {
                            let fieldValue = String(data.original[i][j]);
                            if (!option.search.casesensitive) {
                                fieldValue = fieldValue.toLocaleLowerCase();
                            }
                            if (fieldValue.indexOf(keyword) >= 0) {
                                newData.push(data.original[i]);
                                break;
                            }
                        }
                    }
                }


                data.filteredData.current = newData;
                const totalPage = Math.ceil(newData.length / option.pagination.perPage);
                data.setAppState((prev) => {
                    return {
                        ...prev,
                        keyword: e.target.value,
                        currentPage: 1
                    }
                });
                data.setTotalPage(totalPage);
                if (option.pagination.enablePagination) {
                    newData = pagintateData(newData, option.pagination.perPage, 1);
                }
                data.setData(newData);
                data.setIsLoading(false);
                if (newData.length == 0) {
                    noResult.setNoResultFound(true);
                }
            }} />
        </div>
    );
}