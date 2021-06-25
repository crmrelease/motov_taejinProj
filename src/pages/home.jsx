import React, {useEffect,useState} from "react";
import { NaverMap,Polygon } from "react-naver-maps";
import axios from "axios";
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import Modal from './modal'

const Wrapper = styled.div`
.react-naver-map{
  .MuiButtonBase-root.MuiButton-root.MuiButton-contained{
    z-index:10
  }
}
`



const Home = () => {

const [isActive, setIsActive] = useState(false);

const testClick =(e)=>{
    console.log(e)
}

const modalClick =(e)=>{
  setIsActive(true)
}

const closeModal =(e)=>{
  setIsActive(false)
}


useEffect(()=>{
    
  axios.get(`https://motov-coding-homework.s3.ap-northeast-2.amazonaws.com/country.json`).then(
      function(response) {
      console.log(response);
  })
  .catch(function(error) {
      console.log("실패");
  })
        


},[])

    return (
        <Wrapper>
        <NaverMap
          mapDivId={process.env.API_KEY} 
          style={{
            width: '100%', 
            height: '85vh'
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
        <Button style={{zIndex:10}} variant="contained" onClick={testClick}>폴리곤</Button>
        <Button style={{zIndex:10}} variant="contained" onClick={modalClick}>팝업</Button>
        </NaverMap>      
        {
        isActive && <Modal
          visible={isActive}
          closable={true}
          maskClosable={true}
          onClose={closeModal}>Hello</Modal>
      }
        </Wrapper>
      );
};

export default Home;