// DATOS DE CADA USUARIO LOGEADO
export const menu = [
  {
    menu: "Pedidos",
    submenu: [
      { tittle: "Agregar pedidos", to: "nuevaOC" },
      { tittle: "Editar pedido", to: "editarOC" },
    ],
    viewControl: "tableView",
  },
  {
    menu: "Clientes",
    submenu: [
      { tittle: "Crear cliente potencial", to: "nuevoCP" },
      { tittle: "Editar cliente potencial", to: "editarCP" },
      { tittle: "hr", to: "/" },
      { tittle: "Editar cliente", to: "editarCliente" },
    ],
    viewControl: "tableView",
  },
  {
    menu: "Orden de trabajo",
    submenu: [
      { tittle: "Nueva OT", to: "nuevaOT" },
      { tittle: "Ajustar OT", to: "ajustarOT" },
      { tittle: "Optimizar OT", to: "optimizarOT" },
      { tittle: "hr", to: "/" },
      { tittle: "Solo muestra", to: "soloMuestra" },
      { tittle: "Repetir muestra", to: "repetirMuestra" },
      { tittle: "hr", to: "/" },
      { tittle: "Reformulación", to: "reformulacion" },
      { tittle: "hr", to: "/" },
      { tittle: "Consultar OT", to: "consultarOT" },
      { tittle: "Editar OT", to: "editarOT" },
    ],
    viewControl: "tableView",
  },
  {
    menu: "Materia prima",
    submenu: [
      { tittle: "Ver ID", to: "verID" },
      { tittle: "hr", to: "/" },
      { tittle: "Crear ID", to: "crearID" },
      { tittle: "Editar ID", to: "editarID" },
      { tittle: "hr", to: "/" },
      { tittle: "Informe 1", to: "" },
      { tittle: "Informe 2", to: "" },
    ],
    viewControl: "tableView",
  },
  {
    menu: "Desarrollos",
    submenu: [
      { tittle: "Ver ID", to: "verID" },
      { tittle: "Crear formulación", to: "crearFormulacion" },
      { tittle: "Retomar formulación", to: "retomarFormulación" },
      { tittle: "hr", to: "/" },
      { tittle: "Crear producto", to: "crearProducto" },
      { tittle: "hr", to: "/" },
      { tittle: "Crear producto intermedio", to: "crearPI" },
    ],
    viewControl: "tableView",
  },
  {
    menu: "Muestras",
    submenu: [
      { tittle: "Crear muestra", to: "crearMuestra" },
      { tittle: "hr", to: "/" },
      { tittle: "retomar muestra", to: "retomarMuestra" },
    ],
    viewControl: "tableView",
  },
  {
    menu: "Laboratorio",
    submenu: [
      { tittle: "Cancelar formulación", to: "cancelarFormulacion" },
      { tittle: "hr", to: "/" },
      { tittle: "Permitir ediciones de OT", to: "permitirEOT" },
      { tittle: "Editar producto", to: "editarProducto" },
      { tittle: "Editar producto intermedio", to: "editarPI" },
      { tittle: "hr", to: "/" },
      { tittle: "Estado de solicitudes", to: "estadoSolicitud" },
      { tittle: "hr", to: "/" },
      { tittle: "Informe 1", to: "" },
      { tittle: "Informe 2", to: "" },
    ],
    viewControl: "tableView",
  },
  {
    menu: "Planta de producción",
    submenu: [
      { tittle: "Liberaar OC", to: "liberarOP" },
      { tittle: "Ver OC liberadas", to: "verOP" },
      { tittle: "hr", to: "/" },
      { tittle: "Liberar otros", to: "liberarOtros" },
      { tittle: "Ver otros liberados", to: "verOtros" },
    ],
    viewControl: "tableView",
  },
  {
    menu: "Cofiguración",
    submenu: [
      { tittle: "Cambio de clave", to: "cambiarClave" },
      { tittle: "hr", to: "/" },
      { tittle: "Crear usuario", to: "crearUsurio" },
      { tittle: "Editar usuario", to: "editarUsuario" },
    ],
    viewControl: "tableView",
  },
];
