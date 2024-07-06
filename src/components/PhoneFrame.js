import React from 'react';

const PhoneFrame = React.forwardRef(({ children }, ref) => (
  <div ref={ref} className="phone-frame">
    <div className="phone-notch"></div>
    {children}
  </div>
));

export default PhoneFrame;