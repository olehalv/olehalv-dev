const monthFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
});

const formatMonth = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : monthFormatter.format(date);
};

export const formatDateRange = (start: string, end?: string, current?: boolean) =>
  `${formatMonth(start)} - ${current || !end ? 'Present' : formatMonth(end)}`;
