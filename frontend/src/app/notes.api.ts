const BASE_URL = 'http://localhost:3000/api/notes';

/**
 * Fetches all notes from the server.
 */
export const getNotes = async (): Promise<any[]> => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

/**
 * Creates a new note.
 */
export const createNote = async (note: { title: string; content: string }): Promise<any> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch (e) {
      return { message: text }; // Fallback if backend returns plain text
    }
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

/**
 * Updates an existing note.
 */
export const updateNote = async (id: string, note: { title: string; content: string }): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch (e) {
      return { message: text };
    }
  } catch (error) {
    console.error(`Error updating note ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a note by its ID.
 */
export const deleteNote = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch (e) {
      return { message: text };
    }
  } catch (error) {
    console.error(`Error deleting note ${id}:`, error);
    throw error;
  }
};