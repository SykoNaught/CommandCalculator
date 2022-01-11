import {React, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Card from './Components/UI/Card';
import boxData from './Data/Boxes.json';
import reqData from './Data/BuildingRequirements.json';
import RssBlock from './Components/RssBlock/RssBlock';
import DropdownSelect from './Components/UI//DropdownSelect';
import BuildingTable from './Components/BuildingBlock/BuildingTable';
import Modal from './Components/UI/MyModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [totalRssByType, setTotalRssByType] = useState({
    "Titanium": 0,
    "Deuterium": 0,
    "Nickel": 0,
    "Plasma": 0
  })
  const [selectedBuilding, setSelectedBuilding] = useState({
    "Name": 'Command Center',
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
  const handleBuildingSelect=(key, e)=>{
    const building = reqData[e.target.dataset.index]
    const fixedIndex = selectedBuilding.Level -1
    const level = building.Levels[fixedIndex]
    const lvlData = level[selectedBuilding.Level][0];

    const newValues = {
      "Name": building.Name,
      "Level": selectedBuilding.Level,
      "Titanium": formatAddCommas(lvlData.Titanium),
      "Deuterium": formatAddCommas(lvlData.Deuterium),
      "Nickel": formatAddCommas(lvlData.Nickel),
      "Plasma": formatAddCommas(lvlData.Plasma),
      "Buildings":[
        lvlData.Buildings
      ]
    }
    setSelectedBuilding(newValues)
    calcRequirements(newValues, totalRssByType)
  }

  const handleLevelSelect=(key, e)=>{
    const buildingIndex =  reqData.map(e => e.Name).indexOf(selectedBuilding.Name);
    const fixedIndex = reqData[buildingIndex].Levels[e.target.dataset.index]
    const lvlData = fixedIndex[e.target.innerHTML][0]
    const newValues = {
      "Name": selectedBuilding.Name,
      "Level": e.target.innerHTML,
      "Titanium": formatAddCommas(lvlData.Titanium),
      "Deuterium": formatAddCommas(lvlData.Deuterium),
      "Nickel": formatAddCommas(lvlData.Nickel),
      "Plasma": formatAddCommas(lvlData.Plasma),
      "Buildings":[
        lvlData.Buildings
      ]
    }
    setSelectedBuilding(newValues)
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
    calcRequirements(selectedBuilding, newValues)
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
        <div className="g-translator">
          <strong style={{fontWeight:"600"}}></strong><div id="google_translate_element"></div>
        </div>
        <Row>
          <h1 className="text-center mb2rem">Infinite Galaxy Resource Calculator</h1>
          <Col>
            <Row className="d-flex justify-content-center">
              <Col lg={6} className='d-flex'>
                <Card>
                  <div className="d-flex flex-column h-100">
                  <p className="text-center text-italic">Select a building and level below.</p>
                    <Row>
                      <Col sm={6} md={6} lg={12} xl={6}>
                        <DropdownSelect
                          options={reqData}
                          optionVal={'Name'}
                          buttonText={selectedBuilding.Name}
                          handleChange={handleBuildingSelect} />
                      </Col>
                      <Col sm={6} md={6} lg={12} xl={6}>
                        <DropdownSelect
                          options={reqData[0].Levels}
                          buttonText={'Level ' + selectedBuilding.Level}
                          handleChange={handleLevelSelect} />
                      </Col>
                    </Row>
                    <p className="text-center" style={{marginTop:'auto'}}>This is an <strong className="text-600">Infinite Galaxy calculator</strong> tool that totals all of the resources in your depot. Then, compares your total resources to the required resources for a selected building and level. You can then see how many more resources you need to complete a building upgrade, or how many extra resources you will have after.</p>
                    <p className="text-center">If you find this infinite galaxy resource calculator tool to be useful, please feel free to share it to your alliance! As more people use this tool, I will add more and more functionality!</p>
                    <div className="text-bold text-right mtauto"><a href="#" onClick={launchModal}><FontAwesomeIcon icon={faInfoCircle} /> How To Use</a></div>
                  </div>
                </Card>
              </Col>
              <Col lg={6} className='d-flex'>
                <Card>
                  <BuildingTable
                    addCommas={formatAddCommas}
                    removeCommas={formatRemoveCommas}
                    calculatedRequirements={calculatedRequirements}
                    selectedBuilding={selectedBuilding} />
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
        <Row>
          <Col lg={12}>
            <Card>
              <h2 id="donation" style={{textAlign:'center', fontSize:'24px', color:'#00a500'}}>Help keep this site up and running!</h2>
              <p style={{marginBottom:'25px'}}></p>
              <div className="addthis_bottom_donate">
                <div className="addthis_tipjar_inline"></div>
              </div>
              <p></p>
              <p>The infinite galaxy resource calculator is a <strong className="text-600">free tool</strong> created and managed by just one person. It can be a bit of work to manage and keep up to date. The cost of keeping this Free Infinite Galaxy Tool online can also get pretty expensive for me on an annual basis. You are not obligated to donate, but any little bit helps!</p>
              <p>If just a few of the users donate, I can keep this tool online and continue adding functionality. I really hope to expand this tool and include many more features. Such as <strong className="text-600">the ability to save your data, add multiple farms, language translations, and much more.</strong> So if you are feeling generous, and want to help a poor developer who loves to play Infinite Galaxy, please feel free to donate below! Any amount helps! Just think of it like buying a pack from the shop in-game ;)</p>
            </Card>
          </Col>
        </Row>
        <Row className="mt30">
          <p className="text-center text-italic" style={{fontSize:"12px"}}>&copy; SykoNaught 2022 | Designed and Developed by SykoNaught | SYK - Nebula 28</p>
        </Row>
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          header="How To Use">
          <div className="youtube-wrapper">
            <iframe className="youtube-video" src="https://www.youtube.com/embed/_AP7BjrVTic" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </Modal>
      </Container> 
    </div>
  );
}

export default App;