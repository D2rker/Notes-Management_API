const BASE_URL = 'http://localhost:3000/api/notes';

/**
 * Fetches all notes from the server.
 * @returns {Promise<Array>} A promise that resolves to an array of notes.
 */
export const getNotes = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error; // Re-throw to allow caller to handle
  }
};

/**
 * Creates a new note.
 * @param {object} note - The note object to create.
 * @param {string} note.title - The title of the note.
 * @param {string} note.content - The content of the note.
 * @returns {Promise<object>} A promise that resolves to the created note object.
 */
export const createNote = async (note) => {
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
    return await response.json();
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

/**
 * Updates an existing note.
 * @param {string} id - The ID of the note to update.
 * @param {object} note - The note object with updated data.
 * @returns {Promise<object>} A promise that resolves to the updated note object.
 */
export const updateNote = async (id, note) => {
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
    return await response.json();
  } catch (error) {
    console.error(`Error updating note ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a note by its ID.
 * @param {string} id - The ID of the note to delete.
 * @returns {Promise<object>} A promise that resolves to a confirmation message.
 */
export const deleteNote = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error deleting note ${id}:`, error);
    throw error;
  }
};
