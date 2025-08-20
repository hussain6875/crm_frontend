import styles from "./ticket.module.css";

const FilterDropdown = ({ label, value, options, onChange }) => {
  return (
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
    </div>
  );
};

export default FilterDropdown;
