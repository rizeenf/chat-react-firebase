import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { auth } from "../firebase";

const SideNavbar = () => {
  const { userLogin } = useContext(AuthContext);

  return (
    <div className="flex flex-row justify-between items-center bg-creamDarker">
      <span className=" text-xl font-bold p-4 text-text xs:hidden xl:flex ">
        Chat React
      </span>
      <div className="flex flex-row justify-between items-center p-3 gap-2">
        <img
          src={userLogin.photoURL}
          alt="Img Profil"
          className=" w-8 h-8 object-cover rounded-full "
        />
        <span className="text-sm text-text">{userLogin.displayName} </span>
        <button
          onClick={() => signOut(auth)}
          className=" bg-primary text-text text-sm rounded-md p-1 hover:bg-cream  "
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideNavbar;
