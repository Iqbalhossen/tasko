"use client";
import ReactPaginate from "react-paginate";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const CustomPagination = ({ data }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchQueryParams = useSearchParams();
  const name = searchQueryParams.get("name");
  const status = searchQueryParams.get("status");

  const currentPage = searchQueryParams.get("page")
    ? searchQueryParams.get("page")
    : 1;

  const handlePageChange = (event) => {
    const selectedPage = event.selected + 1;
    const query = new URLSearchParams();
    if (selectedPage) {
      query.set("page", selectedPage);
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
  };

  return (
    <>
      <div className="card-footer py-2 custom-pagination">
        <nav className="d-flex justify-content-end">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageChange}
            pageRangeDisplayed={4}
            pageCount={data?.pageCount}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={1}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
            forcePage={currentPage - 1}
          />
        </nav>
      </div>
    </>
  );
};

export default CustomPagination;
