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
    if (title || option.heading.title) {
        caption = <caption>{title ? title : option.heading.title}</caption>;
    }
    if (option.heading.enableHeading) {
        // const rightContent = option.search.position == 'right' ? search : title;
        // const leftContent = option.search.position == 'left' ? search : title;
        // heading = <div className={option.heading.className}>
        //     <div className="col-sm-6 text-left">
        //         {leftContent}
        //     </div>
        //     <div className="col-sm-6 text-right">
        //         {rightContent}
        //     </div>
        // </div>;
        // const rightContents = [];
        // const leftContents = [];

        // if (option.search.position == 'right') {
        //     rightContents.push(<Search key={1}/>);
        // }
        // if (option.search.position == 'left') {
        //     leftContents.push(<Search key={1} />);
        // }
        // leftContents.push(<PaginationPerPageMenu key={1} />);
        // console.log(leftContents);

        heading = <div className={option.heading.className}>
                <Search />
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