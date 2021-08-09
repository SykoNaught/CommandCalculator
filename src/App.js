import {React, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Card from './Components/UI/Card';
import rssData from './Data/Boxes.json';
import RssBlock from './Components/RssBlock/RssBlock';

function App() {
  const [totalRssByType, setTotalRssByType] = useState({
    "Titanium": 0,
    "Deutereum": 0,
    "Nickel Steel": 0,
    "Plasma": 0
  })

  const setRssTypeTotal = (n, v) => {
    const newValues = {
        ...totalRssByType,
        [n]: v
    } 
    setTotalRssByType(newValues)
  }

  return (
    <Container className="App">
      <Row>
        <h1 style={{textAlign: "center", marginBottom: "2rem"}}>Command Calculator</h1>
        <Col>
            <Row>
              {
                rssData.map( (rss) => {
                  const char = rss.name.charAt(0).toLowerCase();
                  return(
                    <RssBlock rss={rss} char={char} setTotal={setRssTypeTotal} />
                  )
                })
              }
            </Row>
        </Col>
      </Row>
      <Row>
          <Col lg="6">
            <Card>
            <table style={{width:"100%"}}>
                  <thead>
                    <tr>
                      <th style={{textAlign: "center"}} colSpan={2}>Rss Requirements</th>
                      <th>Need</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Titanium</td>
                      <td>2</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>Deuterium</td>
                      <td>2</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>Nickel Steel</td>
                      <td>2</td>
                      <td>2</td>
                    </tr>
                    <tr>
                      <td>Plasma</td>
                      <td>2</td>
                      <td>2</td>
                    </tr>
                  </tbody>
                </table>
            </Card>
          </Col>
      </Row>
    </Container> 
  );
}

export default App;