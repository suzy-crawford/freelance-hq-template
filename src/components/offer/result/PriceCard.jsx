import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatMoney } from "@/lib/offerData";

export default function PriceCard({ offer, onOfferUpdate }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(String(offer.price || 0));
  const [saving, setSaving] = useState(false);

  const startEdit = () => {
    setValue(String(offer.price || 0));
    setEditing(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const updated = await base44.entities.Offer.update(offer.id, { price: Number(value) || 0 });
      onOfferUpdate(updated);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-5 rounded-xl bg-app-surface p-5">
      {!editing ? (
        <>
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-3xl font-semibold text-app-text">{formatMoney(offer.price)}</div>
              <div className="text-app-muted text-sm">per month</div>
            </div>
            <Button variant="outline" className="rounded-full border-app-border text-app-text" onClick={startEdit}>
              Edit price
            </Button>
          </div>
          <div className="mt-4 text-sm text-app-muted">
            Starting recommendation: {formatMoney(offer.price_low)} to {formatMoney(offer.price_high)}
          </div>
          <ul className="mt-2 space-y-1 text-sm text-app-muted">
            {(offer.price_reasons || []).map((reason, i) => (
              <li key={i}>- {reason}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-app-muted">
            This is an illustrative starting price, not an industry average. You can change it any time.
          </p>
        </>
      ) : (
        <div>
          <label className="text-sm font-medium text-app-text">Monthly price</label>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1 h-11 max-w-[200px]"
          />
          <div className="flex gap-2 mt-3">
            <Button className="rounded-full" onClick={save} disabled={saving}>
              Save
            </Button>
            <Button variant="outline" className="rounded-full border-app-border text-app-text" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}