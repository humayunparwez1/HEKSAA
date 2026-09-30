const DB_NAME = "heksaa-report-db";
const STORE_NAME = "reports";
const REPORT_KEY = "current-report";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

/**
 * Store the actual uploaded medical report.
 *
 * The file is kept in IndexedDB rather than localStorage
 * because medical reports can be much larger than the
 * localStorage storage limit.
 */
export async function saveReportFile(
  file: File
): Promise<boolean> {
  try {
    const db = await openDatabase();

    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(
        STORE_NAME,
        "readwrite"
      );

      const store = transaction.objectStore(STORE_NAME);

      store.put(file, REPORT_KEY);

      transaction.oncomplete = () => {
        db.close();
        resolve(true);
      };

      transaction.onerror = () => {
        db.close();
        reject(transaction.error);
      };
    });
  } catch (error) {
    console.error(
      "HEKSAA: Failed to store report file:",
      error
    );

    return false;
  }
}

/**
 * Retrieve the actual uploaded medical report.
 */
export async function getReportFile(): Promise<File | null> {
  try {
    const db = await openDatabase();

    return await new Promise((resolve, reject) => {
      const transaction = db.transaction(
        STORE_NAME,
        "readonly"
      );

      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(REPORT_KEY);

      request.onsuccess = () => {
        db.close();

        const file = request.result;

        if (!file) {
          resolve(null);
          return;
        }

        resolve(file as File);
      };

      request.onerror = () => {
        db.close();
        reject(request.error);
      };
    });
  } catch (error) {
    console.error(
      "HEKSAA: Failed to retrieve report file:",
      error
    );

    return null;
  }
}

/**
 * Delete the currently stored report.
 */
export async function clearReportFile(): Promise<void> {
  try {
    const db = await openDatabase();

    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(
        STORE_NAME,
        "readwrite"
      );

      const store = transaction.objectStore(STORE_NAME);

      store.delete(REPORT_KEY);

      transaction.oncomplete = () => {
        db.close();
        resolve();
      };

      transaction.onerror = () => {
        db.close();
        reject(transaction.error);
      };
    });
  } catch (error) {
    console.error(
      "HEKSAA: Failed to clear report file:",
      error
    );
  }
}
