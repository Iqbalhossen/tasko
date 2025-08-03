"use client";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useLoginUserMutation } from "@/redux-toolkit/services/UserAuthApi/UserAuthApi";
import { useDispatch, useSelector } from "react-redux";
import { SuccessMessage } from "@/component/Common/ToastMessage/ToastMessage";
import { useRouter } from "next/navigation";
import { Spinner } from "react-bootstrap";
import { setCredentials } from "@/redux-toolkit/features/slices/authSlice/authSlice";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [LoginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();

  const { userInfo, token } = useSelector((state) => state.auth);
  const { push } = useRouter();
  useEffect(() => {
    if (userInfo && token) {
      push("/dashboard");
    }
  }, [userInfo]);
  const [errorMessage, setErrorMessage] = useState([]);

  const handleSubmitData = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage([]);
      const formData = new FormData(event.currentTarget);
      const InpuData = Object.fromEntries(formData);
      const results = await LoginUser(InpuData).unwrap();
      if (results?.data) {
        dispatch(
          setCredentials({
            userData: results?.data,
            userToken: results.token,
          })
        );
        push("/dashboard");
        SuccessMessage(results?.message);
      }
    } catch (error) {
      if (!error?.data?.success) {
        setErrorMessage(error?.data?.errors);
      } else {
        setErrorMessage(error?.data);
      }
    }
  };

  return (
    <>
   

      <div className="auth-section">
        <div className="container-fluid custom-row-p-0">
          <div className="row vh-100">
            <div className="col-md-6 d-none d-md-block">
              <div className="custom-relative-w100-h100">
                <Image
                  src="/images/login.png"
                  alt="login image"
                  className="img-fluid"
                  fill
                  sizes="(max-width: 100%)"
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <div className="w-75 py-5">
                <h2 className="text-center">Login</h2>
                <p className="pb-4">
                  WelcomeBack, Please Enter your Details to Log In.
                </p>

                {errorMessage?.message && (
                  <div className="alert alert-danger text-center" role="alert">
                    {errorMessage?.message}
                  </div>
                )}

                <form onSubmit={handleSubmitData}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="m32220@gmail.com"
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
                      <label className="form-label">Password</label>
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
                        {!showPassword ? <EyeOff /> : <Eye />}
                      </span>
                    </div>
                    {errorMessage?.password && (
                      <div className="text-danger">
                        <span> {errorMessage?.password?.msg}</span>
                      </div>
                    )}
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="form-check d-flex justify-content-between align-items-center">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="remember"
                      />
                      <label
                        className="form-check-label remember-label"
                        htmlFor="remember"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-decoration-none forgot-password-link"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="btn-custom-success w-100 mb-4"
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
                      "Log In"
                    )}
                  </button>
                  <div className="auth-hr-area ">
                    <hr /> <p>Or</p> <hr />
                  </div>

                  <div className="d-flex justify-content-center align-items-center mt-4">
                    <p>Don't have an account? </p>
                    <Link href="sign-up" className="sign-up-link">
                      Sign Up
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
