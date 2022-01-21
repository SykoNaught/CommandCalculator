import {React, useState} from 'react';
import classes from './UploadPreview.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faQuestionCircle, faWindowClose, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from '../UI/MyModal';
import {Row, Col} from 'react-bootstrap';

const UploadPreview = (props) => {

  const [imgs, setImgs] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [deleteModalShow, setDeleteModalShow] = useState(false)

  const addImages = (event) => {
    let images = Array.from(event.target.files).map((image) =>
      URL.createObjectURL(image)
    );

    images.push(...imgs);
    setImgs(images);
    console.log(imgs);
  };
  const removeImage = (imgRef) => {
    const newImages = imgs.filter((img) => img !== imgRef);
    setImgs(newImages);
  }

  const launchModal = e => {
    e.preventDefault()
    setModalShow(true)
  }
  const launchDeleteModal = e => {
    e.preventDefault()
    setDeleteModalShow(true)
  }
  const handleRemove = e => {
    const id = props.portId
    const name = props.portName
    props.removePort(id,name)
  }
  return (
    <div className={`${classes.uploadSection}`}>
      <div className={`${classes.uploadBtnWrap}`}>
        {props.portId === 1 ? 
        <>        
          <p>  
            <button className="modal-btn" onClick={launchModal}>Upload Screenshots of your Depot <FontAwesomeIcon icon={faQuestionCircle} /></button>
          </p>
          <label className={`${classes.btn} ${classes.uploadBtn}`}>
            <span>Upload&nbsp;</span> <FontAwesomeIcon icon={faPlus} style={{color:"#6c757d"}} />
            <input type="file" hidden multiple onChange={addImages} accept="image/*" />
          </label>
        </>
         :
         <Row>
           <Col className="d-md-none" style={{marginBottom:"15px"}}>
            <p><button className="modal-btn" onClick={launchDeleteModal}>Delete Spaceport and Resources <FontAwesomeIcon icon={faQuestionCircle} /></button></p>
            <button className="modal-btn removePort" onClick={handleRemove}><span>Remove {props.portName}&nbsp;</span> <FontAwesomeIcon style={{marginTop: "4px"}} icon={faTrashAlt} /></button>
           </Col>
           <Col lg={6} md={6} className={`${classes.dashedDivider}`}>
            <p>  
              <button className="modal-btn" onClick={launchModal}>Upload Screenshots of your Depot <FontAwesomeIcon icon={faQuestionCircle} /></button>
            </p>
            <label className={`${classes.btn} ${classes.uploadBtn}`}>
              <span>Upload&nbsp;</span> <FontAwesomeIcon icon={faPlus} style={{color:"#6c757d"}} />
              <input type="file" hidden multiple onChange={addImages} accept="image/*" />
            </label>
           </Col>
           <Col lg={6} md={6} className="d-none d-sm-none d-md-block" style={{alignSelf:"flex-end"}}>
            <p><button className="modal-btn" onClick={launchDeleteModal}>Delete Spaceport and Resources <FontAwesomeIcon icon={faQuestionCircle} /></button></p>
            <button className="modal-btn removePort" onClick={handleRemove}><span>Remove {props.portName}&nbsp;</span> <FontAwesomeIcon style={{marginTop: "4px"}} icon={faTrashAlt} /></button>
           </Col>
         </Row>
          
          
        }
        
      </div>
      
      <div className={`${classes.imageList}`}>
        {imgs.map((img) => {
          return (
            <div
              key={img}
              className={`${classes.imageWrap}`}
              style={{ maxWidth: "100%" }}
            >
              
              <img
                className="col-12"
                src={img}
                alt={img}
              />
              <button
                className={`${classes.removeBtn}`}
                onClick={() => removeImage(img)}
              >
                <FontAwesomeIcon title="Remove Image" alt="Remove Image" icon={faWindowClose} style={{color:"#e3e3e3"}} />
              </button>
            </div>
          );
        })}
      </div>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        header="Depot Screenshots">
        <p>I added the ability to upload screenshots on the page. I did this because as I used the tool on my mobile device, I HATED having to switch back and forth between Infinite Galaxy and the calculator.</p>
        <p>So, you can now upload multiple screenshots of your depot here on the page, so that you can simply scroll up and reference the images!</p>
      </Modal>
      <Modal
        show={deleteModalShow}
        onHide={() => setDeleteModalShow(false)}
        size="lg"
        header="Delete Spaceport">
        <p>This button will delete all resources associated with this spaceport, and remove it from the page/calculator.</p>
        <p>Only delete a spaceport if you are certain that you do not want it to be included on this page.</p>
      </Modal>
    </div>
  )
};

export default UploadPreview;