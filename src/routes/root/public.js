import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "logo.svg";

const { REACT_APP_VERSION } = process.env;

function Public() {
  return (
    <section className="r-public | wrapper">
      <div className="r-public-inner | stack border">
        <Logo className="logo" />
        <div className="">
          <p>
            Welcome to{" "}
            <strong>
              <i>Federike</i>
            </strong>{" "}
            please{" "}
            <strong>
              <Link to="/settings/instances/add">Login</Link>
            </strong>{" "}
            to start.
          </p>
        </div>
        <footer>
          <span>V.{REACT_APP_VERSION}</span>
        </footer>
      </div>
    </section>
  );
}

export default Public;
