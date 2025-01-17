import React, { useEffect, useRef } from 'react';
import { Calendar } from 'react-modern-calendar-datepicker';

interface DatePickerComponentProps {
  handleOnChange?: () => void;
  setSelectedDay?: (e) => void;
  onDateChange?: (obj) => void;
  setCalendar: (v: boolean) => any;
  isTodaySelected?: boolean;
  onTodaysDateChange?: () => void;
  onSelectDateChange?: () => void;
}

const renderFooter = (props) => {
  const { isTodaySelected, onTodaysDateChange } = props;
  return (
    <label className="label-container">
      <input
        role="radio"
        type="radio"
        value={''}
        aria-checked={isTodaySelected}
        checked={isTodaySelected}
        onChange={onTodaysDateChange}
      />
      <span className="footer-text">{'Current date'}</span>
    </label>
  );
};

const renderHeader = (props) => {
  const { isTodaySelected, onSelectDateChange } = props;
  return (
    <label className="label-container">
      <input
        role="radio"
        type="radio"
        value={''}
        aria-checked={!isTodaySelected}
        checked={!isTodaySelected}
        onChange={onSelectDateChange}
      />
      <span className="footer-text">{'Select date'}</span>
    </label>
  );
};

const renderDatePicker = (props) => {
  const { handleOnChange, setSelectedDay, onDateChange } = props;
  const onChange = (d) => onDateChange(d, setSelectedDay, handleOnChange);
  return (
    <div className="date-filter-wrapper">
      <Calendar
        onChange={onChange}
        shouldHighlightWeekends
        colorPrimary="#0078d4"
        colorPrimaryLight="#0078d41c"
      />
    </div>
  );
};

const DatePickerComponent: React.FC<DatePickerComponentProps> = (props) => {
  const { setCalendar } = props;
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef && cardRef.current) {
        const ref: any = cardRef.current;
        if (!ref.contains(e.target) && !e.target.classList.contains('Calendar__day'))
          setCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <div ref={cardRef} className="date-modal-container">
      {renderHeader(props)}
      {renderDatePicker(props)}
      {renderFooter(props)}
    </div>
  );
};

DatePickerComponent.displayName = 'DatePickerComponent';

export default DatePickerComponent;
