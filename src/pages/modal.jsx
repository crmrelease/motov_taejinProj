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




const Modal = ({ setPolygonFunction, className, visible,maskClosable ,closable, onClose}) =>{

  const [geoData,setGeoData]=useState([])
  const [cityList,setCityList]=useState([])
  const [selectCity,setSelectCity]=useState('서울특별시')
  const [selectRegion,setSelectRegion]=useState([])
  const [selectPolygon,setSelectPolygon]=useState([])

  useEffect(()=>{
    
    axios.get(`https://motov-coding-homework.s3.ap-northeast-2.amazonaws.com/country.json`).then(
        function(response) {
          let geoDataIndex=[]
          let indexSet= new Set()
          response.data.maps.map(key=>indexSet.add(key.city))
          setCityList([...indexSet])
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
    geoData.map((key,idx)=>{
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
          setPolygonFunction(selectPolygon)
          onClose(e)
        }
      }

    const isSelected=(e,cur)=>{
      console.log(cur)
      let index=selectPolygon.findIndex(key => (key.country ===cur.country&&key.city ===cur.city))
      if(index===-1){
        setSelectPolygon([...selectPolygon,cur])
      }else{
        selectPolygon.splice(index, 1);
        setSelectPolygon(selectPolygon)
      }
    }

    let labelId
    const rendering = () => {
      const result = [];
      let loopIndex=selectRegion.length
      if(selectRegion.length%3===1){
          loopIndex-=1
      }
      else if(selectRegion.length%3===2){
          loopIndex-=2
      }
    
      for(let i = 0; i <loopIndex; i+=3) {
        result.push(
        <>
        <TableRow  role="checkbox" >
        <TableCell onClick={(e)=>isSelected(e,selectRegion[i])} padding="checkbox" key={selectRegion[i]}>
        <Checkbox inputProps={{ 'aria-labelledby': labelId }} />
        </TableCell>
        <TableCell scope="row" id={labelId} component="th" >
          {selectRegion[i].country}
        </TableCell>
        <TableCell onClick={(e)=>isSelected(e,selectRegion[i+1])} padding="checkbox" key={selectRegion[i+1]}>
        <Checkbox inputProps={{ 'aria-labelledby': labelId }} />
        </TableCell>
        <TableCell scope="row" id={labelId} component="th" >
          {selectRegion[i+1].country}
        </TableCell>
        <TableCell onClick={(e)=>isSelected(e,selectRegion[i+2])} padding="checkbox" key={selectRegion[i+2]}>
        <Checkbox inputProps={{ 'aria-labelledby': labelId }} />
        </TableCell>
        <TableCell scope="row" id={labelId} component="th" >
          {selectRegion[i+2].country}
        </TableCell>
        </TableRow>
        </>
      );
      }
    
      if(selectRegion.length%3===1){
        result.push(
        <>
        <TableRow  role="checkbox" >
        <TableCell onClick={(e)=>isSelected(e,selectRegion[selectRegion.length-1])} padding="checkbox" key={selectRegion[selectRegion.length-1]}>
        <Checkbox inputProps={{ 'aria-labelledby': labelId }} />
        </TableCell>
        <TableCell scope="row" id={labelId} component="th" >
          {selectRegion[selectRegion.length-1].country}
        </TableCell>
        </TableRow>
        </>
        )
      }
      
        else if(selectRegion.length%3===2){
          result.push(
            <>
            <TableRow  role="checkbox" >
            <TableCell onClick={(e)=>isSelected(e,selectRegion[selectRegion.length-2])} padding="checkbox" key={selectRegion[selectRegion.length-2]}>
            <Checkbox inputProps={{ 'aria-labelledby': labelId }} />
            </TableCell>
            <TableCell scope="row" id={labelId} component="th" >
              {selectRegion[selectRegion.length-2].country}
            </TableCell>
            <TableCell onClick={(e)=>isSelected(e,selectRegion[selectRegion.length-1])} padding="checkbox" key={selectRegion[selectRegion.length-1]}>
            <Checkbox inputProps={{ 'aria-labelledby': labelId }} />
            </TableCell>
            <TableCell scope="row" id={labelId} component="th" >
              {selectRegion[selectRegion.length-1].country}
            </TableCell>
            </TableRow>
            </>
            )
      }
    
      return result;
    };
    
    
  return (
      <ModalWrapper className={className} onClick={maskClosable ? onMaskClick : null} tabIndex="-1" visible={visible}>
        {console.log(selectPolygon)}
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
        <StyledButton2>전체선택</StyledButton2>
        <StyledButton2>선택해제</StyledButton2>
        </MidWrapper2>
        <Divider/>
        <MidWrapper3>
        <TableContainer component={Paper}>
      <Table aria-label="simple table">
                <TableBody>
        {rendering()}
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