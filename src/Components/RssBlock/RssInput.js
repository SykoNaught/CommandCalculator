import React from 'react';
import { Row, Col, FormControl } from 'react-bootstrap';

const RssInput = (props) => {
    return(
        <Row key={props.id} className="mb10">
            <Col style={{maxWidth: "100px"}}>
                <label htmlFor={props.id}>{props.amount}:</label>
            </Col>
            <Col>
                <FormControl
                    type="number"
                    id={props.id}
                    name={props.id}
                    size="sm"
                    min="0"
                    step="1"
                    style={{textAlign: "right"}}
                    onChange={props.updateTotal}
                />
            </Col>
        </Row>
    )
}

export default RssInput