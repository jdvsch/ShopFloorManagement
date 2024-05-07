import { useSelector } from "react-redux";
import { DateTime } from "luxon";
import Loader from "../../components/loader/Loader";
import useBirthday from "../../hooks/useBirthday";

export default function Dashboard() {
  const userSesion = useSelector((state) => state.reducerUserState.userState);

  // console.log(DateTime.DATE_MED);

  const needUpdatedPassword =
    DateTime.now().diff(DateTime.fromISO(userSesion.updatedAt), "days").days >=
    60
      ? true
      : false;

  const { query, showWeekMessagePic, showCakePic } = useBirthday();

  return (
    <>
      {(query.isLoading || query.isFetching) && <Loader />}

      {query.data && (
        <div className="row mx-3 my-2">
          <div className="col">
            <p className="text-success fs-5">
              Después de{" "}
              <span className="text-dark fw-bold">
                {userSesion.timeOver} min.
              </span>{" "}
              de inactividad, se cerrará automáticamente tu sesión
            </p>
            {needUpdatedPassword && (
              <p className="fw-bold fs-5">
                Tu clave tiene más de{" "}
                <span className="text-danger fw-bold fs-4">60 días</span> de no
                haber sido cambiada, te invitamos a ir al menú de configuración.
              </p>
            )}

            <div className="mt-3">
              {showWeekMessagePic && (
                <img
                  width="300px"
                  src="./img/WeekMessage.png"
                  alt="Feliz cumpleaños"
                />
              )}
              {showCakePic && (
                <img
                  width="200px"
                  src="./img/birth.jpg"
                  alt="Feliz cumpleaños"
                />
              )}
            </div>

            <p className="fs-5">
              Esta intranet está en construcción, es importante para nosotros si
              nos puede indicar si existe:
            </p>
            <ul>
              <li className="fs-5">errores ortográficos</li>
              <li className="fs-5">
                fallas en su funcionamiento (tratar de indicar claramente que se
                estaba haciendo cuando se produjo la falla)
              </li>
              <li className="fs-5">algo por mejorar</li>
            </ul>

            <div className="text-center">
              <img
                width="50%"
                src="./img/under_construction.jpg"
                alt="under construction"
              />
            </div>
          </div>

          <div
            className="col-3 rounded"
            style={{ background: "rgb(212, 242, 255)" }}
          >
            <p className="text-center fs-4 fw-bold">
              Cumpleaños de {DateTime.now().monthLong}
            </p>

            {query?.data &&
              query.data.map((data) => {
                if (
                  new Date(data.date.substring(0, 10)).getMonth() ===
                  new Date().getMonth()
                ) {
                  return (
                    <p
                      key={data.id_birday}
                      className={
                        new Date().getDate() ===
                        parseInt(data.date.substring(8, 10))
                          ? "bg-warning rounded-end text-white fw-bold fs-5"
                          : "fs-5"
                      }
                    >
                      {data.date.substring(8, 10) + " - " + data.fullname}
                    </p>
                  );
                }
              })}
          </div>
        </div>
      )}
    </>
  );
}
