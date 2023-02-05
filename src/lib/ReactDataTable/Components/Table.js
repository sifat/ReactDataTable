import { useContext } from "react";
import { DataContext, OptionContext } from "../Contexts";
import Search from "./Search";
import { initalProps } from "../utils";
import PaginationPerPageMenu from "./PaginationPerPageMenu";

export default function Table({ title, children }) {
    const option = useContext(OptionContext);
    const props = initalProps(option, 'table');

    const search = option.search.enableSearch ? <Search /> : null;
    let heading = null;
    let caption = null;
    if (title || option.table.title) {
        caption = <caption>{title ? title : option.table.title}</caption>;
    }
    if (option.heading.enableHeading) {
        heading = <div className={option.heading.className}>
                {search}
                <PaginationPerPageMenu />
        </div>;

    }
    return (
        <>
            {heading}
            <table {...props}>
                {caption}
                {children}
            </table>
        </>
    );
}