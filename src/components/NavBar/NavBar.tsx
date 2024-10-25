import styles from "./NavBar.module.css";
interface Props {
  toggleFormButton: () => void;
  loggedIn: boolean;
  setLoggedIn: (status: boolean) => void;
  seeLogin: boolean;
  setNav: (nav: string) => void;
}

function NavBar({
  toggleFormButton,
  loggedIn,
  setLoggedIn,
  seeLogin,
  setNav,
}: Props) {
  return (
    <div>
      <nav
        className={"navbar navbar-expand-lg navbar-dark " + styles.navbarBrand}
      >
        <span className={"navbar-brand mb-0 h1 " + styles.navbarBrand}>
          Instapic [ ]
        </span>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {loggedIn && (
              <li>
                <a
                  className={"nav-link " + styles.navLink}
                  onClick={() => setNav("Home")}
                >
                  <span className="sr-only">Home</span>
                </a>
              </li>
            )}
            {loggedIn && (
              <li>
                <a
                  className={"nav-link " + styles.navLink}
                  onClick={() => setNav("Posts")}
                >
                  <span className="sr-only">Posts</span>
                </a>
              </li>
            )}
            <li className="nav-item active">
              {!loggedIn && (
                <a
                  className={"nav-link " + styles.navLink}
                  onClick={() => toggleFormButton()}
                >
                  {!seeLogin && <span className="sr-only">Login</span>}
                  {seeLogin && <span className="sr-only">Signup</span>}
                </a>
              )}
              {loggedIn && (
                <a
                  className={"nav-link " + styles.navLink}
                  onClick={() => {
                    setLoggedIn(false);
                    setNav("Home");
                  }}
                >
                  Logout <span className="sr-only"></span>
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
