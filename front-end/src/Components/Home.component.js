import { Link } from "react-router-dom";

export default function Home(props) {
  const data = props.data;

  const LogOut = () => {
    localStorage.removeItem("token");
    console.log("log out successfully");
    window.location.reload();
  };

  return (
    <>
      <header id="header" class="fixed-top">
        <div class="container d-flex align-items-center justify-content-between">
          <h1 class="logo">
            <Link to={"/news"}>Check our news</Link>
          </h1>
          {!data || data.length <= 0 ? (
            <nav id="navbar" class="navbar">
              <ul>
                <li>
                  <Link class="nav-link scrollto active" to={"/"}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link class="getstarted scrollto" to={"/login"}>
                    Login/Register
                  </Link>
                </li>
              </ul>
              <i class="bi bi-list mobile-nav-toggle"></i>
            </nav>
          ) : (
            <nav id="navbar" class="navbar">
              <ul>
                <li>
                  <Link class="nav-link scrollto active" to={"/news/create"}>
                    Create
                  </Link>
                </li>
                {data && data.length > 0
                  ? data.map((category) => (
                      <li className="dropdown" key={category.id}>
                        <Link to={`/category/${category.name}`}>
                          <span>{category.name}</span>{" "}
                          <i class="bi bi-chevron-down"></i>
                        </Link>
                        <ul>
                          {category.children.map((child) => (
                            <li key={child.id}>
                              <Link to={`/category/${child.name}`}>
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))
                  : ""}
                <li>
                  <Link class="getstarted scrollto" onClick={LogOut}>
                    Log Out
                  </Link>
                </li>
              </ul>
              <i class="bi bi-list mobile-nav-toggle"></i>
            </nav>
          )}
        </div>
      </header>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div class="jumbotron text-center">
        <h1>Welcome to News-App</h1>
        <p>Check our news</p>
        <Link to={"/news"} className="btn btn-primary">
          Let's See all of our news
        </Link>
      </div>
    </>
  );
}
