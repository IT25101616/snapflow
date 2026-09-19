import React, { useState, useEffect } from 'react';
import api, { listOf } from '../../services/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import { useToast } from '../../context/ToastContext';
import { Camera, Plus, CheckCircle, AlertCircle } from 'lucide-react';

export default function EquipmentInventory() {
  const toast = useToast();
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    category: 'CAMERA_BODY',
    serialNumber: '',
    status: 'AVAILABLE'
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const res = await api.get('/equipment?page=0&size=100');
      setEquipment(listOf(res));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.post('/equipment', form);
      toast.success('Equipment item added successfully!');
      setModalOpen(false);
      setForm({ name: '', category: 'CAMERA_BODY', serialNumber: '', status: 'AVAILABLE' });
      fetchEquipment();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save equipment.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-navy-900">Equipment Inventory</h1>
          <p className="text-navy-600 text-sm">Track camera bodies, prime lenses, drones, and lighting setups.</p>
        </div>
        <Button variant="gold" icon={Plus} onClick={() => setModalOpen(true)}>
          Add Gear
        </Button>
      </div>

      <Card>
        {loading ? (
          <LoadingSkeleton count={4} className="h-14" />
        ) : equipment.length === 0 ? (
          <p className="text-xs text-navy-500 py-6 text-center">No equipment recorded.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-navy-100 text-navy-500 uppercase text-xs">
                  <th className="py-3 px-4">Item Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Serial #</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {equipment.map(item => (
                  <tr key={item.id} className="hover:bg-navy-50/50">
                    <td className="py-3 px-4 font-semibold text-navy-900">{item.name}</td>
                    <td className="py-3 px-4 text-navy-600">{item.category}</td>
                    <td className="py-3 px-4 font-mono text-xs text-navy-500">{item.serialNumber}</td>
                    <td className="py-3 px-4"><Badge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Add Item Modal */}
      {modalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setModalOpen(false)}
          title="Add New Equipment"
          footer={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="gold" onClick={handleSave} loading={saving}>Save Item</Button>
            </>
          }
        >
          <form className="space-y-4 text-sm">
            <Input
              label="Equipment Name"
              required
              placeholder="e.g. Sony A7 IV Mirrorless"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <div>
              <label className="block text-xs font-semibold text-navy-700 uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-navy-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="CAMERA_BODY">Camera Body</option>
                <option value="LENS">Lens</option>
                <option value="LIGHTING">Lighting Equipment</option>
                <option value="DRONE">Drone</option>
                <option value="AUDIO">Audio Setup</option>
                <option value="ACCESSORY">Accessory / Gimbal</option>
              </select>
            </div>
            <Input
              label="Serial Number"
              required
              placeholder="e.g. SN-89410294"
              value={form.serialNumber}
              onChange={e => setForm({ ...form, serialNumber: e.target.value })}
            />
          </form>
        </Modal>
      )}
    </div>
  );
}
