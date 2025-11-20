// utils/filters.tsx
import Select from "react-select";

export const listingAge = (onChange: (option: any) => void) => {
  const today = new Date();

  const monthsAgo = (n: number) => {
    const d = new Date();
    d.setMonth(d.getMonth() - n);
    return d;
  };

  const options = [
    { value: today, label: "Today" },
    { value: monthsAgo(3), label: "Last 3 Months" },
    { value: monthsAgo(6), label: "Last 6 Months" },
    { value: monthsAgo(12), label: "Last 12 Months" },
    { value: monthsAgo(18), label: "Older" },
    { value: monthsAgo(-1), label: "All" }
  ];

  return <Select options={options} onChange={onChange} />;
};
