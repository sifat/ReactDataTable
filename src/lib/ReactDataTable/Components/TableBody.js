import { useContext } from "react";
import { ColumnContext, DataContext } from "../Contexts";
import TableCell from "./TableCell";

export default function TableBody() {
    const data = useContext(DataContext);
    let columns = useContext(ColumnContext);
    
    const tr = data.current.map((row, index) => {
        const td = columns.map((column) => {
            return (
                <TableCell data={row} column={column} key={column.dataIndex} />
            )
        });
        return (
            <tr key={index}>
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