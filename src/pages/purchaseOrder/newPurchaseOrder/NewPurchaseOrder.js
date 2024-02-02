import useModalTable from '../../../hooks/useModalTable';
import POForm from '../commonSubcomponents/POForm';
import useTimeUpdate from '../../../hooks/useTimeUpdate';
import { GET_CLIENTANDPRODUCT_OC } from '../../../config/consts/Api';

export default function NewPurchaseOrder() {
  //
  useTimeUpdate();

  //table column setup
  const COLUMNS_NPO = [
    {
      Header: 'Cliente',
      accessor: 'nombre', // accessor is the "key" in the data
      sortType: 'basic',
      Cell: (original) => (<button className='btn btn-link text-decoration-none btn-sm' type="button" 
      onClick={()=>{
        setModalIsOpenT(false);
        setModalDataT(original.data[original.row.id])
        }}>
      {original.data[original.row.id].nombre}
      </button>)
    },
    {
      Header: 'Producto',
      accessor: 'name',
      sortType: 'basic',
      Cell: (original) => (<button className='btn btn-link text-decoration-none btn-sm' type="button" 
      onClick={()=>{
        setModalIsOpenT(false);
        setModalDataT(original.data[original.row.id])
        }}>
      {original.data[original.row.id].name}
      </button>)
    },
  ];

  //calling modal table
  const { modalIsOpenT, setModalIsOpenT, modalDataT, setModalDataT, MODALT } = useModalTable(COLUMNS_NPO,GET_CLIENTANDPRODUCT_OC);

  //reload page
  const handleReload = ()=>{
    setModalIsOpenT(true);
  };

  return (
    <>
    { MODALT }
    { !modalDataT && !modalIsOpenT &&
        <div className='container mt-2'>
        <button className='btn btn-warning' onClick={handleReload}>Mostrar lista de nuevo</button>
        </div>
    }
    { modalDataT && <POForm getBackData={modalDataT} TIPO={'NPO'}/> }
    </>
  )
}
