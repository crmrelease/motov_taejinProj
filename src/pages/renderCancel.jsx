
import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import TableCell from "@material-ui/core/TableCell";
import TableBody from '@material-ui/core/TableBody';
import TableRow from "@material-ui/core/TableRow";
import CloseIcon from '@material-ui/icons/Close';

const StyledCancelCell = withStyles({
  root: {
    width: "50px",
    height: "20px",
    padding: "8px",
    borderTop: '1px solid rgba(224, 224, 224, 1)',

  },
})(TableCell);

const StyledCancelTbleCell = withStyles({
  root: {
    width: "50px",
    height: "20px",
    padding: "8px",
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
    borderTop: '1px solid rgba(224, 224, 224, 1)',
  },
})(TableCell);




const RenderingCancel = ({ selectPolygon, setSelectPolygon }) => {

  const isCanceled = (e, cur) => {
    let index = selectPolygon.findIndex(key => (key.country === cur.country && key.city === cur.city))
    if (index !== -1) {
      selectPolygon.splice(index, 1);
      setSelectPolygon([...selectPolygon])
    }
  }

  const result = [];
  let loopIndex = selectPolygon.length
  if (selectPolygon.length % 3 === 1) {
    loopIndex -= 1
  }
  else if (selectPolygon.length % 3 === 2) {
    loopIndex -= 2
  }

  for (let i = 0; i < loopIndex; i += 3) {

    result.push(
      <TableBody>
        <TableRow>
          <StyledCancelTbleCell scope="row" component="th" >
            {selectPolygon[i].country}
          </StyledCancelTbleCell>
          <StyledCancelCell onClick={(e) => isCanceled(e, selectPolygon[i])}><CloseIcon /></StyledCancelCell>
          <StyledCancelTbleCell scope="row" component="th" >
            {selectPolygon[i + 1].country}
          </StyledCancelTbleCell>
          <StyledCancelCell onClick={(e) => isCanceled(e, selectPolygon[i + 1])}><CloseIcon /></StyledCancelCell>
          <StyledCancelTbleCell scope="row" component="th" >
            {selectPolygon[i + 2].country}
          </StyledCancelTbleCell>
          <StyledCancelCell onClick={(e) => isCanceled(e, selectPolygon[i + 2])}><CloseIcon /></StyledCancelCell>
        </TableRow>
      </TableBody>
    )
  }

  if (selectPolygon.length % 3 === 1) {

    result.push(<TableBody>
      <TableRow>
        <StyledCancelTbleCell scope="row" component="th" >
          {selectPolygon[selectPolygon.length - 1].country}
        </StyledCancelTbleCell>
        <StyledCancelCell onClick={(e) => isCanceled(e, selectPolygon[selectPolygon.length - 1])}><CloseIcon /></StyledCancelCell>
        <StyledCancelTbleCell />
        <StyledCancelCell />
        <StyledCancelTbleCell />
        <StyledCancelCell />
      </TableRow>
    </TableBody>
    )
  }

  if (selectPolygon.length % 3 === 2) {
    result.push(<TableBody>
      <TableRow>
        <StyledCancelTbleCell scope="row" component="th" >
          {selectPolygon[selectPolygon.length - 2].country}
        </StyledCancelTbleCell>
        <StyledCancelCell onClick={(e) => isCanceled(e, selectPolygon[selectPolygon.length - 2])}><CloseIcon /></StyledCancelCell>
        <StyledCancelTbleCell scope="row" component="th" >
          {selectPolygon[selectPolygon.length - 1].country}
        </StyledCancelTbleCell>
        <StyledCancelCell onClick={(e) => isCanceled(e, selectPolygon[selectPolygon.length - 1])}><CloseIcon /></StyledCancelCell>
        <StyledCancelTbleCell />
        <StyledCancelCell />
      </TableRow>
    </TableBody>
    )
  }

  return result
}


export default RenderingCancel