export default function Loading() {
    return (
        <div className="position-fixed top-50 start-50 translate-middle">
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-grow text-primary" role="status" style={{width: "4rem", height:"4rem"}}>
              
            </div>
          </div>
        </div>
      );
}