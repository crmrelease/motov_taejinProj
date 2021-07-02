import React, {useState, useRef} from "react";
import { NaverMap,Polygon } from "react-naver-maps";
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import Modal from './modal'
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';


const StyledTextField = withStyles({
  root: {
    width: '400px',
    height: '38px',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    marginRight:'10px',
    boxShadow: '0px 3px 6px #00000033',
    border: '1px solid #CCCCCC',
    borderRadius: '5px',
    opacity: '1',
    zIndex:'10',
    marginLeft:'365px'
  },
})(InputBase);

const StyledButton = withStyles({
  root: {
    width: '100px',
    height: '38px',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    boxShadow: '0px 3px 6px #00000033',
    border: '1px solid #CCCCCC',
    borderRadius: '5px',
    opacity: '1',
    zIndex:'10'
  },
})(Button);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width:1920px;
  height:1200px;
  opacity:1
  position: relative
`
const BarWrapper=styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 20px;
  height: 210px;
  width:1520px;
  height:1200px;
  margin-left:340px;
  margin-right:60px;
`


const Home = () => {

const [isActive, setIsActive] = useState(false);
let polygonInfo=[]
//const [polygonInfo, setPolygonInfo] = useState([]);

const modalClick =(e)=>{
  setIsActive(true)
}

const closeModal =(e)=>{
  setIsActive(false)
}

const rendering=(e)=>{
  if(childInputValue.current){ 
    childInputValue.current.forEach((key)=>{
        polygonInfo.push(String(key.polygon).split('_'))
    })
  }

  const result = [];
  
  polygonInfo.forEach(key=>{
    let polygonForKey=[]
    key.forEach(subKey=>{
        let elemIndex= String(subKey).split(',')
        polygonForKey.push({lat:Number(elemIndex[1]),lng:Number(elemIndex[0])})
    })
    result.push(<Polygon 
      paths={[polygonForKey]}
      fillColor={'#ff0000'}
      fillOpacity={0.3}
      strokeColor={'#ff0000'}
      strokeOpacity={0.6}
      strokeWeight={3}
    />)

  })
  
return result

}

const childInputValue=useRef();

const setPolygonFunction = (inputValue)=>{
  childInputValue.current=inputValue;
}


    return (
        <Wrapper>
        <NaverMap
          mapDivId={process.env.API_KEY} 
          style={{
            width: '100%', 
            height: '95vh'
          }}
          defaultCenter={{ lat: 37.554722, lng: 126.970833 }} 
          defaultZoom={13} 
        >
           {rendering()}
            <BarWrapper>

        <StyledTextField />
        <StyledButton  variant="contained" onClick={modalClick}>지역 설정</StyledButton>
      </BarWrapper>
      
      {
        isActive && <Modal
          visible={isActive}
          //closable={true}
          //maskClosable={true}
         onClose={closeModal}
          setPolygonFunction={setPolygonFunction}
          />
      }
        </NaverMap>              
        </Wrapper>
      );
};

export default Home;