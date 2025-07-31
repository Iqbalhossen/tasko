"use client";
import { useEffect, useState } from "react";
import { Clock12 } from "lucide-react";
import { useForgotPasswordMutation } from "@/redux-toolkit/services/UserAuthApi/UserAuthApi";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
export default function ForgetPassword() {
  const { userInfo, token } = useSelector((state) => state.auth);
  const { push } = useRouter();

  useEffect(() => {
    if (userInfo && token) {
      push("/dashboard");
    }
  }, [userInfo]);

  const [ForgotPassword, { isLoading }] = useForgotPasswordMutation();

  const [errorMessage, setErrorMessage] = useState([]);

  const [data, setData] = useState([]);

  const handleSubmitData = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage([]);
      setData([]);
      const formData = new FormData(event.currentTarget);
      const InpuData = Object.fromEntries(formData);
      const results = await ForgotPassword(InpuData).unwrap();
      if (results?.success) {
        setData(results);
      }
    } catch (error) {
      if (!error?.data?.success) {
        setErrorMessage(error?.data?.errors);
      }
    }
  };

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
            <div className="auth-section">
              <div className=" d-flex align-items-center justify-content-center ">
                <form className="" onSubmit={handleSubmitData}>
                  <div className="text-center">
                    <Clock12 className="clock12" />
                    <h2 className="mb-3">Forgot your Password</h2>
                    <p className="text-muted pb-4 pt-1">
                      Strong passwords include numbers, letters, and punctuation
                      marks.
                    </p>
                    {data?.message && (
                      <div
                        className="alert alert-success text-center"
                        role="alert"
                      >
                        {data?.message}
                      </div>
                    )}

                    {errorMessage?.message && (
                      <div
                        className="alert alert-danger text-center"
                        role="alert"
                      >
                        {errorMessage?.message}
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

                  <button
                    type="submit"
                    className="btn-custom-success mt-2 mx-auto w-100 d-flex align-items-center justify-content-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="d-flex align-items-center justify-content-center">
                          <Spinner
                            animation="border"
                            variant="light"
                            className="me-1"
                            size="sm"
                          />
                          Loading...
                        </div>
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
