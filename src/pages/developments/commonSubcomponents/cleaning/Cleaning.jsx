import Resins from "./commonSubcomponents/Resins";
import Times from "./commonSubcomponents/Times";

export default function Cleaning() {
  return (
    <>
    <div className="container mt-3">
      <div className="row">
        <div className="col-4">
          <h4 className="text-primary fw-bold text-center">
            Datos comunes
          </h4>
          <Resins/>
        </div>
        
        <div className="col-8">
          <Times/>
        </div> 
      </div>
    </div>
    </>
  );
}
