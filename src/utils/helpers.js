import html2canvas from 'html2canvas';

export const takeScreenshot = (phoneRef) => {
  if (phoneRef.current) {
    html2canvas(phoneRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'message_simulator_screenshot.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  }
};

export const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const generatePlaceholderImage = (width, height) => {
  return `https://via.placeholder.com/${width}x${height}`;
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};