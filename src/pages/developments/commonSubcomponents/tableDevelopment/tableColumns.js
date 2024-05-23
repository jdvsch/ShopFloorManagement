import { DateTime } from "luxon";

export const columns = [
  { header: "Comercial", accessorKey: "firstname" },
  { header: "Cliente", accessorKey: "nombre" },
  {
    header: "Entrega",
    accessorFn: (row) =>
      DateTime.fromISO(row.f_requerida)
        .setLocale("sp")
        .toLocaleString(DateTime.DATE_FULL),
  },
  { header: "Tipo", accessorKey: "initials" },
  { header: "Descripción", accessorKey: "descripcion" },
];

// { header: 'F. requerida', accessorFn: row => DateTime.fromISO(row.fecha_requerida)},
