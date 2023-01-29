import { isValidElement, useContext, useEffect, useState } from 'react';
import { DataContext } from '../Contexts';

export default function TableCell({ data, column }) {
    const dContext = useContext(DataContext);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        setStatus(dContext.checkboxStatus);
    }, [dContext.checkboxStatus]);

    let cell = data[column.key];
    
    if (column.hasOwnProperty('render') && typeof (column.render) == 'function') {
        cell = column.render(data);
    }

    if (isValidElement(column.title) && column.title.type.name == 'ReactTableCheckBox') {

        cell = <input type="checkbox"
            value={data[column.key]}
            name={column.key}
            checked={status}
            onChange={() => setStatus((prevStatus) => !prevStatus)}
        />
    }

    return (
        <td>{cell}</td>
    )
}