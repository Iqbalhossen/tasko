import "./Loader.css";

export default function CustomLoader() {
  return (
    <>
      <div className="custom-loader-area">
        <div className="spinner-border text-info loader-spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}
