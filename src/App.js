import {React, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Card from './Components/UI/Card';
import boxData from './Data/Boxes.json';
import reqData from './Data/BuildingRequirements.json';
import RssBlock from './Components/RssBlock/RssBlock';
import CommandSelect from './Components/CommandBlock/CommandSelect';
import CommandTable from './Components/CommandBlock/CommandTable'

function App() {
  const [totalRssByType, setTotalRssByType] = useState({
    "Titanium": 0,
    "Deuterium": 0,
    "Nickel": 0,
    "Plasma": 0
  })
  const [selectedCommand, setSelectedCommand] = useState({
    "Level": 1,
    "Titanium": 0,
    "Deuterium": 0,
    "Nickel": 0,
    "Plasma": 0
  })
  const [calculatedRequirements, setCalculatedRequirements] = useState([
    {"Titanium": 0},
    {"Deuterium": 0},
    {"Nickel": 0},
    {"Plasma": 0}
  ])

  const handleCommandSelect=(key, e)=>{
    const fixedIndex = reqData[0].Command_Center.Levels[e.target.innerHTML - 1]
    const lvlData = fixedIndex[e.target.innerHTML][0]
    const newValues = {
      "Level": e.target.innerHTML,
      "Titanium": formatAddCommas(lvlData.Titanium),
      "Deuterium": formatAddCommas(lvlData.Deuterium),
      "Nickel": formatAddCommas(lvlData.Nickel),
      "Plasma": formatAddCommas(lvlData.Plasma)
    }
    setSelectedCommand(newValues)
    calcRequirements(newValues, totalRssByType)
  }

  const calcRequirements = (requirements, totals) => {
    const newValues = [
      {"Titanium": formatAddCommas(formatRemoveCommas(totals.Titanium) - formatRemoveCommas(requirements.Titanium))},
      {"Deuterium": formatAddCommas(formatRemoveCommas(totals.Deuterium) - formatRemoveCommas(requirements.Deuterium))},
      {"Nickel": formatAddCommas(formatRemoveCommas(totals.Nickel) - formatRemoveCommas(requirements.Nickel))},
      {"Plasma": formatAddCommas(formatRemoveCommas(totals.Plasma) - formatRemoveCommas(requirements.Plasma))}
    ]
    setCalculatedRequirements(newValues)
  }
  
  const setRssTypeTotal = (n, v) => {
    const newValues = {
        ...totalRssByType,
        [n]: v
    } 
    setTotalRssByType(newValues)
    calcRequirements(selectedCommand, newValues)
  }
  const formatAddCommas = (s) => {
    return s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  const formatRemoveCommas = s => {
    return parseInt(s.toString().replace(/[^0-9]/g, ''))
  }
  return (
    <Container className="App">
      <Row>
        <h1 style={{textAlign: "center", marginBottom: "2rem"}}>Command Calculator</h1>
        <Col>
          <Row style={{marginBottom:'1.5rem'}}>
            <Col lg={{span:6, offset:3}}>
              <Card>
                <CommandSelect 
                  requirementsData={reqData} 
                  selectedCommand={selectedCommand} 
                  handleChange={handleCommandSelect} />
                <CommandTable
                  addCommas={formatAddCommas} 
                  removeCommas={formatRemoveCommas} 
                  calculatedRequirements={calculatedRequirements} 
                  selectedCommand={selectedCommand} />
              </Card>
            </Col>
          </Row>
          <Row>
            {
              boxData.map( (box) => {
                const char = box.name.charAt(0).toLowerCase();
                return(
                  <RssBlock key={box.name} rss={box} char={char} setTotal={setRssTypeTotal} />
                )
              })
            }
          </Row>
        </Col>
      </Row>
      
    </Container> 
  );
}

export default App;