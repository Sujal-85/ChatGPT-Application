function Section({ title, children }) {
    return (
      <li className="mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <ul className="ml-4 mt-2 text-gray-600">{children}</ul>
      </li>
    );
  }
  export default Section;