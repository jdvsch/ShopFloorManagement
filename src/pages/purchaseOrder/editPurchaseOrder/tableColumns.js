import { DateTime } from "luxon";

export const columns = [
  { header: "Cliente", accessorKey: "nombre" },
  { header: "Producto", accessorKey: "name" },
  {
    header: "F. requerida",
    accessorFn: (row) =>
      DateTime.fromISO(row.fecha_requerida)
        .setLocale("sp")
        .toLocaleString(DateTime.DATE_FULL),
  },
  { header: "Nota", accessorKey: "nota" },
  { header: "Estado", accessorKey: "statename" },
  { header: "M. requerido", accessorKey: "monto_requerido" },
];

// { header: 'F. requerida', accessorFn: row => DateTime.fromISO(row.fecha_requerida)},
