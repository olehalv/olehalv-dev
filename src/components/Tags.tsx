interface TagsProps {
  items?: string[];
  label?: string;
}

export const Tags = ({ items, label }: TagsProps) => {
  if (!items?.length) return null;

  return (
    <ul className="tags" aria-label={label}>
      {items.map((item) => (
        <li key={item} className="tag">
          {item}
        </li>
      ))}
    </ul>
  );
};
