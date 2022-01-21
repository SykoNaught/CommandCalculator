import React from 'react';
import { Col } from 'react-bootstrap';
import Card from '../UI/Card';

const FinalTotal = (props) => {
    return(
        <Col>
            <Card className="port-total">
                <div className="total-title"><strong>{props.name}</strong></div>
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <td>Titanium</td>
                            <td style={{textAlign:"right"}}>{props.rss["Titanium"]}</td>
                        </tr>
                        <tr>
                            <td>Deuterium</td>
                            <td style={{textAlign:"right"}}>{props.rss["Deuterium"]}</td>
                        </tr>
                        <tr>
                            <td>Nickel</td>
                            <td style={{textAlign:"right"}}>{props.rss["Nickel"]}</td>
                        </tr>
                        <tr>
                            <td>Plasma</td>
                            <td style={{textAlign:"right"}}>{props.rss["Plasma"]}</td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </Col>
    )
}

export default FinalTotal