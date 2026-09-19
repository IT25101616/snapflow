import React, { useState, useEffect } from 'react';
import api, { listOf } from '../../services/api';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { formatDate } from '../../utils/formatters';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

export default function MasterCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    fetchEvents();
  }, [year, month]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get('/bookings?page=0&size=100');
      setEvents(listOf(res));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-navy-900">Master Operations Calendar</h1>
          <p className="text-navy-600 text-sm">Monthly overview of all confirmed shoots, crew deployments, and commitments.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="p-2 border border-navy-200 rounded-lg hover:bg-navy-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-bold text-navy-900 px-3 min-w-[140px] text-center">
            {monthNames[month]} {year}
          </span>
          <button onClick={nextMonth} className="p-2 border border-navy-200 rounded-lg hover:bg-navy-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Card padding="p-4">
        <div className="grid grid-cols-7 gap-px bg-navy-200 rounded-xl overflow-hidden border border-navy-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="bg-navy-50 p-2 text-center text-xs font-bold text-navy-700 uppercase">
              {d}
            </div>
          ))}

          {[...Array(firstDay)].map((_, i) => (
            <div key={`empty-${i}`} className="bg-white/40 min-h-[100px] p-2" />
          ))}

          {[...Array(daysInMonth)].map((_, i) => {
            const dayNum = i + 1;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const dayEvents = events.filter(e => e.eventDate === dateStr);

            return (
              <div key={dayNum} className="bg-white min-h-[100px] p-2 border-t border-navy-100 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-navy-800">{dayNum}</span>
                  {dayEvents.length > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded-full">
                      {dayEvents.length}
                    </span>
                  )}
                </div>

                <div className="space-y-1 overflow-y-auto max-h-20">
                  {dayEvents.map(e => (
                    <div
                      key={e.id}
                      className="p-1 rounded text-[11px] bg-navy-900 text-white truncate hover:bg-amber-600 transition cursor-pointer"
                      title={`${e.bookingRef} - ${e.packageName} (${e.venue})`}
                    >
                      {e.startTime} {e.packageName}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
