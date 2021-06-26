import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '@material-ui/core';

const Modal = ({ className, visible,maskClosable ,closable, onClose}) =>{

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
        <ModalInner style={{height:'780px'}} tabIndex="0" className="modal-inner">
        테스트
        {closable && <Button color="primary" className="modal-close" onClick={close} >닫기</Button>}
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
  position: relative;
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
export default Modal

// transform: translateY(-50%);
//   margin: 0 auto;
//   padding: 40px 20px;
  