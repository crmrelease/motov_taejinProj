import React, {useState} from "react";
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

const modalClick =(e)=>{
  setIsActive(true)
}

const closeModal =(e)=>{
  setIsActive(false)
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
            <Polygon 
        paths={[
          [
            {lat:37.37544345085402, lng:127.11224555969238},
            {lat:37.37230584065902, lng:127.10791110992432},
            {lat:37.35975408751081, lng:127.10795402526855},
            {lat:37.359924641705476, lng:127.11576461791992},
            {lat:37.35931064479073, lng:127.12211608886719},
            {lat:37.36043630196386, lng:127.12293148040771},
            {lat:37.36354029942161, lng:127.12310314178465},
            {lat:37.365211629488016, lng:127.12456226348876},
            {lat:37.37544345085402, lng:127.11224555969238}
          ]
        ]}
        fillColor={'#ff0000'}
        fillOpacity={0.3}
        strokeColor={'#ff0000'}
        strokeOpacity={0.6}
        strokeWeight={3}
      />
            <BarWrapper>

        <StyledTextField />
        <StyledButton  variant="contained" onClick={modalClick}>지역 설정</StyledButton>
      </BarWrapper>
      
      {
        isActive && <Modal
          visible={isActive}
          closable={true}
          maskClosable={true}
          onClose={closeModal}/>
      }
        </NaverMap>              
        </Wrapper>
      );
};

export default Home;