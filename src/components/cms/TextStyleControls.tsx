import React from 'react';
import { TextStyle } from '../../types';
import { Type, Palette, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface TextStyleControlsProps {
  label: string;
  styleObj?: TextStyle;
  onChange: (updatedStyle: TextStyle) => void;
}

export const TextStyleControls: React.FC<TextStyleControlsProps> = ({
  label,
  styleObj = { fontSize: '16px', fontWeight: '400', fontColor: '#2C2A29', textDecoration: 'none', fontStyle: 'normal', textTransform: 'none', textAlign: 'left' },
  onChange
}) => {
  const PRESET_COLORS = [
    { name: 'Default Taupe/Grey', value: 'rgba(153,152,148,1)' },
    { name: 'Dark Charcoal', value: '#2C2A29' },
    { name: 'Muted Gold/Beige', value: '#C5B39C' },
    { name: 'Light Cream', value: '#FAF8F5' },
    { name: 'Pure White', value: '#FFFFFF' },
    { name: 'Deep Black', value: '#000000' },
    { name: 'Soft Muted', value: '#7A756C' }
  ];

  return (
    <div className="bg-[#F8F6F2] p-4 rounded-md border border-[#E8E2D9] space-y-3">
      <div className="flex items-center justify-between border-b border-[#E2DDD2] pb-2">
        <span className="text-xs uppercase tracking-wider font-medium text-[#1A1918] flex items-center gap-1.5">
          <Type size={14} className="text-[#A39282]" />
          {label} Styling Controls
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        {/* Font Size */}
        <div>
          <label className="block text-[11px] text-[#7A756C] font-medium mb-1">
            Font Size (e.g., 16px, 45px)
          </label>
          <input
            type="text"
            value={styleObj.fontSize || ''}
            onChange={(e) => onChange({ ...styleObj, fontSize: e.target.value })}
            placeholder="e.g. 45px"
            className="w-full bg-white border border-[#DDD8D0] px-2.5 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
          />
        </div>

        {/* Font Weight */}
        <div>
          <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Font Weight</label>
          <select
            value={styleObj.fontWeight || '400'}
            onChange={(e) => onChange({ ...styleObj, fontWeight: e.target.value })}
            className="w-full bg-white border border-[#DDD8D0] px-2.5 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none cursor-pointer"
          >
            <option value="300">300 (Light)</option>
            <option value="400">400 (Normal / Regular)</option>
            <option value="500">500 (Medium)</option>
            <option value="600">600 (Semi-Bold)</option>
            <option value="700">700 (Bold)</option>
          </select>
        </div>

        {/* Font Color */}
        <div>
          <label className="block text-[11px] text-[#7A756C] font-medium mb-1 flex items-center gap-1">
            <Palette size={12} /> Font Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={styleObj.fontColor?.startsWith('#') ? styleObj.fontColor : '#999894'}
              onChange={(e) => onChange({ ...styleObj, fontColor: e.target.value })}
              className="w-8 h-7 rounded border border-[#DDD8D0] cursor-pointer bg-transparent p-0"
            />
            <input
              type="text"
              value={styleObj.fontColor || ''}
              onChange={(e) => onChange({ ...styleObj, fontColor: e.target.value })}
              placeholder="#999894"
              className="flex-1 bg-white border border-[#DDD8D0] px-2 py-1 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
            />
          </div>
        </div>

        {/* Text Decoration & Style Toggles */}
        <div>
          <label className="block text-[11px] text-[#7A756C] font-medium mb-1">Style & Decoration</label>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() =>
                onChange({
                  ...styleObj,
                  fontStyle: styleObj.fontStyle === 'italic' ? 'normal' : 'italic'
                })
              }
              className={`px-2 py-1 border rounded flex items-center gap-1 text-[11px] cursor-pointer transition-colors ${
                styleObj.fontStyle === 'italic'
                  ? 'bg-[#1A1918] text-white border-[#1A1918]'
                  : 'bg-white text-[#555] border-[#DDD8D0] hover:bg-[#F0ECE6]'
              }`}
              title="Toggle Italic"
            >
              <Italic size={12} />
              <span>Italic</span>
            </button>

            <button
              type="button"
              onClick={() =>
                onChange({
                  ...styleObj,
                  textDecoration: styleObj.textDecoration === 'underline' ? 'none' : 'underline'
                })
              }
              className={`px-2 py-1 border rounded flex items-center gap-1 text-[11px] cursor-pointer transition-colors ${
                styleObj.textDecoration === 'underline'
                  ? 'bg-[#1A1918] text-white border-[#1A1918]'
                  : 'bg-white text-[#555] border-[#DDD8D0] hover:bg-[#F0ECE6]'
              }`}
              title="Toggle Underline"
            >
              <Underline size={12} />
              <span>Underline</span>
            </button>

            <button
              type="button"
              onClick={() =>
                onChange({
                  ...styleObj,
                  textDecoration: styleObj.textDecoration === 'line-through' ? 'none' : 'line-through'
                })
              }
              className={`px-2 py-1 border rounded flex items-center gap-1 text-[11px] cursor-pointer transition-colors ${
                styleObj.textDecoration === 'line-through'
                  ? 'bg-[#1A1918] text-white border-[#1A1918]'
                  : 'bg-white text-[#555] border-[#DDD8D0] hover:bg-[#F0ECE6]'
              }`}
              title="Toggle Line Through"
            >
              <span>Strike</span>
            </button>

            <button
              type="button"
              onClick={() =>
                onChange({
                  ...styleObj,
                  textTransform: styleObj.textTransform === 'uppercase' ? 'none' : 'uppercase'
                })
              }
              className={`px-2 py-1 border rounded flex items-center gap-1 text-[11px] cursor-pointer transition-colors ${
                styleObj.textTransform === 'uppercase'
                  ? 'bg-[#1A1918] text-white border-[#1A1918]'
                  : 'bg-white text-[#555] border-[#DDD8D0] hover:bg-[#F0ECE6]'
              }`}
              title="Toggle Uppercase"
            >
              <span>AA</span>
            </button>

            <div className="h-4 w-px bg-[#DDD8D0] mx-0.5" />

            <button
              type="button"
              onClick={() => onChange({ ...styleObj, textAlign: 'left' })}
              className={`p-1.5 border rounded flex items-center justify-center cursor-pointer transition-colors ${
                styleObj.textAlign === 'left' || !styleObj.textAlign
                  ? 'bg-[#1A1918] text-white border-[#1A1918]'
                  : 'bg-white text-[#555] border-[#DDD8D0] hover:bg-[#F0ECE6]'
              }`}
              title="Align Left"
            >
              <AlignLeft size={12} />
            </button>

            <button
              type="button"
              onClick={() => onChange({ ...styleObj, textAlign: 'center' })}
              className={`p-1.5 border rounded flex items-center justify-center cursor-pointer transition-colors ${
                styleObj.textAlign === 'center'
                  ? 'bg-[#1A1918] text-white border-[#1A1918]'
                  : 'bg-white text-[#555] border-[#DDD8D0] hover:bg-[#F0ECE6]'
              }`}
              title="Align Center"
            >
              <AlignCenter size={12} />
            </button>

            <button
              type="button"
              onClick={() => onChange({ ...styleObj, textAlign: 'right' })}
              className={`p-1.5 border rounded flex items-center justify-center cursor-pointer transition-colors ${
                styleObj.textAlign === 'right'
                  ? 'bg-[#1A1918] text-white border-[#1A1918]'
                  : 'bg-white text-[#555] border-[#DDD8D0] hover:bg-[#F0ECE6]'
              }`}
              title="Align Right"
            >
              <AlignRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Color Presets */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-[10px] text-[#A8A298] uppercase tracking-wider font-mono mr-1">
          Color Presets:
        </span>
        {PRESET_COLORS.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => onChange({ ...styleObj, fontColor: c.value })}
            className="w-5 h-5 rounded-full border border-black/20 cursor-pointer shadow-xs transition-transform hover:scale-110"
            style={{ backgroundColor: c.value }}
            title={`${c.name} (${c.value})`}
          />
        ))}
      </div>
    </div>
  );
};
