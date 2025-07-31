"use client";
import { SuccessMessage } from "@/component/Common/ToastMessage/ToastMessage";
import { logout } from "@/redux-toolkit/features/slices/authSlice/authSlice";
import { useLogoutUserMutation } from "@/redux-toolkit/services/UserAuthApi/UserAuthApi";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function Logout() {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [LogoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      const results = await LogoutUser().unwrap();
      dispatch(logout());
      if (results?.success) {
        push("/");
        SuccessMessage(results?.message);
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <li onClick={handleLogout} className="logout-css">
        <LogOut />
        <button> Logout</button>
      </li>

      {/* <button onClick={handleLogout}> Logout</button> */}
    </>
  );
}
