import React, { useEffect, useMemo, useState } from 'react';
import { getRamadanData, saveRamadanData, updateRamadanDay } from '../../services/ramadanService';
import './RamadanTracker.css';

const createDates = () => {
  const list = [];
  const start = new Date(2026, 1, 19);
  const end = new Date(2026, 2, 19);

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const label = `${dd}/${mm}`;
    const key = `${dd}-${mm}`; // Firebase keys cannot contain '/'
    list.push({ key, label });
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

  const toggleDay = async (dateObj) => {
    const { key } = dateObj;
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
    <div className="ramadan-wrap">
      <div className="ramadan-card">
        <div className="ramadan-head">
          <div>
            <h2>Ramadan Tracker</h2>
            <p>Synced with Firebase • range 19/02 → 19/03</p>
          </div>
          <div className="ramadan-buttons">
            <button onClick={() => markAll(true)}>Mark all ✅</button>
            <button className="danger" onClick={() => markAll(false)}>Clear all</button>
          </div>
        </div>

        <div className="ramadan-stats">
          <div><strong>{total}</strong><span>Total</span></div>
          <div><strong>{doneCount}</strong><span>Done</span></div>
          <div><strong>{left}</strong><span>Left</span></div>
          <div><strong>{percent}%</strong><span>Progress</span></div>
        </div>

        {loading ? (
          <div className="ramadan-loading">Loading…</div>
        ) : (
          <div className="ramadan-grid">
            {dates.map((d) => (
              <button
                key={d.key}
                className={`day-btn ${days[d.key] ? 'done' : ''}`}
                onClick={() => toggleDay(d)}
              >
                <span>{d.label}</span>
                <span>{days[d.key] ? '✅' : '⬜'}</span>
              </button>
            ))}
          </div>
        )}

        <div className="ramadan-foot">
          <span>{saving ? 'Saving to Firebase…' : 'All changes synced.'}</span>
        </div>
      </div>
    </div>
  );
};

export default RamadanTracker;
