import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteContext';
import { ProcessStep } from '../../types';
import { TextStyleControls } from './TextStyleControls';
import { Plus, Trash2, Edit3, Layers } from 'lucide-react';

export const SectionEditorProcess: React.FC = () => {
  const { data, updateProcess } = useSiteData();
  const { process } = data;

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [newStep, setNewStep] = useState<ProcessStep>({
    number: `0${process.steps.length + 1}`,
    title: '',
    description: ''
  });

  const handleAddStep = () => {
    if (!newStep.title.trim() || !newStep.description.trim()) return;

    updateProcess({
      steps: [...process.steps, newStep]
    });

    setNewStep({
      number: `0${process.steps.length + 2}`,
      title: '',
      description: ''
    });
  };

  const handleDeleteStep = (index: number) => {
    updateProcess({
      steps: process.steps.filter((_, i) => i !== index)
    });
  };

  const handleUpdateStep = (index: number, updated: ProcessStep) => {
    const updatedSteps = [...process.steps];
    updatedSteps[index] = updated;
    updateProcess({ steps: updatedSteps });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D9] pb-3">
        <h2 className="text-lg font-serif font-medium text-[#1A1918]">
          Section 7 — OUR PROCESS Management
        </h2>
        <p className="text-xs text-[#7A756C]">
          Change main heading copy, add or customize process phases/steps, and set typography styling.
        </p>
      </div>

      {/* Eyebrow & Main Heading */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918] mb-1">
            Eyebrow Label
          </label>
          <input
            type="text"
            value={process.eyebrow}
            onChange={(e) => updateProcess({ eyebrow: e.target.value })}
            className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1918] mb-1">
            Section Main Heading Text
          </label>
          <textarea
            rows={2}
            value={process.heading}
            onChange={(e) => updateProcess({ heading: e.target.value })}
            className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-2 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
          />
        </div>

        <TextStyleControls
          label="Process Main Heading"
          styleObj={process.headingStyle}
          onChange={(style) => updateProcess({ headingStyle: style })}
        />

        <TextStyleControls
          label="Step Titles Styling"
          styleObj={process.stepTitleStyle}
          onChange={(style) => updateProcess({ stepTitleStyle: style })}
        />
      </div>

      {/* Add New Step */}
      <div className="bg-white p-4 rounded border border-[#E8E2D9] space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1918] flex items-center gap-1.5">
          <Plus size={14} className="text-[#A39282]" />
          Add New Process Step
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
          <div className="sm:col-span-3">
            <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Step Number</label>
            <input
              type="text"
              value={newStep.number}
              onChange={(e) => setNewStep({ ...newStep, number: e.target.value })}
              placeholder="05"
              className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-9">
            <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Step Title</label>
            <input
              type="text"
              value={newStep.title}
              onChange={(e) => setNewStep({ ...newStep, title: e.target.value })}
              placeholder="e.g. POST-EVENT FINE ART ARCHIVE"
              className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Step Description</label>
          <textarea
            rows={2}
            value={newStep.description}
            onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
            placeholder="Comprehensive event curation, vendor coordination..."
            className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
          />
        </div>

        <button
          type="button"
          onClick={handleAddStep}
          className="px-4 py-2 bg-[#1A1918] hover:bg-[#2C2A29] text-white text-xs font-medium rounded flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
        >
          <Plus size={14} />
          <span>Add Process Step</span>
        </button>
      </div>

      {/* Existing Steps List */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1A1918]">
          Current Process Steps ({process.steps.length})
        </h3>

        <div className="space-y-3">
          {process.steps.map((step, idx) => {
            const isEditing = editingIndex === idx;

            return (
              <div key={idx} className="bg-white p-4 rounded border border-[#E8E2D9] space-y-2 shadow-2xs">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-xs font-bold text-[#C5B39C] bg-[#1A1918] px-2 py-1 rounded">
                      {step.number}
                    </span>
                    <div>
                      <h4 className="text-xs font-serif tracking-wider uppercase text-[#1A1918] font-bold">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#666] line-clamp-1 mt-0.5">{step.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingIndex(isEditing ? null : idx)}
                      className="p-1.5 text-[#555] hover:text-[#1A1918] cursor-pointer"
                      title="Edit Step"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteStep(idx)}
                      className="p-1.5 text-[#999] hover:text-red-600 cursor-pointer"
                      title="Delete Step"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Inline Editing Form */}
                {isEditing && (
                  <div className="pt-3 border-t border-[#E8E2D9] space-y-3 bg-[#FAF8F5] p-3 rounded text-xs">
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-3">
                        <label className="block text-[10px] text-[#666]">Step #</label>
                        <input
                          type="text"
                          value={step.number}
                          onChange={(e) => handleUpdateStep(idx, { ...step, number: e.target.value })}
                          className="w-full bg-white border border-[#DDD8D0] px-2 py-1 rounded"
                        />
                      </div>
                      <div className="col-span-9">
                        <label className="block text-[10px] text-[#666]">Step Title</label>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => handleUpdateStep(idx, { ...step, title: e.target.value })}
                          className="w-full bg-white border border-[#DDD8D0] px-2 py-1 rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#666]">Step Description</label>
                      <textarea
                        rows={3}
                        value={step.description}
                        onChange={(e) => handleUpdateStep(idx, { ...step, description: e.target.value })}
                        className="w-full bg-white border border-[#DDD8D0] px-2 py-1 rounded"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
