import styles from "./ticket.module.css";

const FilterDropdown = ({ label, value, options, onChange }) => {
  return (
<<<<<<< HEAD
    <div>
      <select
        className={`form-select form-select-sm ${styles.dropdown}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
=======
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
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
    </div>
  );
};

export default FilterDropdown;
