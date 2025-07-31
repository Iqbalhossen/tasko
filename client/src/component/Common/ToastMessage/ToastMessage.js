import Swal from "sweetalert2";

export const DeleteConfirmFun = async () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success me-3",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  const result = await swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: false,
  });

  return result;
};

export const DeleteConfirmResults = (result) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success",
    });
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
      text: "Your data is safe :)",
      icon: "error",
    });
  }
};

export const SuccessMessage = (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  Toast.fire({
    icon: "success",
    title: message,
    customClass: "toast-message",
  });
};

export const UpdateMessageFun = () => {
  return Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`,
  });
};

export const UpdateMessage = (result) => {
  if (result?.isConfirmed) {
    Swal.fire("Saved!", "", "success");
  } else if (result.isDenied) {
    Swal.fire("Changes are not saved", "", "info");
  }
};

export const TaskCompleteMessage = () => {
  Swal.fire({
    title: "",
    text: "Successfully Completed the Task!",
    imageUrl: "/images/image5.png",
    imageWidth: 400,
    imageHeight: 250,
    imageAlt: "Congratulations",
    showCloseButton: true,
    showConfirmButton: true,
    showConfirmButton: false,
    customClass: {
      popup: "p-4 rounded shadow-lg",
      title: "h4 text-primary mb-3",
      text: "text-secondary",
      closeButton: "sweetalert2-custom-close-btn",
    },
  });
};

export const TaskDeleteConfirmFun = () => {
  return Swal.fire({
    title: "Are you Sure!!",
    imageUrl: "/images/svg5.svg",
    imageWidth: 300,
    imageHeight: 200,
    imageAlt: "Confirmation Image",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    allowOutsideClick: false,
    allowEscapeKey: false,
    customClass: {
      popup: "rounded-3xl p-4",
      title: "fw-bold fs-4 text-dark mb-3",
      confirmButton:
        "swal2-confirm  me-2 swal2-custom-btn1 swal2-custom-btn-color1",
      cancelButton: "swal2-cancel swal2-custom-btn1 swal2-custom-btn-color2",
    },
    buttonsStyling: false,
  });
};

export const TaskDeleteConfirmResults = (result) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success",
    });
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
      text: "Your data is safe :)",
      icon: "error",
    });
  }
};
