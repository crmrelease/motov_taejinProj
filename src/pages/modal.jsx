import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import axios from "axios";
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import RenderingCancel from './renderCancel'
import RenderingSelect from './renderSelect'

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
const SubWrapper1=styled.div`
width: 490px;
margin-left:20px;
`

const SubWrapper2=styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
width: 310px;
margin-rignt:80px;
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

const StyledTypography=withStyles({
  root: {
    textAlign: 'left',
    font: 'normal normal normal 18px/27px Noto Sans KR Regular',
    letterSpacing: '0px',
    color: '#121212',
    opacity: '1',
    marginLeft:'10px'
  },
})(Typography);

const StyledTypography2=withStyles({
  root: {
    
    marginLeft:'10px'
  },
})(Typography);

const StyledTypography3=withStyles({
  root: {
    textAlign: 'center',
    font: 'normal normal normal 14px/20px Noto Sans KR Regular',
    letterSpacing: '0px',
    color: '#FFFFFF',
    opacity: '1',
  },
})(Typography);


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

const StyledButton3 = withStyles({
  root: {
    width: '120px',
    height: '36px',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    borderRadius: '2px',
    border:'1px solid #BDC3CE',
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
    maxHeight: '380px',
    },
})(TableContainer);

const StyledTable2 = withStyles({
  root: {
    boxShadow: "none",
    maxHeight: '100px',
    },
})(TableContainer);



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
  const [isChecked,setIsChecked]=useState([])


  let indexList=[]
  let indexObject={}

  useEffect(()=>{
    
    axios.get(`https://motov-coding-homework.s3.ap-northeast-2.amazonaws.com/country.json`).then(
        function(response) {
          let geoDataIndex=[]
          let indexSet= new Set()
          response.data.maps.map(key=>{
            indexSet.add(key.city)
            indexObject[key.country]=false
          })
          setCityList([...indexSet])
          indexList.push(indexObject)
          setIsChecked(indexList)
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
    }).then(function(){
      setLoadIndex(false)
    })
    .catch(function(error) {
        console.log("실패");
    })
          
  },[])
  
  

    const close = (e) => {
        if (onClose) {
          setPolygonFunction(selectPolygon)
          onClose(e)
        }
      }

    const SelectAllRegion=()=>{
        setSelectPolygon([...selectRegion])
        selectRegion.forEach(key=>{
          indexObject[key.country]=true
        })
        indexList.push(indexObject)
        setIsChecked([Object.assign(...isChecked,...indexList)])
      }
  
      const CancelAllRegion=()=>{
        setSelectPolygon([])
        selectRegion.forEach(key=>{
          indexObject[key.country]=false
        })
        indexList.push(indexObject)
        setIsChecked([Object.assign(...isChecked,...indexList)])
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

    
    
  return (
      <ModalWrapper className={className} tabIndex="-1" visible={visible}>
        <ModalInner  tabIndex="0" className="modal-inner">
        {loadIndex ? (<StyledLoadingSpinner size={100}/>):
        (
          <>
        <MidWrapper1>
        <StyledTypography>지역 설정</StyledTypography>
        </MidWrapper1>
        <MidWrapper2>
          <SubWrapper1>
        <StyledSelect onChange={handleChange} native>
        {cityList.map((elem, idx) => {
                return <option value={elem}>{elem}</option>
              })
            }
        </StyledSelect>
        </SubWrapper1>
        <SubWrapper2>
        <StyledButton2 onClick={SelectAllRegion}>
          <StyledTypography3>전체선택</StyledTypography3>
          </StyledButton2>
        <StyledButton3 onClick={CancelAllRegion}>전체선택해제</StyledButton3>
        </SubWrapper2>
        </MidWrapper2>
        <Divider/>
        <MidWrapper3>
        <StyledTable >
        <Table>
        {RenderingSelect({selectRegion,setSelectRegion,isChecked,setIsChecked,selectPolygon,setSelectPolygon})}
        </Table>
        </StyledTable>
        </MidWrapper3>
        <MidWrapper1>  
        <StyledTypography2>선택 지역</StyledTypography2>
        </MidWrapper1>
        <MidWrapper4>
          <StyledTable2 >
        <Table>
        {RenderingCancel({selectPolygon,setSelectPolygon})}
        </Table>
      </StyledTable2>
        </MidWrapper4> 
        <MidWrapper5>
        {closable && <StyledButton className="modal-close" onClick={close} variant='outlined'>
        <StyledTypography3>지역 선택 완료</StyledTypography3>
          </StyledButton>}
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