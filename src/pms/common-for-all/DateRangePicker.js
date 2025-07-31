import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const DateRangePicker = () => {
  const [dates, setDates] = useState(null);

  const formatDateRange = () => {
    if (!dates || !dates[0]) return '';
    
    const startDate = dates[0];
    const endDate = dates[1];
    
    if (!endDate) {
      return startDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
    
    const startMonth = startDate.toLocaleDateString('en-US', { month: 'short' });
    const startDay = startDate.getDate();
    const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' });
    const endDay = endDate.getDate();
    const year = endDate.getFullYear();
    
    if (startDate.getMonth() === endDate.getMonth() && 
        startDate.getFullYear() === endDate.getFullYear()) {
      return `${startMonth} ${startDay} - ${endDay} ${year}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay} `;
    }
  };

  return (
    <div className="w-full">
      <div className="field">
      
        
        <Calendar
          id="dateRange"
          value={dates}
          onChange={(e) => setDates(e.value)}
          selectionMode="range"
          placeholder="Select date range"
          showIcon
          icon="pi pi-calendar"
          className="w-full"
          inputClassName="w-full px-3 py-2 border border-gray-300 rounded-md"
          panelClassName="shadow-lg border border-gray-300"
          readOnlyInput={false}
          hideOnRangeSelection={true}
        />
      </div>

      {/* {formatDateRange() && (
        <div className="bg-gray-50 rounded-md">
          <span className="text-sm text-gray-600">Selected Range: </span>
          <span className="font-medium">{formatDateRange()}</span>
        </div>
      )} */}

      <style jsx>{`
        :global(.p-calendar) {
          width: 100% !important;
        }
        
        :global(.p-calendar .p-inputtext) {
          width: 100% !important;
          padding: 8px 12px !important;
          border: 1px solid #d1d5db !important;
          border-radius: 6px !important;
          font-size: 14px !important;
        }
        
        :global(.p-calendar .p-inputtext:focus) {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2) !important;
          outline: none !important;
        }
        
        :global(.p-calendar-panel) {
          border: 1px solid #d1d5db !important;
          border-radius: 8px !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
        }
        
        :global(.p-datepicker-header) {
          background: #ffffff !important;
          border-bottom: 1px solid #e5e7eb !important;
        }
        
        :global(.p-datepicker-calendar td > span) {
          width: 32px !important;
          height: 32px !important;
          border-radius: 4px !important;
        }
        
        :global(.p-datepicker-calendar td > span:hover) {
          background: #f3f4f6 !important;
          color: #111827 !important;
        }
        
        :global(.p-datepicker-calendar td > span.p-highlight) {
          background: #3b82f6 !important;
          color: white !important;
        }
        
        :global(.p-datepicker-calendar td > span.p-highlight:hover) {
          background: #2563eb !important;
        }
        
        :global(.p-calendar-button) {
          border: 1px solid #d1d5db !important;
          border-left: none !important;
          background: #ffffff !important;
          color: #6b7280 !important;
        }
        
        :global(.p-calendar-button:hover) {
          background: #f9fafb !important;
          border-color: #d1d5db !important;
        }
      `}</style>
    </div>
  );
};

export default DateRangePicker;