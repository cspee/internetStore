import { NavLink } from "react-router-dom";

export default function NavBar({ selectedProduct }) {
  return (
      <nav className="navBar-container">
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Home
        </NavLink>
        <NavLink
          to={"/products"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Products
        </NavLink>
        <NavLink
          to={`/products/${selectedProduct}`}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Choosen Product
        </NavLink>
        <NavLink
          to={"/contact"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Contact
        </NavLink>
        <NavLink
          to={"/basket"}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Basket
        </NavLink>

      </nav>
  );
}
