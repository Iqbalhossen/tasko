"use client";
import AddTask from "@/component/Task/AddTask/AddTask";
import TaskFilter from "@/component/Task/TaskFilter/TaskFilter";
import {
  useDeleteTaskMutation,
  useGetTaskQuery,
} from "@/redux-toolkit/services/TaskApi/TaskApi";
import { ClipboardPlus } from "lucide-react";

import { useState } from "react";
import { useSelector } from "react-redux";
import SingleItem from "./SingleItem";
import {
  DeleteConfirmResults,
  TaskDeleteConfirmFun,
} from "@/component/Common/ToastMessage/ToastMessage";

import DashboardHeader from "@/component/Header/DashboardHeader";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CustomPagination from "@/component/CustomPagination/CustomPagination";

export default function Dashboard() {
  const { userInfo, token } = useSelector((state) => state.auth);
  const [modalShow, setModalShow] = useState(false);

  const searchQueryParams = useSearchParams();
  const page = searchQueryParams.get("page");
  const name = searchQueryParams.get("name");
  const status = searchQueryParams.get("status");


  const {
    data: TaskData,
    error,
    isLoading,
    isFetching,
  } = useGetTaskQuery({ page, name, status, user_id: userInfo?.id });

  const [deleteTask, { isLoading: DeleteisLoading }] = useDeleteTaskMutation();

  const handleDelete = async (id) => {
    const DeleteConfirm = await TaskDeleteConfirmFun();
    if (DeleteConfirm?.isConfirmed) {
      await deleteTask(id).unwrap();
    }
    DeleteConfirmResults(DeleteConfirm);
  };

  const pathname = usePathname();
  const router = useRouter();

  const handleFilter = (data) => {
    const query = new URLSearchParams();

    if (page) {
      query.set("page", page);
    }
    if (data?.category) {
      query.set("name", data.category);
    }

    if (!data?.category && name) {
      query.set("name", name);
    }
    if (data?.allTask?.task_id) {
      query.set("status", data.allTask.task_id);
    }
    if (!data?.allTask?.task_id && status) {
      query.set("status", status);
    }

    router.push(`${pathname}?${query.toString()}`);

    // console.log("Filter applied:", query.toString());
  };
// console.log(TaskData)
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
        <div className="user-dashboard">
          <div className="container">
            <DashboardHeader />
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
                      <h5>All Task Lists</h5>
                    </div>
                    <div className="col-8 d-flex align-items-center">
                      <TaskFilter handleFilter={handleFilter} />
                      <button
                        className="add-task-btn"
                        onClick={() => setModalShow(true)}
                      >
                        <ClipboardPlus size={18} className="icon" />
                        Add New Task
                      </button>
                    </div>
                  </div>
                </div>

                <div className="user-task-lists">
                  <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                    {TaskData?.data?.length !== 0 ? (
                      TaskData?.data.map((data, index) => {
                        if (data) {
                          return (
                            <SingleItem
                              data={data}
                              index={index}
                              key={data._id}
                              handleDelete={handleDelete}
                            ></SingleItem>
                          );
                        }
                      })
                    ) : (
                      <>
                        <div className="task-not-available">
                          <img src="/images/image6.jpg" alt="" />
                          <h5>
                            No Task is Available yet, Please Add your New Task
                          </h5>
                        </div>
                      </>
                    )}

                  </div>
                    {/* paginateLinks */}
            <CustomPagination data={TaskData}></CustomPagination>
            {/* paginateLinks */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddTask show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
