import React from "react";

const Select = props => {
    return (
        <div className="input-group select position-relative">
            <input
                type={props.type}
                className="form-control"
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                autoComplete="off"
            />
            <div className="input-group-append">
                <div className="input-group-text">{props.char}</div>
            </div>
            <ul className="list-group list-unstyled list-group-flush position-absolute dropdown-list">
                {props.options}
            </ul>
        </div>
    );
};

export default Select;
