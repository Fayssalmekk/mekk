import React, { useEffect, useMemo, useState } from 'react';
import { getRamadanData, saveRamadanData, updateRamadanDay } from '../../services/firebaseService';
import './RamadanTracker.css';

const createDates = () => {
  const list = [];
  const start = new Date(2026, 1, 19);
  const end = new Date(2026, 2, 19);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    list.push({
      key: `${dd}-${mm}`,
      label: `${dd}/${mm}`,
    });
  }

  return list;
};


const dates = createDates();

const RamadanTracker = () => {
  const [days, setDays] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const fromDb = await getRamadanData();
      const base = {};
      dates.forEach((d) => {
        base[d.key] = !!(fromDb && fromDb.days && fromDb.days[d.key]);
      });
      setDays(base);
      setLoading(false);
    };

    load();
  }, []);

  const doneCount = useMemo(() => dates.filter((d) => days[d.key]).length, [days]);
  const total = dates.length;
  const left = total - doneCount;
  const percent = Math.round((doneCount / total) * 100);

  const toggleDay = async ({ key }) => {
    const next = !days[key];
    setDays((prev) => ({ ...prev, [key]: next }));
    setSaving(true);

    const ok = await updateRamadanDay(key, next);
    if (!ok) {
      setDays((prev) => ({ ...prev, [key]: !next }));
      alert('Could not save to Firebase. Check rules/connection.');
    }

    setSaving(false);
  };

  const markAll = async (value) => {
    const payload = {};
    dates.forEach((d) => {
      payload[d.key] = value;
    });

    setDays(payload);
    setSaving(true);

    const ok = await saveRamadanData(payload);
    if (!ok) {
      alert('Could not save to Firebase. Check rules/connection.');
    }

    setSaving(false);
  };

  return (
    <div className="container py-3 py-md-4 ramadan-page">
      <div className="card ramadan-card shadow-sm">
        <div className="card-body p-3 p-md-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
            <div>
              <h2 className="h4 mb-1 text-white">Ramadan Tracker</h2>
              <p className="mb-0 text-light small">Synced with Firebase • range 19/02 → 19/03</p>
            </div>

            <div className="d-grid d-sm-flex gap-2 w-100 w-md-auto">
              <button type="button" className="btn btn-success" onClick={() => markAll(true)}>
                Mark all ✅
              </button>
              <button type="button" className="btn btn-outline-danger" onClick={() => markAll(false)}>
                Clear all
              </button>
            </div>
          </div>

          <div className="row g-2 g-md-3 mb-3">
            <div className="col-6 col-md-3">
              <div className="stat-box rounded p-2 p-md-3 h-100">
                <div className="h5 mb-0 text-white">{total}</div>
                <small className="text-light">Total</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-box rounded p-2 p-md-3 h-100">
                <div className="h5 mb-0 text-white">{doneCount}</div>
                <small className="text-light">Done</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-box rounded p-2 p-md-3 h-100">
                <div className="h5 mb-0 text-white">{left}</div>
                <small className="text-light">Left</small>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-box rounded p-2 p-md-3 h-100">
                <div className="h5 mb-0 text-white">{percent}%</div>
                <small className="text-light">Progress</small>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-light">Loading…</div>
          ) : (
            <div className="row g-2">
              {dates.map((d) => (
                <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={d.key}>
                  <button
                    type="button"
                    className={`btn w-100 day-btn ${days[d.key] ? 'done' : ''}`}
                    onClick={() => toggleDay(d)}
                  >
                    <span>{d.label}</span>
                    <span>{days[d.key] ? '✅' : '⬜'}</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 small text-light">
            {saving ? 'Saving to Firebase…' : 'All changes synced.'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RamadanTracker;
