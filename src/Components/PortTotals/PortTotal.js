import React from 'react';
import { Col } from 'react-bootstrap';
import Card from '../UI/Card';

const PortTotal = (props) => {
    return(
        <Col xl={3} lg={4} md={6} sm={6}>
            <Card className="port-total">
                <div className="total-title"><strong>{props.name}</strong></div>
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <td>Titanium</td>
                            <td style={{textAlign:"right"}}>{props.rss[props.name]["Titanium"]}</td>
                        </tr>
                        <tr>
                            <td>Deuterium</td>
                            <td style={{textAlign:"right"}}>{props.rss[props.name]["Deuterium"]}</td>
                        </tr>
                        <tr>
                            <td>Nickel</td>
                            <td style={{textAlign:"right"}}>{props.rss[props.name]["Nickel"]}</td>
                        </tr>
                        <tr>
                            <td>Plasma</td>
                            <td style={{textAlign:"right"}}>{props.rss[props.name]["Plasma"]}</td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </Col>
    )
}

export default PortTotal