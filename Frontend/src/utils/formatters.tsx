export function pastelColorFromString(str: string) {
    // Simple hash
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    const hue = Math.abs(hash) % 360; // rotate around color wheel
    const saturation = 60; // pastel = low saturation
    const lightness = 85; // pastel = very light
  
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
  
export function formatDate(dateStr: string){
    let date = new Date(dateStr)
    let currentDate = new Date()
    let bg = "#EEEEEE";   // default pastel grey
    let text = "#424242"; // default dark grey
    
    const diffMonths =
      (currentDate.getFullYear() - date.getFullYear()) * 12 +
      (currentDate.getMonth() - date.getMonth());
    
    if (diffMonths <= 3) {
      bg = "#E8F5E9";  // pastel green bg
      text = "#2E7D32"; // green text
    } else if (diffMonths <= 6) {
      bg = "#E3F2FD";  
      text = "#1565C0";
    } else if (diffMonths <= 12) {
      bg = "#FFF8E1";
      text = "#F9A825";
    } else if (diffMonths <= 18) {
      bg = "#FFF3E0";
      text = "#EF6C00";
    } else {
      bg = "#FFEBEE";
      text = "#C62828";
    }
    const formatted = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    });
    return {date:formatted, text:text, bg:bg}

}