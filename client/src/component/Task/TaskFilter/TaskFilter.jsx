"use client";

import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
const categories = ["Arts and Craft", "Nature", "Family", "Sport", "Friends"];

const AllTask = [
  { task_status_id: "all", task_status: "All Task" },
  { task_status_id: 2, task_status: "Ongoing" },
  { task_status_id: 1, task_status: "Pending" },
  { task_status_id: 3, task_status: "Collaborative Task" },
  { task_status_id: 4, task_status: "Done" },
];

import { useEffect, useRef, useState } from "react";

export default function TaskFilter({ handleFilter }) {
  const searchQueryParams = useSearchParams();
  const name = searchQueryParams.get("name");
  const status = searchQueryParams.get("status");

  // Task Category
  const [isTaskCategoryDropdownVisible, setIsTaskCategoryDropdownVisible] =
    useState(false);
  const [selectedTaskCategory, setSelectedTaskCategory] = useState(
    name ? name : null
  );
  const dropdownTaskCategoryRef = useRef(null);

  const selectTaskCategory = (item) => {
    const urlSlug = item.replace(/ /g, "-");
    handleFilter({ category: urlSlug });
    setSelectedTaskCategory(item);
    setIsTaskCategoryDropdownVisible(false);
  };
  // Task Category end

  //    all Task

  const [isAllTaskDropdownVisible, setIsAllTaskDropdownVisible] =
    useState(false);

  const selectedStatus = AllTask.find(
    (task) => task.task_status_id.toString() === status
  );

  const [selectedAllTask, setSelectedAllTask] = useState(
    selectedStatus ? selectedStatus : null
  );
  const dropdownAllTaskRef = useRef(null);

  const selectAllTask = (item) => {
    handleFilter({ allTask: item });
    setSelectedAllTask(item);
    setIsAllTaskDropdownVisible(false);
  };
  // console.log("all: ", selectedAllTask)
  //    all Task end

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownTaskCategoryRef.current &&
        !dropdownTaskCategoryRef.current.contains(event.target)
      ) {
        setIsTaskCategoryDropdownVisible(false);
      }

      if (
        dropdownAllTaskRef.current &&
        !dropdownAllTaskRef.current.contains(event.target)
      ) {
        setIsAllTaskDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div
        className="user-dropdown-container "
        ref={dropdownTaskCategoryRef}
        style={{ width: "350px" }}
      >
        <div
          className="user-dropdown-header"
          onClick={() => setIsTaskCategoryDropdownVisible((prev) => !prev)}
        >
          <span>{selectedTaskCategory || "Select Task Category"}</span>
          <span
            className={`arrow ${isTaskCategoryDropdownVisible ? "rotate" : ""}`}
          >
            <ChevronDown size={18} strokeWidth={2} />
          </span>
        </div>

        {isTaskCategoryDropdownVisible && (
          <div className="user-dropdown-list">
            {categories.map((item) => (
              <label
                key={item}
                className={`user-dropdown-item ${
                  selectedTaskCategory === item ? "selected" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedTaskCategory === item}
                  onChange={() => selectTaskCategory(item)}
                />
                {item}
              </label>
            ))}
          </div>
        )}
      </div>

      <div
        className="user-dropdown-container mx-2"
        ref={dropdownAllTaskRef}
        style={{ width: "250px" }}
      >
        <div
          className="user-dropdown-header"
          onClick={() => setIsAllTaskDropdownVisible((prev) => !prev)}
        >
          <span>{selectedAllTask?.task_status || "All Task"}</span>
          <span className={`arrow ${isAllTaskDropdownVisible ? "rotate" : ""}`}>
            <ChevronDown size={18} strokeWidth={2} />
          </span>
        </div>

        {isAllTaskDropdownVisible && (
          <div className="user-dropdown-list">
            {AllTask.map((item, index) => (
              <label
                key={index}
                className={`user-dropdown-item ${
                  selectedAllTask?.task_status === item?.task_status
                    ? "selected"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedAllTask?.task_status === item?.task_status}
                  onChange={() =>
                    selectAllTask({
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
    </>
  );
}
