import { useContext } from "react";
import { DataContext, OptionContext } from "../Contexts";
import Search from "./Search";
import { initalProps } from "../utils";

export default function Table({ children }) {
    const option = useContext(OptionContext);
    const props = initalProps(option, 'table');
    
    const search = option.search.enableSearch ? <Search /> : null;
    let heading = null;
    if (option.heading.enableHeading) {
        const title = <div className={option.heading.titleWrapperClassName}>
            {option.heading.title}
        </div>
        const rightContent = option.search.position == 'right' ? search : title;
        const leftContent = option.search.position == 'left' ? search : title;
        heading = <div className={option.heading.className}>
            {leftContent}
            {rightContent}
        </div>
    }
    return (
        <>
            {heading}
            <table {...props}>
                {children}
            </table>
        </>
    );
}