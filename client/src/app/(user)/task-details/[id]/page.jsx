"use client";
import {
  DeleteConfirmResults,
  TaskCompleteMessage,
  TaskDeleteConfirmFun,
} from "@/component/Common/ToastMessage/ToastMessage";
import Header from "@/component/Header/Header";
import {
  useDeleteTaskMutation,
  useGetSingleTaskQuery,
  useUpdateTaskMutation,
} from "@/redux-toolkit/services/TaskApi/TaskApi";
import {
  BrickWall,
  CalendarDays,
  ChevronDown,
  Dot,
  PenLine,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import dateFormat from "dateformat";
import CustomLoader from "@/component/Loader/Loader";
const AllTask = [
  { task_status_id: 5, task_status: "All Task" },
  { task_status_id: 2, task_status: "Ongoing" },
  { task_status_id: 1, task_status: "Pending" },
  { task_status_id: 3, task_status: "Collaborative Task" },
  { task_status_id: 4, task_status: "Done" },
];
export default function TaskDetails({ params }) {
  const { id } = use(params);

  const {
    data: SingleTaskData,
    error,
    isLoading,
    isFetching,
  } = useGetSingleTaskQuery(id);
  const [isAddTaskDropdownVisible, setIsAddTaskDropdownVisible] =
    useState(false);

  const [selectedAddTask, setSelectedAddTask] = useState(null);

  const dropdownAddTaskRef = useRef(null);

  useEffect(() => {
    if (SingleTaskData?.data) {
      const updateSelect = {
        task_status_id: SingleTaskData?.data?.status,
        task_status: SingleTaskData?.data?.task_status,
      };
      setSelectedAddTask(updateSelect);
    }
  }, [isFetching]);

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

  const { push } = useRouter();
  const router = useRouter();
  const [deleteTask, { isLoading: DeleteisLoading }] = useDeleteTaskMutation();

  const handleDelete = async () => {
    const DeleteConfirm = await TaskDeleteConfirmFun();
    if (DeleteConfirm?.isConfirmed) {
      const deleteResult = await deleteTask(SingleTaskData?.data?._id).unwrap();
      if (deleteResult?.success) {
        push("/dashboard");
      }
    }
    DeleteConfirmResults(DeleteConfirm);
  };

  const [editBtn, setEditBtn] = useState(false);

  const [
    updateTask,
    {
      isLoading: updateTaskLoading,
      isError,
      error: updateTaskError,
      isSuccess,
    },
  ] = useUpdateTaskMutation();

  const handleSubmitData = async (event) => {
    event.preventDefault();
    try {
      const results = await updateTask({
        id: id,
        data: selectedAddTask,
      }).unwrap();
      if (results?.success) {
        TaskCompleteMessage();
      }
    } catch (error) {
      //  console.log(error)
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="loader-area">
          <div
            className="spinner-border text-info loader-spinner"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="task-section">
        <div className="user-dashboard user-without-dashboard">
          <div className="container">
            <Header />
          </div>
          <div className="user-dashboard-bg-image">
            <img
              src="/images/Roadmap-Design.png"
              alt=""
              className="user-dashboard-Roadmap"
            />
          </div>

          <div className="user-dashboard-card-area ">
            <div className="user-dashboard-card">
              <div className="container">
                <div className="user-dashboard-card-header">
                  <div className="row">
                    <div className="col-4">
                      <h5> Task Details</h5>
                    </div>
                    <div className="col-8 text-end">
                      <div className="d-flex align-items-center justify-content-end edit-back-btn-area">
                        <button
                          className="edit-task"
                          onClick={() => setEditBtn(true)}
                        >
                          <PenLine /> Edit Task
                        </button>
                        <button
                          className="back-btn"
                          onClick={() => router.back()}
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="user-task-details-area position-relative">
                  {isFetching && (
                    <>
                      <CustomLoader />
                    </>
                  )}

                  <div className="d-flex">
                    <div className="left-icon">
                      <BrickWall />
                    </div>
                    <div className="user-detail">
                      <div className="user-details-content">
                        <h3>{SingleTaskData?.data?.name}</h3>
                        <p>{SingleTaskData?.data?.dis}</p>
                      </div>

                      <div className="date-status">
                        <div className="date">
                          <h5>End Date</h5>
                          <p>
                            <CalendarDays />{" "}
                            {dateFormat(
                              SingleTaskData?.data?.createdAt,
                              "dddd, mmmm dd - yyyy"
                            )}
                            {/* Friday, April 19 - 2024 */}
                          </p>
                        </div>
                        <div
                          className={`status ${
                            SingleTaskData?.data?.status === 1 && "pending"
                          } ${
                            SingleTaskData?.data?.status === 2 && "inprogress"
                          } ${SingleTaskData?.data?.status === 4 && "done"} ${
                            SingleTaskData?.data?.status === 3 &&
                            "Collaborativetask"
                          } d-flex align-items-center`}
                        >
                          <Dot />
                          {SingleTaskData?.data?.status === 1 && (
                            <span>Pending</span>
                          )}
                          {SingleTaskData?.data?.status === 2 && (
                            <span>InProgress</span>
                          )}
                          {SingleTaskData?.data?.status === 3 && (
                            <span>Collaborative Task</span>
                          )}
                          {SingleTaskData?.data?.status === 4 && (
                            <span>Done</span>
                          )}
                        </div>

                        {/* <div className="status pending">
                          <Dot />
                          <h4>Pending</h4>
                        </div> */}
                      </div>

                      <div className="user-task-footer-area">
                        <form onSubmit={handleSubmitData}>
                          <div className="row">
                            <div className="col-sm-12 col-4 ">
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
                                  style={{ width: "300px" }}
                                >
                                  <div
                                    className="user-dropdown-header"
                                    onClick={() =>
                                      setIsAddTaskDropdownVisible(
                                        (prev) => !prev
                                      )
                                    }
                                  >
                                    <span>
                                      {selectedAddTask?.task_status ||
                                        "All Task"}
                                    </span>
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
                                      {AllTask.map((item, index) => (
                                        <label
                                          key={index}
                                          className={`user-dropdown-item ${
                                            selectedAddTask?.task_status ===
                                            item?.task_status
                                              ? "selected"
                                              : ""
                                          }`}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={
                                              selectedAddTask?.task_status ===
                                              item?.task_status
                                            }
                                            onChange={() =>
                                              selectAddTask({
                                                task_id: item?.task_status_id,
                                                task_status: item?.task_status,
                                              })
                                            }
                                          />
                                          {item?.task_status}
                                        </label>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-12 col-8 ">
                              <div className="user-task-footer-btn">
                                {editBtn && (
                                  <>
                                    <p
                                      className="add-task-btn delete-task"
                                      onClick={handleDelete}
                                    >
                                      Delete task
                                    </p>
                                    <button
                                      className="add-task-btn"
                                      disabled={updateTaskLoading}
                                    >
                                      Submit
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
