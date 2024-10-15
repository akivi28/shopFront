import siteLogo from '../../assets/siteLogo.png';

function Navigation() {
  return (
      <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
              <a className="navbar-brand p-0 ms-5" href="/"><img src={siteLogo} width="80px" alt="" /></a>
              <form className="d-flex w-75">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              </form>
              <a class="btn btn-outline-light btn-lg me-5" href='/regLog'>
                  <i className="bi bi-box-arrow-in-right" style={{ fontSize: '1.5rem' }}></i>
                </a>
          </div>
      </nav>
  );
}

export default Navigation;