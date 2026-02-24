import { database } from '../firebase';
import { ref, set, get, update } from 'firebase/database';

const CV_DATA_PATH = 'cv_data';
const RAMADAN_PATH = 'ramadan_tracker_2026';

// Get CV data from Firebase (one-time read)
export const getCVData = async () => {
  try {
    const dbRef = ref(database, CV_DATA_PATH);
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error) {
    console.error('Error fetching CV data:', error);
    return null;
  }
};

// Save entire CV data to Firebase
export const saveCVData = async (data) => {
  try {
    const dbRef = ref(database, CV_DATA_PATH);
    await set(dbRef, data);
    return true;
  } catch (error) {
    console.error('Error saving CV data:', error);
    return false;
  }
};

// Update specific field in CV data
export const updateCVData = async (field, value) => {
  try {
    await update(ref(database, CV_DATA_PATH), { [field]: value });
    return true;
  } catch (error) {
    console.error('Error updating CV data:', error);
    return false;
  }
};

// Listen to real-time changes (placeholder for future use)
export const onCVDataChange = (callback) => {
  try {
    const unsubscribe = () => {};
    return unsubscribe;
  } catch (error) {
    console.error('Error setting up listener:', error);
  }
};

// ------------------------------
// Ramadan tracker (shared)
// ------------------------------

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
