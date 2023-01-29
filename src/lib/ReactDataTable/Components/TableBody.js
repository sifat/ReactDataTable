import { useContext } from "react";
import { ColumnContext, DataContext, NoResultFoundContext, OptionContext } from "../Contexts";
import TableCell from "./TableCell";

export default function TableBody({loader}) {
    const data = useContext(DataContext);
    let columns = useContext(ColumnContext);
    const noResult = useContext(NoResultFoundContext);
    const option = useContext(OptionContext);
    
    if (data.isLoading) {
        return (
            <tbody>
                {loader}
            </tbody>
        )
    }

    if (noResult.noResultFound) {
        return (
            <tbody>
                <tr>
                    <td colSpan={columns.length}>
                        <div className="no-result-found">
                            {option.search.notFoundText}
                        </div>
                    </td>
                </tr>
            </tbody>
        );
    }
    
    const tr = data.current.map((row, index) => {
        let contents = '';
        const td = columns.map((column) => {
            contents += row[column.key];
            return (
                <TableCell data={row} column={column} key={column.key} />
            )
        });
        return (
            <tr key={btoa(contents)}>
                {td}
            </tr>
        );
    });
    return (
        <tbody>
            {tr}
        </tbody>
    );
}