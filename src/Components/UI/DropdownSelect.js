import React from 'react';
import {Dropdown} from 'react-bootstrap';

const DropdownSelect = (props) => {
    return(
        <Dropdown onSelect={props.handleChange} className="mb1rem">
            <Dropdown.Toggle id="dropdown-basic" style={{width:"100%"}} variant='secondary'>
            {props.buttonText}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
                {
                    props.options.map((o, i) => {
                        const keys = Object.keys(o)
                        return(
                            props.optionVal ?
                                <Dropdown.Item data-index={i} key={o[props.optionVal]}>{o[props.optionVal]}</Dropdown.Item>
                            :
                                <Dropdown.Item data-index={i} key={keys[0]}>{keys[0]}</Dropdown.Item> 
                        )
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropdownSelect