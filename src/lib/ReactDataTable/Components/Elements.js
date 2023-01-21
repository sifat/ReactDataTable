import { React, useContext, useEffect } from 'react';
import { DataContext } from '../Contexts';
import loading_icon from '../Loading_icon.gif';

export function Loading({ numColumn }) {
    return (
        <tr className="tr-loading">
            <td colSpan={numColumn}>
                <div style={{'textAlign': 'center'}} >
                    <img src={loading_icon} alt="Loading..." style={{'width': '100px', 'height': '70px'}} />
                </div>
            </td>
        </tr>
    )
}

/**
 * 
 * @param {type} border, grow, auto
 * @param {color} 
 *  text color utilities
 * text-primary,text-secondary,text-success,text-danger,text-warning,text-info, text-light, text-dark  
 * @param margin margin utilities 
 */
export function BootStrapSpinners({ className, color, margin, size }) {
    
    if (size && size == 'small' && (className.indexOf('spinner-border') >= 0  || className.indexOf('ms-auto') >= 0 )) {
        className += ' spinner-border-sm ';
    }
    if (size && size == 'small' && className.indexOf('spinner-grow') >= 0) {
        className += ' spinner-grow-sm ';
    }
    if (color) {
        className += ` ${color} `;
    }
    if (margin) {
        className += ` ${margin} `;
    }
    
    return (
        <div className={className} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}

/**
 * 
 * @param {color} 
 *  text color utilities  
 * @param {margin} margin utilities
 * @param {size} small
 */
export function BootStrapSpinnerBorder(props) {
    return <BootStrapSpinners className="spinner-border" {...props} />
}

/**
 * 
 * @param {color} 
 *  text color utilities  
 * @param {margin} margin utilities
 * @parma {size} small
 */
export function BootStrapSpinnerGrow(props) {
    return <BootStrapSpinners className="spinner-grow" {...props} />
}

/**
 * 
 * @param {textAlignClassName} text alignment utilities
 * @param {className} class of spinner 
 * @returns 
 */
export function BootStrapSpinnerTextAlign(props) {
    return (
        <div className={props.textAlignClassName}>
            <BootStrapSpinners {...props} />
        </div>
    );
}

/**
 * 
 * @param {floatAlignment} float utilities
 * @param {className} class of spinner 
 * @returns 
 */
export function BootStrapSpinnerFloat(props) {
    // const className = `${props.floatAlignment} ${props.className}`;
    return (
        <div className="clearfix">
            <BootStrapSpinners {...props} />
        </div>
    );
}

/**
 * 
 * @param {flex} flexbox utilities
 * @param {className} class of spinner 
 * @returns 
 */
export function BootStrapSpinnerFlex(props) {
    return (
        <div className={props.flex}>
            <BootStrapSpinners {...props} />
        </div>
    );
}





export function ReactTableCheckBox({ name, value, checked, className }) {
    const data = useContext(DataContext);
    useEffect(() => {
        if (checked) data.setCheckbocStatus(checked)    
    }, []);
    return (
        <input type="checkbox" 
        name={name} 
        className={className} 
        value={value} 
        checked={data.checkboxStatus}
        onChange={() => {
            data.setCheckbocStatus((status) => !status)    
        }} 
        />
    );
}
