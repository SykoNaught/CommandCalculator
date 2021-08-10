import React from 'react';
import {Dropdown} from 'react-bootstrap';

const CommandSelect = (props) => {
    return(
        <Dropdown onSelect={props.handleChange} style={{marginBottom: "1rem"}}>
            <Dropdown.Toggle id="dropdown-basic" style={{width:"100%"}} variant='secondary'>
            Command Center Lvl {props.selectedCommand.Level}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
            {
            props.requirementsData[0].Command_Center.Levels.map((lvl) => {
                const keys = Object.keys(lvl)
                return(
                <Dropdown.Item key={keys[0]}>{keys[0]}</Dropdown.Item>
                )
            })
            }
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CommandSelect