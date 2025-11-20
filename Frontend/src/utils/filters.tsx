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
    { value: monthsAgo(0), label: "All" }
  ];

  return <Select options={options} onChange={onChange} placeholder="Date Posted"/>;
};

export const listingType = (onChange: (option: any) => void) => {

  
    const options = [
      { value: "Full-time", label: "Full-time" },
      { value: "Part-time", label: "Part-time" },
      { value: "Intern", label: "Intern" },
      { value: "Contract", label: "Contract" },
      { value: "All", label: "All" },
  
    ];
  
    return <Select options={options} onChange={onChange} placeholder="Contract Type"/>;
  };
  
  export const listingSeniority = (onChange: (option: any) => void) => {

  
    const options = [
      { value: "Senior", label: "Senior" },
      { value: "Mid-level", label: "Mid-level" },
      { value: "Junior", label: "Juinor" },
      { value: "Intern", label: "Intern" },
      { value: "All", label: "All" },
  
    ];
  
    return <Select options={options} onChange={onChange} placeholder="Seniority"/>;
  };
