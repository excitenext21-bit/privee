import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteContext';
import { Enquiry } from '../../types';
import { Mail, Calendar, MapPin, Users, DollarSign, Trash2, CheckCircle2, Clock, Archive } from 'lucide-react';

export const EnquiriesDashboard: React.FC = () => {
  const { data, updateEnquiryStatus, deleteEnquiry } = useSiteData();
  const { enquiries } = data;

  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const filtered = enquiries.filter((e) => {
    if (filterStatus === 'ALL') return true;
    return e.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D9] pb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-serif font-medium text-[#1A1918] flex items-center gap-2">
            <Mail size={18} className="text-[#A39282]" />
            Captured Enquiries &amp; Consultations
          </h2>
          <p className="text-xs text-[#7A756C]">
            All contact form submissions from website visitors are logged here in real time.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center space-x-1.5 text-xs bg-[#FAF8F5] p-1 rounded border border-[#E8E2D9]">
          {['ALL', 'New', 'Contacted', 'Archived'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                filterStatus === status
                  ? 'bg-[#1A1918] text-white font-medium'
                  : 'text-[#7A756C] hover:text-[#1A1918]'
              }`}
            >
              {status} ({status === 'ALL' ? enquiries.length : enquiries.filter((e) => e.status === status).length})
            </button>
          ))}
        </div>
      </div>

      {enquiries.length === 0 ? (
        <div className="bg-white p-12 rounded border border-[#E8E2D9] text-center space-y-2">
          <Mail size={32} className="mx-auto text-[#C5B39C]" />
          <h3 className="text-sm font-serif text-[#1A1918] font-bold">No Enquiries Captured Yet</h3>
          <p className="text-xs text-[#888] max-w-sm mx-auto">
            When visitors submit a booking enquiry through the Contact Us form, their request will instantly appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left List of Enquiries */}
          <div className="lg:col-span-5 space-y-3">
            {filtered.map((enq) => {
              const isSelected = selectedEnquiry?.id === enq.id;

              return (
                <div
                  key={enq.id}
                  onClick={() => setSelectedEnquiry(enq)}
                  className={`bg-white p-4 rounded border transition-all cursor-pointer space-y-2 shadow-2xs ${
                    isSelected
                      ? 'border-[#1A1918] ring-1 ring-[#1A1918] bg-[#FAF8F5]'
                      : 'border-[#E8E2D9] hover:border-[#C5B39C]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif font-bold text-[#1A1918]">{enq.name}</span>
                    <span
                      className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-mono ${
                        enq.status === 'New'
                          ? 'bg-amber-100 text-amber-800 font-bold'
                          : enq.status === 'Contacted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#7A756C] flex items-center gap-1.5 truncate">
                    <Mail size={12} className="text-[#A39282] shrink-0" />
                    <span>{enq.email}</span>
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-[#9A8F85] pt-1 border-t border-[#F0ECE6]">
                    <span>Event: {enq.eventDate || 'N/A'}</span>
                    <span>{new Date(enq.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Detailed Inspector Panel */}
          <div className="lg:col-span-7">
            {selectedEnquiry ? (
              <div className="bg-white p-6 rounded border border-[#E8E2D9] space-y-5 sticky top-4 shadow-sm">
                <div className="flex items-start justify-between border-b border-[#E8E2D9] pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#A39282] font-mono block">
                      ENQUIRY DETAILS
                    </span>
                    <h3 className="text-xl font-serif text-[#1A1918] font-bold mt-0.5">
                      {selectedEnquiry.name}
                    </h3>
                    <p className="text-xs text-[#7A756C] mt-0.5">{selectedEnquiry.email}</p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center space-x-1.5">
                    <button
                      type="button"
                      onClick={() => updateEnquiryStatus(selectedEnquiry.id, 'Contacted')}
                      className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded text-xs flex items-center gap-1 cursor-pointer"
                      title="Mark as Contacted"
                    >
                      <CheckCircle2 size={12} />
                      <span>Contacted</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => updateEnquiryStatus(selectedEnquiry.id, 'Archived')}
                      className="px-2.5 py-1 bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 rounded text-xs flex items-center gap-1 cursor-pointer"
                      title="Archive"
                    >
                      <Archive size={12} />
                      <span>Archive</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        deleteEnquiry(selectedEnquiry.id);
                        setSelectedEnquiry(null);
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Event Key Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF8F5] p-3 rounded border border-[#E8E2D9] text-xs">
                  <div>
                    <span className="text-[10px] text-[#A39282] uppercase tracking-wider block font-medium flex items-center gap-1">
                      <Calendar size={11} /> Date
                    </span>
                    <span className="font-medium text-[#1A1918]">{selectedEnquiry.eventDate || 'Not specified'}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#A39282] uppercase tracking-wider block font-medium flex items-center gap-1">
                      <MapPin size={11} /> Location
                    </span>
                    <span className="font-medium text-[#1A1918] truncate block">{selectedEnquiry.location || 'N/A'}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#A39282] uppercase tracking-wider block font-medium flex items-center gap-1">
                      <Users size={11} /> Guests
                    </span>
                    <span className="font-medium text-[#1A1918]">{selectedEnquiry.guestCount || 'N/A'}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#A39282] uppercase tracking-wider block font-medium flex items-center gap-1">
                      <DollarSign size={11} /> Budget
                    </span>
                    <span className="font-medium text-[#1A1918]">{selectedEnquiry.budget || 'N/A'}</span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#1A1918]">
                    Vision &amp; Message:
                  </span>
                  <div className="p-4 bg-[#FAF8F5] rounded border border-[#E8E2D9] text-xs text-[#2C2A29] leading-relaxed whitespace-pre-wrap font-sans">
                    {selectedEnquiry.message}
                  </div>
                </div>

                <div className="text-[10px] text-[#9A8F85] pt-2 flex items-center justify-between border-t border-[#E8E2D9]">
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> Submitted: {new Date(selectedEnquiry.submittedAt).toLocaleString()}
                  </span>
                  <span>ID: {selectedEnquiry.id}</span>
                </div>
              </div>
            ) : (
              <div className="bg-white p-12 rounded border border-[#E8E2D9] text-center text-[#888] text-xs">
                Select an enquiry from the left list to view full details and contact details.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
