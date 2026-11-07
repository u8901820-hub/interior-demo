import React, { useState, useEffect } from 'react';
import { X, Search, Filter, Phone, Mail, MapPin, Calendar, Clock, Edit3, Save, Check, RefreshCw } from 'lucide-react';
import { InquiryRecord } from '../../server';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  onInquiryUpdated: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  isOpen,
  onClose,
  onInquiryUpdated
}) => {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<any>('');
  const [editNotes, setEditNotes] = useState<string>('');
  const [saveSuccessId, setSaveSuccessId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success && data.inquiries) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      console.error('Failed to fetch inquiries:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchInquiries();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStartEdit = (inq: InquiryRecord) => {
    setEditingId(inq.id);
    setEditStatus(inq.status);
    setEditNotes(inq.designerNotes || '');
  };

  const handleSaveUpdate = async (id: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: editStatus,
          designerNotes: editNotes
        })
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccessId(id);
        setTimeout(() => setSaveSuccessId(null), 2000);
        setEditingId(null);
        fetchInquiries();
        onInquiryUpdated();
      }
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const filtered = inquiries.filter((inq) => {
    const matchesQuery =
      inq.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.referenceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.includes(searchQuery) ||
      inq.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Consultation Scheduled': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Concept Drafted': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Quotation Sent': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Under Execution': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Completed': return 'bg-neutral-100 text-neutral-800 border-neutral-300';
      default: return 'bg-neutral-100 text-neutral-800 border-neutral-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-[#FBF9F5] rounded-xl border border-[#2B1F1A]/20 max-w-5xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#2B1F1A]/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A85836]">
              <span>Studio Inquiries & Client Project Portal</span>
              <span aria-hidden="true">·</span>
              <span>Backend Store</span>
            </div>
            <h3 className="font-serif text-2xl font-semibold text-[#1B1310] mt-0.5">
              Consultation & Estimate Registry
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchInquiries}
              className="p-2 text-[#423B32] hover:text-[#1B1310] hover:bg-[#F5F0E8] rounded transition-colors cursor-pointer"
              title="Refresh Records"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#423B32] hover:text-[#1B1310] hover:bg-[#F5F0E8] rounded transition-colors cursor-pointer"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-4 border-b border-[#2B1F1A]/10">
          
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#423B32]/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ID (TS-HBL), phone..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded border border-[#2B1F1A]/20 bg-white text-[#1B1310] focus:ring-1 focus:ring-[#A85836]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {['all', 'New', 'Consultation Scheduled', 'Concept Drafted', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#A85836] text-white shadow-2xs font-semibold'
                    : 'bg-white text-[#423B32] border border-[#2B1F1A]/10 hover:border-[#A85836]/40'
                }`}
              >
                {st === 'all' ? 'All Inquiries' : st}
              </button>
            ))}
          </div>

        </div>

        {/* Content Table / Card List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[#423B32]">
              <p className="text-sm font-medium">No consultation records match the current filter.</p>
              <p className="text-xs text-[#423B32]/70 mt-1">Book a consultation on the website to see it appear live here.</p>
            </div>
          ) : (
            filtered.map((inq) => {
              const isEditing = editingId === inq.id;
              return (
                <div
                  key={inq.id}
                  className="bg-white p-5 rounded-lg border border-[#2B1F1A]/10 shadow-2xs space-y-3"
                >
                  {/* Top Bar: Code, Date & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#2B1F1A]/10">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#A85836] bg-[#F5F0E8] px-2 py-0.5 rounded">
                        {inq.referenceCode}
                      </span>
                      <span className="font-serif text-lg font-semibold text-[#1B1310]">
                        {inq.fullName}
                      </span>
                      <span className="text-xs text-[#423B32]/70">
                        {new Date(inq.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          className="text-xs py-1 px-2 rounded border border-[#A85836] bg-white font-medium"
                        >
                          <option value="New">New</option>
                          <option value="Consultation Scheduled">Consultation Scheduled</option>
                          <option value="Concept Drafted">Concept Drafted</option>
                          <option value="Quotation Sent">Quotation Sent</option>
                          <option value="Under Execution">Under Execution</option>
                          <option value="Completed">Completed</option>
                        </select>
                      ) : (
                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded border ${getStatusColor(inq.status)}`}>
                          {inq.status}
                        </span>
                      )}

                      {isEditing ? (
                        <button
                          onClick={() => handleSaveUpdate(inq.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded transition-colors cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(inq)}
                          className="p-1.5 text-[#423B32] hover:text-[#1B1310] hover:bg-[#F5F0E8] rounded transition-colors cursor-pointer"
                          title="Edit Status & Notes"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Contact & Location Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[#423B32]">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#A85836]" />
                      <span className="font-medium text-[#1B1310]">{inq.phone}</span>
                    </div>
                    {inq.email && (
                      <div className="flex items-center gap-1.5 truncate">
                        <Mail className="w-3.5 h-3.5 text-[#A85836]" />
                        <span className="truncate">{inq.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#A85836]" />
                      <span>{inq.city}</span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-3 rounded bg-[#FBF9F5] border border-[#2B1F1A]/10 text-xs space-y-1.5">
                    <div className="flex flex-wrap justify-between gap-2">
                      <div>
                        <span className="text-[#423B32]/70">Configuration: </span>
                        <span className="font-semibold text-[#1B1310]">{inq.propertyType}</span>
                        <span className="mx-2 text-[#2B1F1A]/20">|</span>
                        <span className="text-[#423B32]/70">Scope: </span>
                        <span className="font-semibold text-[#1B1310]">{inq.projectScope}</span>
                      </div>
                      <div>
                        <span className="text-[#423B32]/70">Budget: </span>
                        <span className="font-bold text-[#A85836]">{inq.approxBudget}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-[#2B1F1A]/5 text-[11px]">
                      <div>
                        <span className="text-[#423B32]/70">Palette: </span>
                        <span className="font-medium text-[#1B1310]">{inq.colorPalettePreference}</span>
                      </div>
                      {inq.preferredDate && (
                        <div>
                          <span className="text-[#423B32]/70">Target Slot: </span>
                          <span className="font-medium text-[#1B1310]">{inq.preferredDate} ({inq.preferredTime})</span>
                        </div>
                      )}
                    </div>

                    {inq.message && (
                      <p className="text-[11px] text-[#423B32] italic pt-1">
                        Client Note: "{inq.message}"
                      </p>
                    )}
                  </div>

                  {/* Designer Internal Notes */}
                  {isEditing ? (
                    <div className="pt-1">
                      <label className="block text-[11px] font-semibold text-[#423B32] mb-1">
                        Principal Architect Notes
                      </label>
                      <textarea
                        rows={2}
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="Add site visit findings, client preferences, or quotation milestones..."
                        className="w-full p-2 text-xs rounded border border-[#2B1F1A]/20 bg-white"
                      />
                    </div>
                  ) : inq.designerNotes ? (
                    <div className="p-2.5 rounded bg-amber-50/60 border border-amber-200/50 text-[11px] text-[#423B32]">
                      <span className="font-semibold text-[#74361C]">Studio Notes: </span>
                      <span>{inq.designerNotes}</span>
                    </div>
                  ) : null}

                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#2B1F1A]/10 flex items-center justify-between text-xs text-[#423B32]">
          <span>Total Records: {inquiries.length}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-[#1B1310] hover:bg-[#F5F0E8] rounded transition-colors cursor-pointer"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
};
