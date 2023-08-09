import { Card, Col, Image } from "react-bootstrap";
import star from './../../assets/star.svg'
import { Link } from "react-router-dom";
import './deviceItem.css';


const DeviceItem = (props) => {
  const deviceId = props.id
  let deviceName = props.type + ' ' +  props.brand;
  if(deviceName.length > 12) {
    deviceName = `${deviceName.slice(0,13)}...`
  }
  return (
    <Col md={3} className={"mt-3"}>
      <Link to={`/devices/${deviceId}`}>
        <Card style={{width:150,cursor:'pointer',overflow:"hidden"}}>
          <Image src={props.img} style={{height:150,width:150,  objectFit:'contain'}}></Image>
          <div className="d-flex justify-content-between align-items-center mt-1 text-black-50">
            <p className="device__name">{deviceName}</p>
            <div className="d-flex align-items-center">
              <div>{props.raiting}</div>
              <Image width={18} height={18} src={star}></Image>
            </div>
          </div>
          <h2>{props.name}</h2>
        </Card>
      </Link>
    </Col>
  );
};

export default DeviceItem;