import React from 'react';
import classes from './CommandTable.module.css';
import {Col} from 'react-bootstrap';
import Card from '../UI/Card';

const RequiredBuilding = (props) => {
    return(
        <Col lg={6} xl={4} >
            <Card>
                <div style={{position:'relative'}}>
                    <div  className="text-center text-600">
                        {props.building.name}
                    </div>
                    <table style={{width:"100%"}}>
                        <thead className={`${classes.tableHead}`}>
                            <tr>
                                <th colSpan={2}>Requirements</th>
                                <th className="text-right">Difference</th>
                            </tr>
                        </thead>
                        <tbody className={`${classes.tableBody}`}>
                            
                            
                        </tbody>
                    </table>
                </div>
            </Card>
        </Col>
    )
}

export default RequiredBuilding