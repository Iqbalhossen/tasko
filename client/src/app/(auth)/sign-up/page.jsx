"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterUserMutation } from "@/redux-toolkit/services/UserAuthApi/UserAuthApi";
import { SuccessMessage } from "@/component/Common/ToastMessage/ToastMessage";
import { useRouter } from "next/navigation";
import { Spinner } from "react-bootstrap";
import { setCredentials } from "@/redux-toolkit/features/slices/authSlice/authSlice";
function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerUser, { isLoading }] = useRegisterUserMutation();
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
      const results = await registerUser(InpuData).unwrap();
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
      }
    }
  };

  return (
    <>
      <div className="auth-section">
        <div className="container-fluid custom-row-p-0">
          <div className="row vh-100">
            <div className="col-md-6 ">
              <div className="custom-relative-w100-h100">
                <Image
                  src="/images/signup.png"
                  alt="Signup image"
                  className="img-fluid"
                  fill
                  sizes="(max-width: 100%)"
                />
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center ">
              <form className="w-75 py-5" onSubmit={handleSubmitData}>
                <h2 className="text-center">Sign Up</h2>
                <p className="pb-4">
                  To Create Account, Please Fill in the From Below.
                </p>

                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                    name="full_name"
                  />
                  {errorMessage?.full_name && (
                    <div className="text-danger">
                      <span> {errorMessage?.full_name?.msg}</span>
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
                      {!showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                  </div>
                  {errorMessage?.password && (
                    <div className="text-danger">
                      <span> {errorMessage?.password?.msg}</span>
                    </div>
                  )}
                </div>

                <div className="mb-3 position-relative">
                  <div className="position-relative">
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
                  className="btn-custom-success w-100 mb-4"
                  disabled={isLoading}
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
                    "Sign Up"
                  )}
                </button>

                <div className="auth-hr-area ">
                  <hr /> <p>Or</p> <hr />
                </div>

                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span>Already have an account? </span>
                  <Link href="/" className="sign-up-link">
                    Log In
                  </Link>
                </div>
                <div className="text-center mt-3"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
