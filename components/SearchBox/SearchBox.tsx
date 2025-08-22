import css from "./SearchBox.module.css";

interface SearchBoxProps {
  search: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ search, onChange }: SearchBoxProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={search}
      onChange={handleChange}
    />
  );
}
