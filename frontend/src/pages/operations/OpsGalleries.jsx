import React, { useState, useEffect } from 'react';
import api, { listOf } from '../../services/api';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';

export default function OpsGalleries() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const res = await api.get('/galleries?page=0&size=100');
      setGalleries(listOf(res));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-navy-900">Gallery Delivery Tracking</h1>
        <p className="text-navy-600 text-sm">Monitor gallery completion deadlines and client proofing progress.</p>
      </div>

      <Card>
        {loading ? (
          <LoadingSkeleton count={4} className="h-14" />
        ) : galleries.length === 0 ? (
          <p className="text-xs text-navy-500 py-6 text-center">No galleries found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-navy-100 text-navy-500 uppercase text-xs">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Booking Ref</th>
                  <th className="py-3 px-4">Photo Count</th>
                  <th className="py-3 px-4">Access Code</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {galleries.map(g => (
                  <tr key={g.id} className="hover:bg-navy-50/50">
                    <td className="py-3 px-4 font-semibold text-navy-900">{g.title}</td>
                    <td className="py-3 px-4 font-mono text-xs">{g.bookingRef || 'N/A'}</td>
                    <td className="py-3 px-4">{g.photoCount || 0} photos</td>
                    <td className="py-3 px-4 font-mono text-xs">{g.accessCode}</td>
                    <td className="py-3 px-4"><Badge status={g.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
