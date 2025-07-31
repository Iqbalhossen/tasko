"use client";
import dateFormat from "dateformat";
import {
  BookCheck,
  BrickWall,
  CalendarDays,
  ChevronDown,
  ClipboardPlus,
  Clock12,
  Dot,
  LoaderPinwheel,
  Trash2,
} from "lucide-react";
import Link from "next/link";

export default function SingleItem({ data, handleDelete }) {
  return (
    <>
      <div className="col">
        <div className="card h-100">
          <div className="card-body">
            <div className="user-task-list-area">
              <div className="d-flex">
                <div className="user-task-list-svg">
                  <BrickWall />
                </div>
                <div className="user-task-list">
                  <div className="user-task-list-title d-flex align-items-center justify-content-between">
                    <Link href={`task-details/${data?._id}`}>{data?.name}</Link>
                    <Trash2 onClick={() => handleDelete(data?._id)} />
                  </div>
                  <p>{data?.dis}</p>
                </div>
              </div>
            </div>
            <div className="user-task-list-footer-area d-flex align-items-center justify-content-between">
              <div className="date d-flex align-items-center">
                <CalendarDays />
                <span>
                  {dateFormat(data?.createdAt, "dddd, mmmm dd - yyyy")}
                </span>
                {/* <span>Friday, April 19 - 2024</span> */}
              </div>
              <div
                className={`status ${data?.status === 1 && "pending"} ${
                  data?.status === 2 && "inprogress"
                } ${data?.status === 4 && "done"} ${data?.status === 3 && "Collaborativetask"} d-flex align-items-center`}
              >

                <Dot />
                {data?.status === 1 && <span>Pending</span>}
                {data?.status === 2 && <span>InProgress</span>}
                {data?.status === 3 && <span>Collaborative Task</span>}
                {data?.status === 4 && <span>Done</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
