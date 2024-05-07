import { DateTime } from "luxon";

export const columns = [
  { header: "OT", accessorKey: "id_developmentrequest" },
  { header: "Cliente", accessorKey: "nombre" },
  { header: "Descripción", accessorKey: "descripcion" },
  { header: "Fecha requerida", 
    accessorFn: (row) =>
      DateTime.fromISO(row.f_requerida)
        .setLocale("sp")
        .toLocaleString(DateTime.DATE_FULL),
   }
];
