import Modal from 'react-modal/lib/components/Modal'
import './styles.css'

const customStyles = {
    content: {
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'white',
        zIndex: '3',
        border: 'none'
    },
  };

export default function Loader() {
  return (
    <Modal
    appElement={document.getElementById('root') || undefined}
    isOpen={true}
    style={customStyles}
    >
      <img src="./img/spinner_logo.png" alt="" className='rotarLogoLoader'  />
    </Modal>
  )
}
