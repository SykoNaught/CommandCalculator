import {React, useState} from 'react';
import Card from '../UI/Card';
import { Row, Col, Form } from 'react-bootstrap';
import RssInput from './RssInput';
import classes from './RssBlock.module.css';
import Popover from '../UI/MyPopover'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

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
    const imgPath = '/images/' + props.rss.name + '-Boxes.png'
    return(
        <Col sm={6} md={6} lg={3} style={{marginBottom:"25px"}}>
            <Card>
                <Row className={`${classes.rowHeader}`}>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <h2>{props.rss.name}</h2>
                        <div style={{position:"relative"}}>
                            <Popover header="What is this?" id={props.rss.name} icon={faQuestionCircle} placement="top">
                                <p>Enter the amount of each {props.rss.name} boxes in your depot.</p>
                                <img style={{maxWidth: "100%"}} src={imgPath} />
                            </Popover>
                        </div>
                    </div>
                    
                </Row>
                
                <Form>
                    {props.rss.amounts.map((amount) => {
                        
                    const rowId = props.char + '-' + amount.replace(/,/g, '')
                        return(
                            <RssInput key={rowId} id={rowId} amount={amount} updateTotal={changeHandler} /> 
                        )
                    })}
                
                    <Row className={`${classes.rowFooter}`}>
                        <Col style={{maxWidth: "100px"}}>
                            <label className="text-bold" htmlFor={props.char + '-total'}>Total: </label>
                        </Col>
                        <Col>
                            <div className="text-right text-bold">
                                {totalRss}
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Col>
    )
}  

export default RssBlock