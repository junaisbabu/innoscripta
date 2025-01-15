import { useLocation } from "react-router-dom";

const navItems = [
  { title: "NewsAPI", route: "/" },
  { title: "New York Times", route: "/new-york-times" },
];

function Navbar() {
  const location = useLocation();

  return (
    <div>
      <aside className="w-52 h-dvh bg-zinc-800 fixed py-4">
        <ul className="flex flex-col gap-2">
          {navItems.map(({ title, route }) => (
            <li
              className={`p-2 ${
                route === location.pathname ? "bg-zinc-100" : "text-zinc-50"
              }`}
            >
              <a className="w-full" href={route}>
                {title}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default Navbar;
