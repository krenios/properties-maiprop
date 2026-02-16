import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
  /** Current image URLs */
  value: string[];
  /** Called with updated URL array */
  onChange: (urls: string[]) => void;
  /** Max number of images (default unlimited) */
  max?: number;
  /** Label shown above dropzone */
  label?: string;
  /** Folder prefix inside the bucket */
  folder?: string;
}

const BUCKET = "property-images";

const ImageUpload = ({ value, onChange, max, label, folder = "gallery" }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

      const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

      if (error) {
        console.error("Upload failed:", error);
        continue;
      }

      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
      newUrls.push(urlData.publicUrl);
    }

    const updated = [...value, ...newUrls];
    onChange(max ? updated.slice(0, max) : updated);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const remove = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  const atMax = max ? value.length >= max : false;

  return (
    <div className="grid gap-2">
      {label && <p className="text-sm font-medium">{label}</p>}

      {/* Thumbnails */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((url, i) => (
            <div key={i} className="group relative h-20 w-20 overflow-hidden rounded-lg border border-border">
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute right-1 top-1 rounded-full bg-destructive/80 p-0.5 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <X className="h-3 w-3 text-destructive-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload area */}
      {!atMax && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary disabled:opacity-50"
        >
          {uploading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Uploading…</>
          ) : (
            <><Upload className="h-4 w-4" /> Click to upload {max === 1 ? "image" : "images"}</>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={max !== 1}
        className="hidden"
        onChange={(e) => upload(e.target.files)}
      />
    </div>
  );
};

export default ImageUpload;
