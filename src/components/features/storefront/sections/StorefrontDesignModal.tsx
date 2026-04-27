import { Button } from "../../../ui/Button";
import { Input } from "../../../ui/Input";
import { Select } from "../../../ui/Select";
import type { StorefrontDesignModalProps } from "../types";

export const StorefrontDesignModal = ({
  isDesignOpen,
  setIsDesignOpen,
  handleDesignSubmit,
  handleDesignFileChange,
  handleDesignReset,
  designPreviewUrl,
  designPreviewLabel,
  selectedProduct,
  setSelectedProduct,
  selectedPlacement,
  setSelectedPlacement,
  designScale,
  setDesignScale,
  designRotation,
  setDesignRotation,
  designNote,
  setDesignNote,
  designProductOptions,
  designPlacementOptions,
}: StorefrontDesignModalProps) => {
  if (!isDesignOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 p-4" onClick={() => setIsDesignOpen(false)}>
      <aside
        className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Tasarım Stüdyosu</h2>
            <p className="text-sm text-slate-500">Kendi tasarımınızı canlı önizleme ile hazırlayın.</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsDesignOpen(false)}>
            ×
          </Button>
        </div>

        <form onSubmit={handleDesignSubmit} className="grid gap-4 md:grid-cols-2">
          <label className="rounded-xl border border-dashed border-slate-300 p-4 text-center text-sm text-slate-600">
            Görsel Yükle
            <input
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              className="mt-2 block w-full text-xs"
              onChange={handleDesignFileChange}
            />
          </label>

          <div className="rounded-xl border border-slate-200 p-3">
            <img
              src={designPreviewUrl}
              alt="Tasarım önizleme"
              className="mx-auto h-48 max-w-full object-contain"
              style={{
                transform: `scale(${designScale / 100}) rotate(${designRotation}deg)`,
              }}
            />
            <p className="mt-2 text-xs text-slate-500">{designPreviewLabel}</p>
          </div>

          <label className="text-sm text-slate-600">
            Ürün
            <Select
              value={selectedProduct}
              onChange={(event) => setSelectedProduct(event.target.value)}
              className="mt-1"
              options={designProductOptions.map((option) => ({
                value: option.label,
                label: option.label,
              }))}
            />
          </label>

          <label className="text-sm text-slate-600">
            Konum
            <Select
              value={selectedPlacement}
              onChange={(event) => setSelectedPlacement(event.target.value)}
              className="mt-1"
              options={designPlacementOptions.map((option) => ({
                value: option.label,
                label: option.label,
              }))}
            />
          </label>

          <label className="text-sm text-slate-600">
            Boyut ({designScale}%)
            <input
              type="range"
              min={70}
              max={150}
              step={1}
              value={designScale}
              onChange={(event) => setDesignScale(Number(event.target.value))}
              className="mt-1 w-full"
            />
          </label>

          <label className="text-sm text-slate-600">
            Açı ({designRotation}°)
            <input
              type="range"
              min={-25}
              max={25}
              step={1}
              value={designRotation}
              onChange={(event) => setDesignRotation(Number(event.target.value))}
              className="mt-1 w-full"
            />
          </label>

          <label className="md:col-span-2 text-sm text-slate-600">
            Açıklama
            <Input
              type="text"
              value={designNote}
              onChange={(event) => setDesignNote(event.target.value)}
              className="mt-1"
              placeholder="Tasarımınız hakkında not ekleyin..."
            />
          </label>

          <div className="md:col-span-2 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={handleDesignReset}>
              Sıfırla
            </Button>
            <Button type="button" variant="secondary" onClick={() => setIsDesignOpen(false)}>
              İptal
            </Button>
            <Button type="submit">Tasarımı Gönder</Button>
          </div>
        </form>
      </aside>
    </div>
  );
};
