import {React, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Card from './Components/UI/Card';
import boxData from './Data/Boxes.json';
import reqData from './Data/BuildingRequirements.json';
import RssBlock from './Components/RssBlock/RssBlock';
import CommandSelect from './Components/CommandBlock/CommandSelect';
import CommandTable from './Components/CommandBlock/CommandTable';
import Modal from './Components/UI/MyModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [modalShow, setModalShow] = useState(false);
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
    "Plasma": 0,
    "Buildings": []
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
      "Plasma": formatAddCommas(lvlData.Plasma),
      "Buildings":[
        lvlData.Buildings
      ]
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
  const launchModal = e => {
    e.preventDefault()
    setModalShow(true)
  }
  return (
    <div className="App">
      <Container>
        <Row>
          <h1 className="text-center mb2rem">Command Calculator</h1>
          <Col>
            <Row className="mb1hrem">
              <Col lg={{span:6, offset:3}}>
                <Card>
                  <p className="text-center text-italic">Select a command center level to see if you have enough resources to upgrade</p>
                  
                  <CommandSelect
                    requirementsData={reqData}
                    selectedCommand={selectedCommand}
                    handleChange={handleCommandSelect} />
                  <CommandTable
                    addCommas={formatAddCommas}
                    removeCommas={formatRemoveCommas}
                    calculatedRequirements={calculatedRequirements}
                    selectedCommand={selectedCommand} />
                    <p className="text-bold text-right" style={{marginBottom:"0", marginTop:"25px"}}><a href="#" onClick={launchModal}><FontAwesomeIcon icon={faInfoCircle} /> How To Use</a></p>
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
        <Row className="mt30">
          <p className="text-center text-italic" style={{fontSize:"12px"}}>&copy; SykoNaught 2021 | Designed and Developed by SykoNaught | SYK R5 - Nebula 28</p>
        </Row>
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          header="How To Use">
          <div className="youtube-wrapper">
            <iframe className="youtube-video" src="https://www.youtube.com/embed/PLu09lcPAJg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </Modal>
      </Container> 
    </div>
  );
}

export default App;