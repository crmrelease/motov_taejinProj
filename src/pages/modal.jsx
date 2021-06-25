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
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper className={className} onClick={maskClosable ? onMaskClick : null} tabIndex="-1" visible={visible}>
        <ModalInner style={{height:'800px'}} tabIndex="0" className="modal-inner">
        테스트
        {closable && <Button color="primary" className="modal-close" onClick={close} >닫기</Button>}
        </ModalInner>
      </ModalWrapper>
    </>
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
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
  
 
`

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  `

const ModalInner = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  width: 1000px;
  max-width: 3000px;
  top: 40%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
  
`

export default Modal