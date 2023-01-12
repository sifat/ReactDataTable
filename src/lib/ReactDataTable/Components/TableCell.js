export default function TableCell({ data, column }) {
    let cell = data[column.dataIndex];
    // console.log();
    if (column.hasOwnProperty('render') && typeof (column.render) == 'function') {
        cell = column.render(data);
    }

    return (
        <td>{cell}</td>
    )
}