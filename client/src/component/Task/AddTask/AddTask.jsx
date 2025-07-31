"use client";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { useStoreTaskMutation } from "@/redux-toolkit/services/TaskApi/TaskApi";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
const categories = ["Arts and Craft", "Nature", "Family", "Sport", "Friends"];
export default function AddTask(props) {
  const { userInfo } = useSelector((state) => state.auth);

  const [dis, setDis] = useState("");
  const [isAddTaskDropdownVisible, setIsAddTaskDropdownVisible] =
    useState(false);
  const [selectedAddTask, setSelectedAddTask] = useState(null);
  const dropdownAddTaskRef = useRef(null);

  const selectAddTask = (item) => {
    setSelectedAddTask(item);
    setIsAddTaskDropdownVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownAddTaskRef.current &&
        !dropdownAddTaskRef.current.contains(event.target)
      ) {
        setIsAddTaskDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  const [errorMessage, setErrorMessage] = useState([]);

  const [
    storeTask,
    { isLoading: AddTaskLoading, isError, error: AddTaskError, isSuccess },
  ] = useStoreTaskMutation();

  const handleSubmitData = async (event) => {
    event.preventDefault();

    try {
      setErrorMessage([]);
      const StoreData = { user_id: userInfo?.id, name: selectedAddTask, dis };
      const results = await storeTask(StoreData).unwrap();
      if (results?.success) {
        props.onHide();
        setSelectedAddTask(null);
        setDis(null);
        toast.success(`${results?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      if (error?.data?.errors) {
        setErrorMessage(error?.data?.errors);
      }
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container pb-5 pt-2">
            <form onSubmit={handleSubmitData}>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Task
                </label>
                <div
                  className="user-dropdown-container "
                  ref={dropdownAddTaskRef}
                  style={{ width: "100%" }}
                >
                  <div
                    className="user-dropdown-header"
                    onClick={() => setIsAddTaskDropdownVisible((prev) => !prev)}
                  >
                    <span>{selectedAddTask || "Select Task Category"}</span>
                    <span
                      className={`arrow ${
                        isAddTaskDropdownVisible ? "rotate" : ""
                      }`}
                    >
                      <ChevronDown size={18} strokeWidth={2} />
                    </span>
                  </div>

                  {isAddTaskDropdownVisible && (
                    <div className="user-dropdown-list">
                      {categories.map((item) => (
                        <label
                          key={item}
                          className={`user-dropdown-item ${
                            selectedAddTask === item ? "selected" : ""
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedAddTask === item}
                            onChange={() => selectAddTask(item)}
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                {errorMessage?.name && (
                  <div className="text-danger">
                    <span> {errorMessage?.name?.msg}</span>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  onChange={(e) => setDis(e.target.value)}
                ></textarea>
                {errorMessage?.dis && (
                  <div className="text-danger">
                    <span> {errorMessage?.dis?.msg}</span>
                  </div>
                )}
              </div>

              <button className="add-task-btn">
                {AddTaskLoading ? (
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
                  "Save"
                )}
              </button>
            </form>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
      </Modal>
    </>
  );
}
