import React, { useState, useEffect } from 'react';
import api, { listOf } from '../../services/api';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import LoadingSkeleton from '../../components/common/LoadingSkeleton';
import { useToast } from '../../context/ToastContext';
import { formatDate } from '../../utils/formatters';
import { UserPlus, UserCheck, UserX, Search } from 'lucide-react';

export default function UserManagement() {
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: 'PHOTOGRAPHER'
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/users?page=0&size=100');
      setUsers(listOf(res));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStaff = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.post('/users', form);
      toast.success('Staff user created successfully!');
      setModalOpen(false);
      setForm({ fullName: '', email: '', phone: '', password: '', role: 'PHOTOGRAPHER' });
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create user.');
    } finally {
      setSaving(false);
    }
  };

  const toggleUserStatus = async (id, currentActive) => {
    try {
      // Backend exposes separate deactivate / reactivate routes.
      await api.patch(`/users/${id}/${currentActive ? 'deactivate' : 'reactivate'}`);
      toast.success(`User ${!currentActive ? 'activated' : 'deactivated'}`);
      fetchUsers();
    } catch (err) {
      toast.error('Failed to change user status.');
    }
  };

  const filtered = users.filter(u =>
    (u.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.role || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-navy-900">User Account Management</h1>
          <p className="text-navy-600 text-sm">Create staff profiles, configure system permissions, and audit access.</p>
        </div>
        <Button variant="gold" icon={UserPlus} onClick={() => setModalOpen(true)}>
          Create Staff Account
        </Button>
      </div>

      <Card padding="p-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-navy-400" />
          <input
            type="text"
            placeholder="Search users by name, email, or role..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-navy-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </Card>

      <Card>
        {loading ? (
          <LoadingSkeleton count={5} className="h-14" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-navy-100 text-navy-500 uppercase text-xs">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {filtered.map(u => (
                  <tr key={u.id} className="hover:bg-navy-50/50">
                    <td className="py-3 px-4">
                      <p className="font-semibold text-navy-900">{u.fullName}</p>
                      <p className="text-xs text-navy-400">{u.email}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 bg-navy-100 text-navy-800 rounded">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-navy-600">{u.phone || 'N/A'}</td>
                    <td className="py-3 px-4 text-xs text-navy-500">{formatDate(u.createdAt)}</td>
                    <td className="py-3 px-4">
                      <Badge status={u.active ? 'ACTIVE' : 'INACTIVE'} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant={u.active ? 'danger' : 'gold'}
                        size="xs"
                        onClick={() => toggleUserStatus(u.id, u.active)}
                      >
                        {u.active ? 'Deactivate' : 'Activate'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {modalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setModalOpen(false)}
          title="Create Staff Account"
          footer={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="gold" onClick={handleCreateStaff} loading={saving}>Create Account</Button>
            </>
          }
        >
          <form className="space-y-4 text-sm">
            <Input
              label="Full Name"
              required
              value={form.fullName}
              onChange={e => setForm({ ...form, fullName: e.target.value })}
            />
            <Input
              label="Email Address"
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
            <Input
              label="Temporary Password"
              type="password"
              required
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <Input
              label="Phone Number"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
            <div>
              <label className="block text-xs font-semibold text-navy-700 uppercase tracking-wider mb-1">
                Role & Privileges
              </label>
              <select
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-navy-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              >
                <option value="CUSTOMER_RELATIONS_OFFICER">Customer Relations Officer (CRO)</option>
                <option value="OPERATIONS_MANAGER">Operations Manager</option>
                <option value="PHOTOGRAPHER">Photographer</option>
                <option value="FINANCE_EXECUTIVE">Finance Executive</option>
                <option value="COMPANY_DIRECTOR">Company Director / Admin</option>
              </select>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
