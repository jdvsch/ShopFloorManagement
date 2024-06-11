import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setResetUserState } from "../../../redux/slices/userStateSlice";
import { setResetPageToRender, setResetTotalPageToRender } from '../../../redux/slices/pageToRenderSlice';
import { setResetFeedback } from "../../../redux/slices/feedbackSlice";
import { setUserState } from "../../../redux/slices/userStateSlice";
import { GET_USERMENU } from "../../../config/api/api";
import useAskQuery from "../../../hooks/useAskQuery";

import { menu } from "../../../fakeAPI/login";

export default function PrivateNavbar() {
  const user = useSelector((state) => state.reducerUserState.userState.id_user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const menuUserData = useAskQuery({queryKey: ['menu'], url: GET_USERMENU + user})

  React.useEffect(() => {
    if (menuUserData.data) {
      dispatch(setUserState({menu: menuUserData.data[0].menu, listPageToRender: menuUserData.data[0].listPageToRender}))
      // console.log(JSON.parse(menuUserData.data[0].listPageToRender));
    }
  }, [])

  const goToPage = (data) => {
    dispatch(setResetTotalPageToRender())
    dispatch(setResetFeedback())
    navigate(data);
  }

  const handleLogout = () => {
    dispatch(setResetUserState());
    dispatch(setResetFeedback())
    dispatch(setResetTotalPageToRender());
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div role="button" className="nav-link active" onClick={() => goToPage("dashboard")}>
          <img src="/img/logo.png" width="25" alt="anquimico SAS"></img>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {menu.map((data, index) => (
              <li key={index} className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {data.menu}
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {data.submenu.map((sdata, index) => (
                    <li key={index}>
                      {sdata.tittle === "hr" ? (
                        <hr className={"dropdown-divider"} />
                      ) : (
                        <div role="button" className="dropdown-item" onClick={() => goToPage(sdata.to)}>{sdata.tittle}</div>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <form className="d-flex">
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={() => handleLogout()}
            >
              LogOut
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
