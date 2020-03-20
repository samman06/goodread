import React from 'react';
import classnames from "classnames";
import "../../App.css"

const TextFieldGroup = ({name, placeholder, value, error, label, info, type, onChange, disabled}) => {
    return (

        <div className="form-group">
            <input
                type={type}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
            {error && <span>{error}</span>}
        </div>
    );
};


TextFieldGroup.defaultProps = {
    type: "text"
};

export default TextFieldGroup
