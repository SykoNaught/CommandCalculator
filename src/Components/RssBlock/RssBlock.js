import {React, useState} from 'react';
import Card from '../UI/Card';
import { Row, Col, Form } from 'react-bootstrap';
import RssInput from './RssInput';

const RssBlock = (props) => {
    const [rssValues, setRssValues] = useState()
    const [totalRss, setTotalRss] = useState(0)


    const changeHandler = (e) => {
        const name = e.target.name
        const value = parseInt(e.target.value)
        const newValues = {
            ...rssValues,
            [name]: value
        } 
        setRssValues(newValues)
        
        calc_total(newValues)
        
    }


    const calc_total = (newValues) => {
        var total = 0
        for (var item in newValues) {
            var boxAmount = '';
            if (item.includes('Storage')) {
                boxAmount = 1;
            }else{
                boxAmount = parseInt(item.replace(/\D+/g, ''))
            }

            var multiplier = 0
            if (Number.isNaN(newValues[item])){
                multiplier = 0
            }else{
                multiplier = parseInt(newValues[item])
            }

            var boxTotal = boxAmount * multiplier
            
            total += boxTotal;
        };
        const formattedTotal = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        setTotalRss(formattedTotal)
        props.setTotal(props.rss.name,formattedTotal)
    } 
    return(
        <Col xs={6} md={6} lg={3} style={{marginBottom:"25px"}}>
            <Card>
                <h2>{props.rss.name}</h2>
                <Form>
                    {props.rss.amounts.map((amount) => {
                        
                    const rowId = props.char + '-' + amount.replace(/,/g, '')
                        return(
                            <RssInput key={rowId} id={rowId} amount={amount} updateTotal={changeHandler} /> 
                        )
                    })}
                </Form>
                <Row>
                    <Col>
                        <label htmlFor={props.char + '-total'}>Total: </label>
                    </Col>
                    <Col>
                        {totalRss}
                    </Col>
                </Row>
            </Card>
        </Col>
    )
}  

export default RssBlock