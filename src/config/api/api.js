// local test http://localhost:9000/api/login;
// server use http://192.168.1.12:9000/api/login;

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:9010/api/",
});


export const POST_HISTORY = "historyIntra";

export const POST_LOGIN = "login";

export const GET_USERMENU = "usermenu/";

export const GET_PRIVATE_NAVBAR = "menu/";

export const GET_BIRTHDAY = "birthdays";

export const GET_NEW_OC = "clienteyrefrenciaOC";

export const POST_OC = "ingresarOC";

export const PUT_OC = "editarOC/";

export const GET_ALL_OC = "buscarOC";

export const GET_ZONA = "zona";

export const POST_NEW_PC = "nuevoCP";

export const GET_ALL_CLIENTS = "clientes/";

export const PUT_CLIENTS = "editarCliente/";

export const GET_CLIENTS_BY_SELLER = "nuevaOT/";

export const GET_NORMATIVE = "normative";

export const GET_PORDUCT_TYPE = "producttype";

export const POST_NEW_WO = "nuevaOT";

export const PUT_UPDATE_WO = "actualizarOT/";

export const GET_AJUST_WO = "ajustarOT/";

export const GET_SM_RM_R_OT = 'sm_rm_rOT/';

export const GET_REFORMULATION = 'reformulacionOT';

export const GET_CONSULT_WO = 'estadoOT/';

export const GET_EDIT_WO = 'editarOT/';

export const GET_WATCH_ID = 'verID';

export const GET_ID_NORMATIVE = 'crearnormative';

export const GET_ID_TYPE = 'tipoID';

export const GET_ID_INFO = 'verID/';

export const POST_CREATE_ID = 'crearID';

export const PUT_UPDATE_ID = 'actualizarID/';

export const GET_DEVELOPMENT_OW = 'verOT';

export const GET_FORMULA_CUSTOMER = 'formulaycliente/';

export const POST_PRODUCT_DEVELOPMENT = 'nuevoPD';

export const GET_RESINS = 'resinasbase';

export const GET_CLEANING_TIMES = 'verTL/';

export const POST_ATTEMPT_TIME = 'ingresarTiempoIntento';

export const POST_ATTEMPT = 'ingresarIntento';

export const PUT_UPDATE_DEVELOPMENT = 'actualizarPD/';

