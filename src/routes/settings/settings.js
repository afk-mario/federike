import { Link } from "react-router-dom";

function Settings() {
  return (
    <div className="stack">
      <h2>Settings</h2>
      <ul>
        <li>
          <Link to="instances">Instances</Link>
        </li>
      </ul>
    </div>
  );
}

export default Settings;
