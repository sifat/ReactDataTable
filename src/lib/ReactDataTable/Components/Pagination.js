import { useContext } from "react";
import { DataContext, OptionContext } from "../Contexts";
import PaginationLink from "./PaginationLink";

export default function Pagination() {
    const option = useContext(OptionContext);
    const data = useContext(DataContext);

    if (!option.pagination.enablePagination) return null;

    // console.log(data.totalPage);
    const paginationLinks = [];
    for (let i = 0; i <= data.totalPage + 1; i++) {
        paginationLinks.push(<PaginationLink num={i} key={i} />);
    }
    return (
        <nav className={option.pagination.wrapperClassName}>
            <ul className={option.pagination.className}>
                {paginationLinks}
            </ul>
        </nav>
    );
}