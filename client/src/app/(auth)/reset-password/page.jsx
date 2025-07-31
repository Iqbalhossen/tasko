"use client";
import { useEffect, useState } from "react";
import { Clock12, Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useForgotPasswordTokenVerifyQuery,
  useResetPasswordMutation,
} from "@/redux-toolkit/services/UserAuthApi/UserAuthApi";
import { SuccessMessage } from "@/component/Common/ToastMessage/ToastMessage";
import { useSelector } from "react-redux";

import { Suspense } from 'react';


export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<></>}>
      <ResetPasswordContent />
    </Suspense>
  );
}


 function ResetPasswordContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { userInfo, token: userToken } = useSelector((state) => state.auth);
  const { push } = useRouter();

  useEffect(() => {
    if (userInfo && userToken) {
      push("/dashboard");
    }
  }, [userInfo]);

  const searchQueryParams = useSearchParams();
  const token = searchQueryParams.get("token");

  const { data, error, isLoading, isFetching } =
    useForgotPasswordTokenVerifyQuery(token);

  const [ResetPassword, { isLoading: btnIsLoading }] =
    useResetPasswordMutation();

  const [errorMessage, setErrorMessage] = useState([]);

  const [passwordUpdateData, setPasswordUpdateData] = useState([]);

  const handleSubmitData = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage([]);
      const formData = new FormData(event.currentTarget);
      const InpuData = Object.fromEntries(formData);
      const results = await ResetPassword({ ...InpuData, token }).unwrap();
      if (results?.success) {
        // setPasswordUpdateData(results);
        push("/");
        SuccessMessage(results?.message);
      }
    } catch (error) {
      if (!error?.data?.success) {
        setErrorMessage(error?.data?.errors);
      }
    }
  };

  if (isLoading) {
    return;
  }
  return (
    <>
      <div className="custom-404 ">
        <div className="custom-404-bg-image">
          <img
            src="/images/Roadmap-Design.png"
            alt=""
            className="custom-404-Roadmap"
          />
        </div>
        <div className="custom-404-card-area">
          <div className="custom-404-card ">
            {data?.success && data?.data?.resetPasswordToken ? (
              <div className="auth-section">
                <div className=" d-flex align-items-center justify-content-center ">
                  <form className="" onSubmit={handleSubmitData}>
                    <div className="text-center">
                      <Clock12 className="clock12" />
                      <h2 className="mb-3">Reset your Password</h2>
                      <p className="text-muted pb-4 pt-1">
                        Strong passwords include numbers, letters, and
                        punctuation marks.
                      </p>
                      {errorMessage?.message && (
                        <div
                          className="alert alert-danger text-center"
                          role="alert"
                        >
                          {errorMessage?.message}
                        </div>
                      )}

                      {passwordUpdateData?.message && (
                        <div
                          className="alert alert-success text-center"
                          role="alert"
                        >
                          {passwordUpdateData?.message}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email address"
                        name="email"
                      />
                      {errorMessage?.email && (
                        <div className="text-danger">
                          <span> {errorMessage?.email?.msg}</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-3 ">
                      <div className="position-relative">
                        <label className="form-label">Enter New Password</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="*********"
                          name="password"
                        />
                        <span
                          className="password-eye translate-middle-y pe-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {!showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </span>
                      </div>

                      {errorMessage?.password && (
                        <div className="text-danger">
                          <span> {errorMessage?.password?.msg}</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <div className=" position-relative">
                        <label className="form-label">Confirm Password</label>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="Retype password"
                          name="cpassword"
                        />
                        <span
                          className="password-eye  translate-middle-y pe-3"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {!showConfirmPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </span>
                      </div>

                      {errorMessage?.cpassword && (
                        <div className="text-danger">
                          <span> {errorMessage?.cpassword?.msg}</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn-custom-success mt-2 mx-auto w-100 d-flex align-items-center justify-content-center"
                    >
                      Reset Password
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <>
                <div className="auth-section">
                  <div className=" d-flex align-items-center justify-content-center ">
                    Expired token
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
