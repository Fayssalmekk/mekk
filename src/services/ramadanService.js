import { database } from '../firebase';
import { ref, get, set, update } from 'firebase/database';

const RAMADAN_PATH = 'ramadan_tracker_2026';

export const getRamadanData = async () => {
  try {
    const snapshot = await get(ref(database, RAMADAN_PATH));
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error fetching Ramadan tracker data:', error);
    return null;
  }
};

export const saveRamadanData = async (days) => {
  try {
    await set(ref(database, RAMADAN_PATH), {
      days,
      updatedAt: Date.now(),
    });
    return true;
  } catch (error) {
    console.error('Error saving Ramadan tracker data:', error);
    return false;
  }
};

export const updateRamadanDay = async (dateKey, value) => {
  try {
    await update(ref(database, RAMADAN_PATH), {
      [`days/${dateKey}`]: value,
      updatedAt: Date.now(),
    });
    return true;
  } catch (error) {
    console.error('Error updating Ramadan day:', error);
    return false;
  }
};
