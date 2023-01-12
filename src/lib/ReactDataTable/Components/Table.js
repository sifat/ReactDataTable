import { useContext } from "react";
import { DataContext, OptionContext } from "../Contexts";
import Search from "./Search";
import { initalProps } from "../utils";

export default function Table({ children }) {
    const option = useContext(OptionContext);
    const props = initalProps(option, 'table');
    
    const search = option.search.enableSearch ? <Search /> : null;
    return (
        <>
            {search}
            <table {...props}>
                {children}
            </table>
        </>
    );
}