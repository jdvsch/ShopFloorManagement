// local test http://localhost:9000/api/login;
// server use http://192.168.1.12:9000/api/login;

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:9010/api/",
});

//INTRODUCIR LA ACCION DE UN USUARIO EN EL HISTORIAL
export const POST_HISTORY = "historyIntra";

//VERIFICAR PASSWORD
export const POST_LOGIN = "login";

// ???
export const GET_USERMENU = "usermenu/";

//OBTENER MENUS PARA LOS USUARIOS ???
export const GET_PRIVATE_NAVBAR = "menu/";

//VER TODOS LOS CUMPLEAÑOS
export const GET_BIRTHDAY = "birthdays";

//BUSCO CLIENTES Y REFERENCIAS
export const GET_NEW_OC = "clienteyrefrenciaOC";

//INGRESAR LA OC
export const POST_OC = "ingresarOC";

//EDITAR UNA OC
export const PUT_OC = "editarOC/";

//BUSCO OC INGRESADAS
export const GET_ALL_OC = "buscarOC";

//VER LAS ZONAS DE CLIENTES
export const GET_ZONA = "zona";

//INGRESAR CLIENTES POTENCIALES
export const POST_NEW_PC = "nuevoCP";

//VER LOS CLIENTES Y CLIENTES POTENCIALES ESPECIFICAMENTE DE UN COMERCIAL
export const GET_ALL_CLIENTS = "clientes/";

//EDITAR CLIENTES Y CLIENTES POTENCIALES
export const PUT_CLIENTS = "editarCliente/";

//INGRESAR NUEVA OT PARA CLIENTES, CLIENTES POTENCIALES Y AJUSTES
export const GET_CLIENTS_BY_SELLER = "nuevaOT/";

//VER LAS NORMAS DE UN ID
export const GET_NORMATIVE = "normative";

//VER LOS TIPOS DE DESARROLLO
export const GET_PORDUCT_TYPE = "producttype";

//INGRESAR NUEVA OT PARA CLIENTES, CLIENTES POTENCIALES Y AJUSTES
export const POST_NEW_WO = "nuevaOT";

//ACTUALIZO UNA OT
export const PUT_UPDATE_WO = "actualizarOT/";

//BUSCO TODOS LOS DESSAROLLOS TERMINADOS PARA SOLICITAR AJUSTE
export const GET_AJUST_WO = "ajustarOT/";

//CONSULTO OT TERMINADAS PARA SOLO MUESTRA, REPETIR MUESTRA
export const GET_SM_RM_R_OT = 'sm_rm_rOT/';

//SOLICITUD DE REFORMULACON
export const GET_REFORMULATION = 'reformulacionOT';

//CONSULTAR ESTADO DE TODAS LAS OT
export const GET_CONSULT_WO = 'estadoOT/';

//CONSULTO OT PARA EDITAR
export const GET_EDIT_WO = 'editarOT/';

//VER TODOS LOS ID
export const GET_WATCH_ID = 'verID';

//VER LAS NORMAS QUE APLICAN PARA CREAR UN ID
export const GET_ID_NORMATIVE = 'crearnormative';

//VER TIPO QUE APLICAN PARA CREAR UN ID
export const GET_ID_TYPE = 'tipoID';

//VER UN ID ESPECIFICO
export const GET_ID_INFO = 'verID/';

//INGRESAR NUEVO ID
export const POST_CREATE_ID = 'crearID';

//ACTUALIZO UN INFO DE UN ID
export const PUT_UPDATE_ID = 'actualizarID/';

//VER LOS DESARROLLOS QUE NO SE HAN EMPEZADO
export const GET_DEVELOPMENT_OW = 'verOT';

//VER FORMULA COMPLETA Y SU CLIENTE
export const GET_FORMULA_CUSTOMER = 'formulaycliente/';


export const POST_PRODUCT_DEVELOPMENT = 'nuevoPD';

//VER TODAS LAS RESINAS BASE
export const GET_RESINS = 'resinasbase';

//VER LOS TIEMPO DE LIMPIEZA
export const GET_CLEANING_TIMES = 'verTL/';

//INGRESAR TIEMPOS DE INTENTO DE DESARROLLO
export const POST_ATTEMPT_TIME = 'ingresarTiempoIntento';

//INGRESAR NUEVO INTENTO DE DESARROLLO
export const POST_ATTEMPT = 'ingresarIntento';

//EDITAR TABLA productdevelopment CON UN id_developmentrequest ESPECIFICO
export const PUT_UPDATE_DEVELOPMENT = 'actualizarPD/';

//INGRESAR TIEMPO DE LIMPIEZA DE LA EXT - INY
export const POST_CLEANING_TIME = 'nuevoTL';

//VER MAX DE TODOS LOS INTENTOS DE UN DLLO ESPECIFICO
export const GET_MAX_ATTEMPTS_PD = 'maxIntentos/';

//VER UN INTENTO DE UN DLLO CON UN INTENTO Y PAUSA ESPECIFICO
export const GET_ATTEMPT_PD = 'intentoPausado/';

//COLOCAR LA NOTA DE PAUSA DE UN INTENTO
export const PUT_ATTEMPT_NOTE = 'notaIntento/';

//VER LOS DESARROLLOS PAUSADOS
export const GET_DEVELOPMENT_OW_PAUSED = 'verOTPausada';

//VER LA ULTIMA FORMUALA PAUSADA
export const GET_FORMULA_ATTEMPT_PAUSED = 'formulaPaused/';

//VER TODOS LOS DATOS ESPECIFICOS DE LA TABLA productdevelopment 
export const GET_PD = 'verPD/';

//OBTENER PUNTO DE PARTIDA 
export const GET_RECORD = 'puntopartida/';

//CREAR NUEVO PRODUCTO
export const POST_NEW_PRODUCT = 'newProduct';

//CREAR NUEVO RELACION PRODUCTO Y MATERIALES
export const POST_NEW_PROMAT = 'newProdMat';

//VER ULTIMO AVANCE GUARDADO DE UN INTENTO ESPECIFICO PAUSADO 
export const GET_FORMULA_ATTEMPT = 'formulaIntento/';

//VER TODOS CLIENTES CREADOS
export const GET_ALL_CLIENTS_CREATED = 'todosClientes';