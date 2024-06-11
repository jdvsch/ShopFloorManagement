import NameProduct from "./commonSubcomponents/NameProduct"
import { useSelector } from "react-redux";

export default function Aproved() {
  const pageControl = useSelector((state) => state.reducerPageToRender.pageToRender);

  return (
    <>
    {pageControl.developmentStatus === 'Aproved' &&
      <NameProduct/>
    }
    </>
  )
}
