import { useSelector } from "react-redux";
import { Query, GET_BIRTHDAY } from "../config/api/api";
import { DateTime } from "luxon";

export default function useBirthday() {
  const userSesion = useSelector((state) => state.reducerUserState.userState);

  // obtengo todos los cumpleaños del mes
  const query = Query({ key: ["cumple"], url: GET_BIRTHDAY });

  // verifico si muestro o no el mensaje de cumpleaños
  const birth = () => {
    // verifico si este es la semana del cumpleaños del usuario
    if (
      DateTime.now().weekNumber ===
      DateTime.fromISO(userSesion.birthday).weekNumber
    ) {
      // identifico si es día
      if (DateTime.now().c.day < DateTime.fromISO(userSesion.birthday).c.day) {
        return { showWeekMessagePic: true, showCakePic: false };
      }
      if (DateTime.now().c.day >= DateTime.fromISO(userSesion.birthday).c.day) {
        return { showWeekMessagePic: false, showCakePic: true };
      }
    }
    return { showWeekMessagePic: false, showCakePic: false };
  };

  const { showWeekMessagePic, showCakePic } = birth();

  return { query, showWeekMessagePic, showCakePic };
}
