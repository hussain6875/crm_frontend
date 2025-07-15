import styles from "./ticket.module.css";

const FilterDropdown = ({ label, value, options, onChange }) => {
  return (
    <div className="position-relative">
      <div className="dropdown-center position-relative">
        <button
          className="form-select d-flex justify-content-between align-items-center btn btn-outline-secondary btn-sm"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span>{value || label}</span>
        </button>
        <ul className={`dropdown-menu ${styles.dropdown}`}>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                onChange("");
              }}
            >
              {label}
            </button>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          {options.map((option, index) => (
            <li key={index}>
              <button
                className="dropdown-item"
                onClick={() => {
                  onChange(option);
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterDropdown;
