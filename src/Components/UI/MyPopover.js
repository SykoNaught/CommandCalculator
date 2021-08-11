import React from 'react';
import {OverlayTrigger, Popover} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const MyPopover = (props) => {
    return(
        <OverlayTrigger
            trigger={['hover', 'click']}
            rootClose={true}
            key={props.id}
            placement={props.placement}
            overlay={
                <Popover id={props.id}>
                    {props.header && <Popover.Header as="h3">{props.header}</Popover.Header>}
                    <Popover.Body>
                        {props.children}
                    </Popover.Body>
                </Popover>
            }
        >   
            <div style={{position:"relative", color:"#6c757d"}}>
                <FontAwesomeIcon icon={props.icon} style={{color:"#6c757d"}} />
            </div>
            
        </OverlayTrigger>
    )
}
export default MyPopover