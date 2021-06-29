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
import axios from "axios";
import { Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

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
height: 400px;
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
margin-top: 20px;
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
    opacity: '1',
    marginBottom:'25px'
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

const StyledTable = withStyles({
  root: {
    boxShadow: "none",
    borderTop: '1px solid rgba(224, 224, 224, 1)',
    borderRihgt:'1px solid rgba(224, 224, 224, 1)',
    borderLeft:'1px solid rgba(224, 224, 224, 1)',
    maxHeight: '360px'
    },
})(TableContainer);

const StyledTable2 = withStyles({
  root: {
    boxShadow: "none",
    maxHeight: '100px'
    },
})(TableContainer);

const StyledTableCell = withStyles({
  root: {
    width:"216px",
    borderRihgt:'1px solid rgba(224, 224, 224, 1)',
    height:"20px"
    },
})(TableCell);

const StyledCheckedCell = withStyles({
  root: {
    width:"50px",
    height:"20px"
    },
})(TableCell);

const StyledCancelCell = withStyles({
  root: {
    width:"50px",
    height:"20px"
    },
})(TableCell);


const StyledLoadingSpinner = withStyles({
  root: {
    marginTop:"320px"
    },
})(CircularProgress);


const Modal = ({ setPolygonFunction, className, visible,maskClosable ,closable, onClose}) =>{

  const [geoData,setGeoData]=useState([])
  const [cityList,setCityList]=useState([])
  const [selectCity,setSelectCity]=useState('서울특별시')
  const [selectRegion,setSelectRegion]=useState([])
  const [selectPolygon,setSelectPolygon]=useState([])
  const [loadIndex,setLoadIndex]=useState(true)

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
          geoDataIndex.forEach(key=>{
            if(key[0].city===selectCity){
              setSelectRegion(key)
            }
          })
          setLoadIndex(false)
    })
    .catch(function(error) {
        console.log("실패");
    })
          
    
  
  },[])
  

  

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

    const SelectAllRegion=()=>{
        setSelectPolygon([...selectRegion])
      
      }
  
      const CancelAllRegion=()=>{
        setSelectPolygon([])
      }

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

    const isSelected=(e,cur)=>{
      let index=selectPolygon.findIndex(key => (key.country ===cur.country&&key.city ===cur.city))
      if(index===-1){
        setSelectPolygon([...selectPolygon,cur])
      }else{
        selectPolygon.splice(index, 1);
        setSelectPolygon([...selectPolygon])
      }
    }

    const isCanceled=(e,cur)=>{
      let index=selectPolygon.findIndex(key => (key.country ===cur.country&&key.city ===cur.city))
      if(index!==-1){
      selectPolygon.splice(index, 1);
      setSelectPolygon([...selectPolygon])
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
    
      if(selectRegion.length===1||selectRegion.length===2){
      }else{
      for(let i = 0; i <loopIndex; i+=3) {
        result.push(
          <TableBody>
        <TableRow >
        <StyledCheckedCell id={'check-stay-origin1'} padding="checkbox" >
        <Checkbox onChange={(e)=>isSelected(e,selectRegion[i])} value={selectRegion[i]}/>
        </StyledCheckedCell>
        <StyledTableCell scope="row" id={labelId} component="th" >
          {selectRegion[i].country}
        </StyledTableCell>
        <StyledCheckedCell id={'check-stay-origin2'} padding="checkbox" >
        <Checkbox  onChange={(e)=>isSelected(e,selectRegion[i+1])} value={selectRegion[i+1]}/>
        </StyledCheckedCell>
        <StyledTableCell scope="row" id={labelId} component="th" >
          {selectRegion[i+1].country}
        </StyledTableCell>
        <StyledCheckedCell id={'check-stay-origin3'} padding="checkbox" >
        <Checkbox  onChange={(e)=>isSelected(e,selectRegion[i+2])} value={selectRegion[i+2]}/>
        </StyledCheckedCell>
        <StyledTableCell scope="row" id={labelId} component="th" >
          {selectRegion[i+2].country}
        </StyledTableCell>
        </TableRow>
        </TableBody>
      );
      
    }}
    
      if(selectRegion.length%3===1){
        result.push(
          <TableBody>
        <TableRow>
        <StyledCheckedCell id={'check-stay-1-1'} padding="checkbox" >
        <Checkbox  onChange={(e)=>isSelected(e,selectRegion[selectRegion.length-1])}  />
        </StyledCheckedCell>
        <StyledTableCell scope="row" id={labelId} component="th" >
          {selectRegion[selectRegion.length-1].country}
        </StyledTableCell>
        <StyledCheckedCell/>
        <StyledTableCell/>
        <StyledCheckedCell/>
        <StyledTableCell/>
        </TableRow>
        </TableBody>
        )
      }
      
        else if(selectRegion.length%3===2){
          result.push(
            <TableBody>
            <TableRow>
            <StyledCheckedCell id={'check-stay-2-1'} padding="checkbox" >
            <Checkbox  onChange={(e)=>isSelected(e,selectRegion[selectRegion.length-2])} />
            </StyledCheckedCell>
            <StyledTableCell scope="row" id={labelId} component="th" >
              {selectRegion[selectRegion.length-2].country}
            </StyledTableCell>
            <StyledCheckedCell id={'check-stay-2-2'} padding="checkbox" >
            <Checkbox onChange={(e)=>isSelected(e,selectRegion[selectRegion.length-1])}/>
            </StyledCheckedCell>
            <StyledTableCell scope="row" id={labelId} component="th" >
              {selectRegion[selectRegion.length-1].country}
            </StyledTableCell>
            <StyledCheckedCell/>
            <StyledTableCell/>
            </TableRow>
            </TableBody>
            )
      }
      return result;
    };

    const renderingChecked = ()=>{

      const result = [];
      let loopIndex=selectPolygon.length
      if(selectPolygon.length%3===1){
        loopIndex-=1
      }
      else if(selectPolygon.length%3===2){
        loopIndex-=2
      }
    
      for(let i = 0; i <loopIndex; i+=3) {
        
        result.push(
          <TableBody>
  <TableRow>
          <StyledTableCell scope="row" id={labelId} component="th" >
     {selectPolygon[i].country}
 </StyledTableCell>
 <StyledCancelCell onClick={(e)=>isCanceled(e,selectPolygon[i])}><CloseIcon/></StyledCancelCell>
 <StyledTableCell scope="row" id={labelId} component="th" >
     {selectPolygon[i+1].country}
 </StyledTableCell>
 <StyledCancelCell onClick={(e)=>isCanceled(e,selectPolygon[i+1].country)}><CloseIcon/></StyledCancelCell>
 <StyledTableCell scope="row" id={labelId} component="th" >
     {selectPolygon[i+2].country}
 </StyledTableCell>
 <StyledCancelCell onClick={(e)=>isCanceled(e,selectPolygon[i+2].country)}><CloseIcon/></StyledCancelCell>
 </TableRow>
    </TableBody>
        )
      }

if(selectPolygon.length%3===1){

result.push(<TableBody>
  <TableRow>
 <StyledTableCell scope="row" id={labelId} component="th" >
     {selectPolygon[selectPolygon.length-1].country}
 </StyledTableCell>
 <StyledCancelCell onClick={(e)=>isCanceled(e,selectPolygon[selectPolygon.length-1])}><CloseIcon/></StyledCancelCell>
 <StyledTableCell/>
 <StyledCancelCell/>
 <StyledTableCell/>
 <StyledCancelCell/>
 </TableRow>
    </TableBody>
)
}

if(selectPolygon.length%3===2){
    result.push(<TableBody>
      <TableRow>
    <StyledTableCell scope="row" id={labelId} component="th" >
        {selectPolygon[selectPolygon.length-2].country}
    </StyledTableCell>
    <StyledCancelCell onClick={(e)=>isCanceled(e,selectPolygon[selectPolygon.length-2])}><CloseIcon/></StyledCancelCell>
    <StyledTableCell scope="row" id={labelId} component="th" >
        {selectPolygon[selectPolygon.length-1].country}
    </StyledTableCell>
    <StyledCancelCell onClick={(e)=>isCanceled(e,selectPolygon[selectPolygon.length-1])}><CloseIcon/></StyledCancelCell>
    <StyledTableCell/>
    <StyledCancelCell/>
    </TableRow>
        </TableBody>
    )
}

      return result
    }
    
    
  return (
      <ModalWrapper className={className} onClick={maskClosable ? onMaskClick : null} tabIndex="-1" visible={visible}>
        <ModalInner  tabIndex="0" className="modal-inner">
          {console.log(selectRegion)}
        {loadIndex ? (<StyledLoadingSpinner size={100}/>):
        (
          <>
        <MidWrapper1>
        <Typography>지역 설정</Typography>
        </MidWrapper1>
        <MidWrapper2>
        <StyledSelect onChange={handleChange} native>
        {cityList.map((elem, idx) => {
                return <option value={elem}>{elem}</option>
              })
            }
        </StyledSelect>
        <StyledButton2 onClick={SelectAllRegion}>전체선택</StyledButton2>
        <StyledButton2 onClick={CancelAllRegion}>전체선택해제</StyledButton2>
        </MidWrapper2>
        <Divider/>
        <MidWrapper3>
        <StyledTable >
        <Table>
        {rendering()}
        </Table>
        </StyledTable>
        </MidWrapper3>
        <MidWrapper1>  
        <Typography>선택 지역</Typography>
        </MidWrapper1>
        <MidWrapper4>
          <StyledTable2 >
        <Table>
        {renderingChecked()}
        </Table>
      </StyledTable2>
        </MidWrapper4> 
        <MidWrapper5>
        {closable && <StyledButton className="modal-close" onClick={close} variant='outlined'>지역 선택 완료</StyledButton>}
        </MidWrapper5>
        </>
        )}
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