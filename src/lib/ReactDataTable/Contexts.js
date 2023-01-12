import { createContext } from "react";
import { defaultOptions } from "./utils";


export const DataContext = createContext({});
export const OptionContext = createContext(defaultOptions);
export const ColumnContext = createContext({});
// export const SetDataContext = createContext();