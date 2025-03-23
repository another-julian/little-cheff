import ico from "../assets/logo-chef.png";

export default function Header() {
  return (
    <header>
      <nav>
        <img className="ico" src={ico} alt="little chef ico" />
        <h1>Little Cheff</h1>
      </nav>
    </header>
  );
}
