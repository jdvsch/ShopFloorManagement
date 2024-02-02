import useModalTable from '../../../hooks/useModalTable';
import POForm from '../commonSubcomponents/POForm';
import useTimeUpdate from '../../../hooks/useTimeUpdate';
import { GET_BUSCAR_OC } from '../../../config/consts/Api';

export default function EditPurchaseOrder() {
    //
    useTimeUpdate();

    //las cabeceras de las columnas de las tablas
    const COLUMNS_EPO = [
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
    {
        Header: 'F. requerida',
        accessor: 'fecha_requerida',
        sortType: 'basic',
        Cell: (original) => (<button className='btn btn-link text-decoration-none btn-sm' type="button" 
        onClick={()=>{
        setModalIsOpenT(false);
        setModalDataT(original.data[original.row.id])
        }}>
        {original.data[original.row.id].fecha_requerida.substring(0,10)}
        </button>)
    },
    {
        Header: 'Nota',
        accessor: 'nota',
        sortType: 'basic',
        Cell: (original) => (<button className='btn btn-link text-decoration-none btn-sm' type="button" 
        onClick={()=>{
        setModalIsOpenT(false);
        setModalDataT(original.data[original.row.id])
        }}>
        {original.data[original.row.id].nota}
        </button>)
    },
    {
        Header: 'Estado',
        accessor: 'statename',
        sortType: 'basic',
        Cell: (original) => (<button className='btn btn-link text-decoration-none btn-sm' type="button" 
        onClick={()=>{
        setModalIsOpenT(false);
        setModalDataT(original.data[original.row.id])
        }}>
        {original.data[original.row.id].statename}
        </button>)
    },
    {
        Header: 'M. requerido',
        accessor: 'monto_requerido',
        sortType: 'basic',
        Cell: (original) => (<button className='btn btn-link text-decoration-none btn-sm' type="button" 
        onClick={()=>{
        setModalIsOpenT(false);
        setModalDataT(original.data[original.row.id])
        }}>
        {original.data[original.row.id].monto_requerido}
        </button>)
    },
    ];

    //
    const { modalIsOpenT, setModalIsOpenT, modalDataT, setModalDataT, MODALT } = useModalTable(COLUMNS_EPO,GET_BUSCAR_OC);

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
    { modalDataT && <POForm getBackData={modalDataT} TIPO={'EPO'}/> }
    </>
  )
}
