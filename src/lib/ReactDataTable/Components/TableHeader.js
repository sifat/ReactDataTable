import { useContext } from "react";
import { OptionContext, ColumnContext } from "../Contexts";
import { initalProps } from "../utils";
import TableHeading from "./TableHeading";

export default function TableHeader() {
    // console.log(columns);
    const option = useContext(OptionContext);
    const columns = useContext(ColumnContext);
    let props = initalProps(option['table'], 'tableHeader');
    
    if (!option.table.tableHeader.enableTableHeader) return null;

    const th = columns.map((column) => {
        return (
            <TableHeading column={column} key={column.dataIndex} />
        )
    });

    
    return (
        <thead {...props}>
            <tr>
                {th}
            </tr>
        </thead>
    );
}