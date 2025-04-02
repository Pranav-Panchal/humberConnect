export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 mb-4">
          <div className="col mb-3">
            <h5 className="text-uppercase fw-bold mb-3">HConnect</h5>
            <p className="text-secondary small">
              Empowering students through seamless campus events at Humber.
            </p>
          </div>

          <div className="col mb-3">
            <h6 className="text-uppercase fw-semibold mb-3">Services</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none small hover-underline">Development</a></li>
              <li><a href="#" className="text-white text-decoration-none small hover-underline">Hosting</a></li>
            </ul>
          </div>

          <div className="col mb-3">
            <h6 className="text-uppercase fw-semibold mb-3">About</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none small hover-underline">Team</a></li>
              <li><a href="#" className="text-white text-decoration-none small hover-underline">Legacy</a></li>
            </ul>
          </div>

          <div className="col mb-3">
            <h6 className="text-uppercase fw-semibold mb-3">Careers</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none small hover-underline">Benefits</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-light" />
        <div className="d-flex justify-content-between small text-secondary mt-3">
          <p className="mb-0">© 2025 HumberConnect</p>
          <p className="mb-0">Made with 💙 by you</p>
        </div>
      </div>
    </footer>
  );
}
