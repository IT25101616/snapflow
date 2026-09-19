import React, { useState, useEffect } from 'react';
import api, { listOf } from '../../services/api';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import { formatDate } from '../../utils/formatters';

export default function CROChangeRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await api.get('/change-requests/pending');
      setRequests(listOf(res));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-navy-900">Client Change Requests</h1>
        <p className="text-navy-600 text-sm">Monitor reschedule and venue adjustment requests submitted by clients.</p>
      </div>

      <Card>
        {loading ? (
          <LoadingSkeleton count={4} className="h-14" />
        ) : requests.length === 0 ? (
          <p className="text-xs text-navy-500 py-6 text-center">No change requests found.</p>
        ) : (
          <div className="divide-y divide-navy-100">
            {requests.map(r => (
              <div key={r.id} className="py-4 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-navy-700">{r.bookingRef}</span>
                    <Badge status={r.status} />
                  </div>
                  <p className="font-semibold text-navy-900 text-sm mt-1">{r.proposedPackageName || r.bookingRef}</p>
                  <p className="text-xs text-navy-600 mt-0.5">Reason: {r.description}</p>
                  {r.proposedDate && (
                    <p className="text-xs text-amber-700 mt-1">Proposed Date: {formatDate(r.proposedDate)}</p>
                  )}
                </div>
                <span className="text-xs text-navy-400">{formatDate(r.createdAt)}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
