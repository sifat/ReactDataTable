import { useState, useContext } from "react";
import { DataContext, OptionContext } from "../Contexts";
import { pagintateData } from "../utils";

export default function PaginationPerPageMenu() {
    const options = [];
    const data = useContext(DataContext);
    const option = useContext(OptionContext);
    const [value, setValue] = useState(data.appState.perPage);
    const style = JSON.parse(option.pagination.lengthMenu.style);
    style['float'] = option.pagination.lengthMenu.position == 'right' ? 'right' : 'left';

    for (const op of option.pagination.lengthMenu.menu) {
        // console.log(option);
        options.push(<option value={op} key={op}>{op}</option>);
    }



    return (
        <div className={option.pagination.lengthMenu.wrapperClassName} style={JSON.parse(option.pagination.lengthMenu.style)}>
            <label className={option.pagination.lengthMenu.labelClassName}>Show</label>
            <select name='perPage' value={value} className={option.pagination.lengthMenu.className} onChange={(e) => {
                setValue(e.target.value);
                data.setAppState((prev) => {
                    return {
                        ...prev,
                        perPage: e.target.value,
                        currentPage: 1
                    }
                });
                if (option.remote) {
                    return true;
                }
                const totalPage = Math.ceil(data.filteredData.current.length / e.target.value);
                data.setTotalPage(totalPage);
                data.setIsLoading(true);
                data.setData(pagintateData([...data.filteredData.current], e.target.value, 1));
                data.setIsLoading(false);
            }}>
                {options}
            </select>
            <label className={option.pagination.lengthMenu.labelClassName}>entries</label>

        </div>
    );
}
