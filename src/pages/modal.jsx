import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import axios from "axios";
import InputLabel from '@material-ui/core/InputLabel';

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0px;
  left:0px;
  z-index: 1000;
  overflow: auto;
  width:1920px;
  height:1200px;
  background: transparent url('img/지역.png') 0% 0% no-repeat padding-box;
  opacity: 1;
  margin-left:560px;
  margin-right:560px
`

const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items:center;
  justify-content:sapce-between ;
  background-color: #fff;
  width: 800px;
  height: 780px;
  top: 210px;
  left: 560px
  background: #FFFFFF 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #BDBDBD;
  opacity: 1;
`  

const MidWrapper1=styled.div`
width: 800px;
display: flex;
flex-direction: column;
justify-content: flex-start;
position: relative;
margin-top: 26px;
padding-left: 21px;
`   
const MidWrapper2=styled.div`
width: 800px;
display: flex;
flex-direction: row;
justify-content: space-around;
position: relative;
margin-top: 40px;
`   

const MidWrapper3=styled.div`
width: 800px;
height: 350px;
display: flex;
flex-direction: row;
position: relative;
margin-top: 20px;
`   

const MidWrapper4=styled.div`
width: 800px;
height: 180px;
display: flex;
flex-direction: row;
position: relative;
margin-top: 50px;
justify-content:center;
`   

const MidWrapper5=styled.div`
width: 800px;
display: flex;
flex-direction: row;
position: relative;
justify-content:center;
`   

const StyledButton = withStyles({
  root: {
    width: '180px',
    height: '36px',
    background: '#008D9B 0% 0% no-repeat padding-box',
    borderRadius: '2px',
    opacity: '1'
  },
})(Button);

const StyledButton2 = withStyles({
  root: {
    width: '120px',
    height: '36px',
    background: '#008D9B 0% 0% no-repeat padding-box',
    borderRadius: '2px',
    opacity: '1',
    paddingRight:'2px'
  },
})(Button);


const StyledSelect = withStyles({
  root: {
    width: '180px',
    height: '24px',
    opacity: '1',
  },
})(Select);




const Modal = ({ className, visible,maskClosable ,closable, onClose}) =>{

  const [geoData,setGeoData]=useState([])
  const [cityList,setCityList]=useState([])
  const [selectCity,setSelectCity]=useState('서울특별시')
  const [selectRegion,setSelectRegion]=useState([])

  useEffect(()=>{
    
    axios.get(`https://motov-coding-homework.s3.ap-northeast-2.amazonaws.com/country.json`).then(
        function(response) {
          let geoDataIndex=[]
          let indexSet= new Set()
          response.data.maps.map(key=>indexSet.add(key.city))
          setCityList(['시,도 선택',...indexSet])
          let cityListArray=[...indexSet]
          cityListArray.map(key=>
            geoDataIndex.push(response.data.maps.filter(elem => elem.city===key))
          )
          setGeoData(geoDataIndex)
    })
    .catch(function(error) {
        console.log("실패");
    })
          
    
  
  },[])
  

  const handleChange=(e)=>{
    setSelectCity(e.target.value)
    let selectCityIndex=e.target.value
    geoData.map(key=>{
      if(key[0].city===selectCityIndex){
        setSelectRegion(key)
      }
    }
    )    
  }

    const onMaskClick = (e) => {
        if (e.target === e.currentTarget) {
          onClose(e)
        }
      }
    
    const close = (e) => {
        if (onClose) {
          onClose(e)
        }
      }

  return (
      <ModalWrapper className={className} onClick={maskClosable ? onMaskClick : null} tabIndex="-1" visible={visible}>
        {console.log(geoData)}
        <ModalInner  tabIndex="0" className="modal-inner">
        <MidWrapper1>  
         지역 설정
        </MidWrapper1>
        <MidWrapper2>
        <StyledSelect onChange={handleChange} native>
        {cityList.map((elem, idx) => {
                return <option key={idx} value={elem}>{elem}</option>
              })
            }
        </StyledSelect>
        <StyledButton2/>
        <StyledButton2/>
        </MidWrapper2>
        <MidWrapper3>
        <TableContainer component={Paper}>
      <Table aria-label="simple table">
                <TableBody>
           {selectRegion.map((key) => (
            <TableRow key={key.city}>
              <TableCell padding="checkbox">
              <Checkbox />
              </TableCell>
              <TableCell component="th" scope="row">
                {key.country}
              </TableCell>
            </TableRow>
          ))} 
          </TableBody>
      </Table>
    </TableContainer>
        </MidWrapper3>
        <MidWrapper4>
        </MidWrapper4> 
        <MidWrapper5>
        {closable && <StyledButton className="modal-close" onClick={close} variant='outlined'>지역 선택 완료</StyledButton>}
        </MidWrapper5>
        </ModalInner>
      </ModalWrapper>
  )
}

Modal.propTypes = {
  visible: PropTypes.bool,
}

Modal.defaultProps = {
    closable: true,
    maskClosable: true,
    visible: false
  }


export default Modal