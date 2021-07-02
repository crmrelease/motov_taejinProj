import React,{useEffect,useState} from 'react'
import { withStyles } from '@material-ui/core/styles';
import TableCell from "@material-ui/core/TableCell";
import TableBody from '@material-ui/core/TableBody';
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";

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
      height:"20px",
      borderLeft:'1px solid rgba(224, 224, 224, 1)',
  
      },
  })(TableCell);
  
  const StyledCheckedFirstCell = withStyles({
    root: {
      width:"50px",
      height:"20px",
      },
  })(TableCell);
  

const RenderingSelect = ({selectPolygon,isChecked,setIsChecked,setSelectPolygon,selectRegion,setSelectRegion})=>{

    const isSelected=(e,cur)=>{
        let index=selectPolygon.findIndex(key => (key.country ===cur.country&&key.city ===cur.city))
        if(index===-1){
          setSelectPolygon([...selectPolygon,cur])
          isChecked[0][cur.country]=true
          setIsChecked([...isChecked])
        }else{
          selectPolygon.splice(index, 1);
          setSelectPolygon([...selectPolygon])
          isChecked[0][cur.country]=false
          setIsChecked([...isChecked])
        }
      }
  
     

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
            <TableBody key={`body${i}`}>
          <TableRow key={`row${i}`}>
          <StyledCheckedFirstCell padding="checkbox" key={`checkCell${i}`} >
          <Checkbox onChange={(e)=>isSelected(e,selectRegion[i])} checked={isChecked[0][selectRegion[i].country]} name={selectRegion[i].country} value={selectRegion[i]} key={`checkbox${i}`}/>
          </StyledCheckedFirstCell>
          <StyledTableCell scope="row" component="th" key={`cell${i}`} >
            {selectRegion[i].country}
          </StyledTableCell>
          <StyledCheckedCell  padding="checkbox" key={`checkCell${i+1}`} >
          <Checkbox  onChange={(e)=>isSelected(e,selectRegion[i+1])} checked={isChecked[0][selectRegion[i+1].country]} value={selectRegion[i+1]} key={`checkbox${i+1}`}/>
          </StyledCheckedCell>
          <StyledTableCell scope="row"  component="th" key={`cell${i+1}`} >
            {selectRegion[i+1].country}
          </StyledTableCell>
          <StyledCheckedCell padding="checkbox" key={`checkCell${i+2}`}>
          <Checkbox  onChange={(e)=>isSelected(e,selectRegion[i+2])} checked={isChecked[0][selectRegion[i+2].country]} value={selectRegion[i+2]} key={`checkbox${i+2}`}/>
          </StyledCheckedCell>
          <StyledTableCell scope="row"  component="th" key={`cell${i+2}`}>
            {selectRegion[i+2].country}
          </StyledTableCell>
          </TableRow>
          </TableBody>
        );
        
      }}
      
        if(selectRegion.length%3===1){
          result.push(
            <TableBody key={`finalBody1`}>
          <TableRow key={`finalRow1`}>
          <StyledCheckedFirstCell  padding="checkbox"  key={`finalCheckCell1-1`}>
          <Checkbox  onChange={(e)=>isSelected(e,selectRegion[selectRegion.length-1])} checked={isChecked[0][selectRegion[selectRegion.length-1].country]} key={`finalCheckbox1-1`} />
          </StyledCheckedFirstCell>
          <StyledTableCell scope="row" component="th" key={`fianlCell1-1`} >
            {selectRegion[selectRegion.length-1].country}
          </StyledTableCell>
          <StyledCheckedCell key={`finalCheckCell1-2`}/>
          <StyledTableCell key={`finalCell1-2`}/>
          <StyledCheckedCell key={`finalCheckCell1-3`}/>
          <StyledTableCell key={`finalCell1-3`}/>
          </TableRow>
          </TableBody>
          )
        }
        
          else if(selectRegion.length%3===2){
            result.push(
              <TableBody key={`finalBody2`}>
              <TableRow key={`finalRow12`}>
              <StyledCheckedFirstCell  padding="checkbox" key={`finalCheckCell2-1`}>
              <Checkbox  onChange={(e)=>isSelected(e,selectRegion[selectRegion.length-2])} checked={isChecked[0][selectRegion[selectRegion.length-2].country]} key={`finalCheckbox2-1`} />
              </StyledCheckedFirstCell>
              <StyledTableCell scope="row" component="th" key={`fianlCell2-1`} >
                {selectRegion[selectRegion.length-2].country}
              </StyledTableCell>
              <StyledCheckedCell  padding="checkbox" key={`finalCheckCell2-2`}>
              <Checkbox onChange={(e)=>isSelected(e,selectRegion[selectRegion.length-1])} checked={isChecked[0][selectRegion[selectRegion.length-1].country]} key={`finalCheckbox2-2`}/>
              </StyledCheckedCell>
              <StyledTableCell scope="row" component="th" key={`fianlCell2-2`} >
                {selectRegion[selectRegion.length-1].country}
              </StyledTableCell>
              <StyledCheckedCell key={`finalCheckCell2-3`}/>
              <StyledTableCell key={`finalCell2-3`}/>
              </TableRow>
              </TableBody>
              )
        }
        return result;
      };
  

export default RenderingSelect