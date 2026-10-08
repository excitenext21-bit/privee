import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Video as VideoIcon, Check, Loader2, X, RefreshCw } from 'lucide-react';
import { compressImageFile, uploadMediaToServer } from '../../utils/storage';

interface ImageUploaderProps {
  label: string;
  value?: string;
  currentUrl?: string;
  onChangeUrl: (url: string) => void;
  grayscale?: boolean;
  onToggleGrayscale?: (grayscale: boolean) => void;
  showGrayscaleOption?: boolean;
  isVideo?: boolean;
  helpText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  currentUrl,
  onChangeUrl,
  grayscale = false,
  onToggleGrayscale,
  showGrayscaleOption = true,
  isVideo = false,
  helpText
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mediaValue = value || currentUrl || '';

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setUploadSuccess(false);
      // For PNGs (like watermarks), compressImageFile maintains transparent background
      const base64Data = await compressImageFile(file, isVideo ? undefined : 1600, 0.85);
      if (base64Data) {
        // Try uploading to server endpoint to get permanent server URL
        const serverUrl = await uploadMediaToServer(base64Data, file.name);
        const finalUrl = serverUrl || base64Data;
        onChangeUrl(finalUrl);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Error processing upload:', err);
      alert('Failed to process upload. Please try a different media file format.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-md border border-[#E8E2D9] space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#1A1918] flex items-center gap-1.5">
          {isVideo ? <VideoIcon size={14} className="text-[#A39282]" /> : <ImageIcon size={14} className="text-[#A39282]" />}
          {label}
        </label>

        {showGrayscaleOption && onToggleGrayscale && !isVideo && (
          <label className="flex items-center space-x-2 text-xs text-[#2C2A29] cursor-pointer bg-[#F8F6F2] px-2.5 py-1 rounded border border-[#E2DDD2] hover:bg-[#F0ECE6] transition-colors">
            <input
              type="checkbox"
              checked={grayscale}
              onChange={(e) => onToggleGrayscale(e.target.checked)}
              className="rounded accent-[#1A1918] cursor-pointer"
            />
            <span className="font-medium text-[11px] uppercase tracking-wider">
              Black &amp; White Toggle ({grayscale ? 'B&W On' : 'Color'})
            </span>
          </label>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        {/* Media Preview Box */}
        <div className="md:col-span-4 aspect-video bg-[#F3EFEA] rounded border border-[#DDD8D0] overflow-hidden flex items-center justify-center relative group">
          {mediaValue ? (
            isVideo ? (
              <video src={mediaValue} className="w-full h-full object-cover" controls muted />
            ) : (
              <img
                src={mediaValue}
                alt={label}
                className={`w-full h-full object-contain p-1 transition-all ${grayscale ? 'grayscale contrast-110' : ''}`}
              />
            )
          ) : (
            <span className="text-[11px] text-[#A8A298]">No Media Selected</span>
          )}

          {grayscale && !isVideo && (
            <span className="absolute top-1 left-1 bg-black/75 text-white text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded font-mono">
              B&amp;W
            </span>
          )}

          {mediaValue && (
            <button
              type="button"
              onClick={() => onChangeUrl('')}
              className="absolute top-1 right-1 bg-black/60 hover:bg-black text-white p-1 rounded cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove image"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Input & Upload Controls */}
        <div className="md:col-span-8 space-y-2">
          <div>
            <span className="block text-[11px] text-[#7A756C] font-medium mb-1">
              Direct Media URL or Upload File
            </span>
            <input
              type="text"
              value={mediaValue}
              onChange={(e) => onChangeUrl(e.target.value)}
              placeholder={isVideo ? "https://example.com/video.mp4" : "https://images.unsplash.com/... or paste data URL"}
              className="w-full bg-[#FAF8F5] border border-[#DDD8D0] px-3 py-1.5 text-xs rounded text-[#1A1918] focus:border-[#C5B39C] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <label className={`flex items-center justify-center gap-1.5 bg-[#1A1918] hover:bg-[#2C2A29] text-white text-xs px-3.5 py-1.5 rounded cursor-pointer transition-colors shadow-xs ${uploading ? 'opacity-70 pointer-events-none' : ''}`}>
              {uploading ? <Loader2 size={13} className="animate-spin text-[#C5B39C]" /> : <Upload size={13} />}
              <span>{uploading ? 'Uploading & Optimizing...' : `Choose Local ${isVideo ? 'Video' : 'File / Image'}`}</span>
              <input
                ref={fileInputRef}
                type="file"
                accept={isVideo ? "video/*" : "image/*,.svg,.png,.jpg,.jpeg,.webp"}
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>

            {uploadSuccess && (
              <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <Check size={12} /> Uploaded!
              </span>
            )}

            {helpText && (
              <span className="text-[10px] text-[#7A756C] block w-full">
                {helpText}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
