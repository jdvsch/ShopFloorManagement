import React from 'react';
import FeedbackModal from '../../../../utils/FeedbackModal';
import useDate from '../../../../hooks/useDate';
import useGetUserData from '../../../../hooks/useGetUserData';
import useMultipleCRUD from '../../../../hooks/useMultipleCRUD';
import useTextareaCounter from '../../../../hooks/useTextareaCounter';
import { POST_INGRESAR_OC, PUT_EDITAR_OC, POST_HISTORY } from '../../../../config/consts/Api';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
    fecha_requerida: 
        yup.date()
        .required("Debe diligenciar el campo"),
    monto_requerido: 
        yup.number()
        .positive("Solo debes ingresar números positivos")
        .integer("No introduzca punto o coma")
        .typeError("Debe introducir una cantidad"),
    oc_numero: 
        yup.string()
        .required("Debe eligir una de las opciones"),
    pedido: 
        yup.number()
        .positive("Solo debes ingresar números positivos")
        .integer("No introduzca punto o coma")
        .typeError("Debe introducir una cantidad"),
  }).required();

export default function POForm({getBackData, TIPO}) {

    //initial value for useTextareaCounter
    var counter = 0;

    //feedback from POST and PUT
    const [feedbackPOST, setFeedbackPOST] = React.useState(null);
    const [feedbackPUT, setFeedbackPUT] = React.useState(null);

    //changing format from date data
    if (TIPO === 'EPO') {
        if (getBackData.fecha_oc) { getBackData["fecha_oc"] = getBackData.fecha_oc.substring(0,10);}
        if (getBackData.fecha_requerida) { getBackData["fecha_requerida"] = getBackData.fecha_requerida.substring(0,10);}
        if (getBackData.fecha_real_entrega) { getBackData["fecha_real_entrega"] = getBackData.fecha_real_entrega.substring(0,10);}
        if (getBackData.fecha_despacho) { getBackData["fecha_despacho"] = getBackData.fecha_despacho.substring(0,10);}
        if (getBackData.fecha_fabricacion) { getBackData["fecha_fabricacion"] = getBackData.fecha_fabricacion.substring(0,10);} 
        counter = getBackData.nota.length;           
    }

    //calling hooks
    const { MCRUD } = useMultipleCRUD();
    const { fullDate, date } = useDate();
    const { id_user } = useGetUserData();
    const textarea1 = useTextareaCounter(counter);

    //handle submit form
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: getBackData,
        mode: "onBlur",
        resolver: yupResolver(schema)
        });

    //envío de datos a la BD
    const onSubmit = data => {
        let formInfo = data;
        delete formInfo.nombre;
        delete formInfo.name;
        //console.log(formInfo);
        if (TIPO === 'NPO') {
            formInfo.fecha_oc = date();
            const postHI = [{id_user,type:'CREATE',description:'purchaseorder # ',createdAt:fullDate()}];
            const arrayAproved = ['normal',[[POST_INGRESAR_OC,[formInfo]],'POST','insertId'],[[POST_HISTORY,postHI] ,'POST','description']];
            MCRUD(null,null,null,null,arrayAproved,setFeedbackPOST);
        } else {
            delete formInfo.statename;
            const arrayPOST = [[POST_HISTORY,[{id_user,type:'UPDATE',description:`purchaseorder # ${formInfo.id_purchaseorder}`,createdAt:fullDate()}]]];
            const arrayPUT = [[PUT_EDITAR_OC+formInfo.id_purchaseorder,[formInfo]]];
            MCRUD(arrayPOST,null,arrayPUT,null,null,setFeedbackPUT);
        }   
    }

  return (
    <>
    {feedbackPOST &&  <FeedbackModal data={[feedbackPOST,true,'el ingreso', true, ['Ingresar otra OC','/OrdenCompra']]} feedback={null} goto={'/dashboard'}/>}
    {feedbackPUT &&  <FeedbackModal data={[feedbackPUT,true,'la actualización', true, ['Actualizar otra OC','/EditarOC']]} feedback={null} goto={'/dashboard'} />}

    <div className='container'>
        {TIPO === 'NPO' ?
            <h2 className='text-primary fw-bold text-center'>Ingresar de Órdenes de Compra</h2>
            :
            <h2 className='text-primary fw-bold text-center'>Editar una Orden de Compra</h2>
        }
    
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <label htmlFor="nombre" className="col-form-label">Cliente</label>
                <input  readOnly {...register("nombre")} type="text" id="nombre" className="form-control" />
            </div>

            <div className="row">
                <label htmlFor="name" className="col-form-label">Referencia</label>
                <input readOnly {...register("name")} type="text" id="name" className="form-control" />
            </div>

            <div className="row">
                <div className="col-md-3">
                    <label htmlFor="fecha_requerida" className="col-form-label">Fecha requerida</label>
                    <input  {...register("fecha_requerida")} type="date" id="fecha_requerida" className="form-control" />
                    <p className="bg-danger text-center text-white mt-1" >{errors.fecha_requerida?.message}</p>
                </div>

                <div className="col-md-3">
                    <label htmlFor="monto_requerido" className="col-form-label">Cantidad requerida (Kg)</label>
                    <input  {...register("monto_requerido")} type="text" id="monto_requerido" className="form-control" />
                    <p className="bg-danger text-center text-white mt-1" >{errors.monto_requerido?.message}</p>
                </div>

                <div className="col-md-3">
                    <label htmlFor="oc_numero" className="col-form-label">Orden de compra</label>
                    <input  {...register("oc_numero")} type="text" id="oc_numero" className="form-control" />  
                    <p className="bg-danger text-center text-white mt-1" >{errors.oc_numero?.message}</p>
                </div>   

                <div className="col-md-3">
                    <label htmlFor="pedido" className="col-form-label">Pedido (ofimática)</label>
                    <input  {...register("pedido")} type="text" id="pedido" className="form-control" />
                    <p className="bg-danger text-center text-white mt-1" >{errors.pedido?.message}</p> 
                </div>                 
            </div>

            <div className="row">
                <label htmlFor="nota" className="col-form-label">Nota</label>
                <textarea {...register("nota")} id="nota" className="form-control" rows="3" onChange={textarea1.total}/>
                <div className="form-text"> <span>{ textarea1.counter }/255 caracteres</span>  <span className='bg-danger text-center text-white'>{ textarea1.counter>255 && "No debe de exceder de 255 caracteres" } </span></div>           
            </div>

            {TIPO === 'EPO' &&
            <>
                <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="factura" className="col-form-label">Factura</label>
                        <input  {...register("factura")} type="text" id="factura" className="form-control" />
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="monto_despachado" className="col-form-label">Cantidad despachada</label>
                        <input  {...register("monto_despachado")} type="text" id="monto_despachado" className="form-control" />
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="transportador" className="col-form-label">Transportador</label>
                        <input  {...register("transportador")} type="text" id="transportador" className="form-control" />  
                    </div>   

                    <div className="col-md-3">
                        <label htmlFor="remesa" className="col-form-label">Remesa</label>
                        <input  {...register("remesa")} type="text" id="remesa" className="form-control" />
                    </div>                 
                </div>

                <div className="row">
                    <div className="col-md-3">
                        <label htmlFor="fecha_oc" className="col-form-label">Fecha ingreso</label>
                        <input readOnly {...register("fecha_oc")} type="date" id="fecha_oc" className="form-control" />
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="fecha_despacho" className="col-form-label">Fecha de despacho</label>
                        <input  {...register("fecha_despacho")} type="date" id="fecha_despacho" className="form-control" />
                    </div>

                    <div className="col-md-3">
                        <label htmlFor="fecha_real_entrega" className="col-form-label">Fecha real entrega</label>
                        <input  {...register("fecha_real_entrega")} type="date" id="fecha_real_entrega" className="form-control" />  
                    </div>   

                    {!getBackData.fecha_fabricacion ?
                    <div className="col-md-3">
                        <label htmlFor="statename" className="col-form-label">Estado</label>
                        <input readOnly {...register("statename")} type="text" id="statename" className="form-control" />
                    </div>
                    :
                    <div className="col-md-3">
                        <label htmlFor="fecha_fabricacion" className="col-form-label">Fecha de fabricación</label>
                        <input readOnly {...register("fecha_fabricacion")} type="date" id="fecha_fabricacion" className="form-control" />
                    </div>        
                    } 
                </div>            
            </>
            }

            {TIPO === 'NPO' ?
            <button className='btn btn-success my-3' type="submit">Ingresar</button>
            :
            <button className='btn btn-success my-3' type="submit">Actualizar datos</button>
            }
        </form> 
    </div>
    </>
  )
}
