let notes = [
  {
    id: 1,
    title: "first note",
    content: "My first note is here.",
  },
];

export const list = () => {
  return notes.map(({ id, title, content }) => ({
    id,
    title,
    content,
  }));
};

// READ (Get one)
export const get = (id) => notes.find(note => note.id === parseInt(id));

// CREATE
export const create = (title, content) => {
  const newNote = { id: notes.length + 1, title, content };
  notes.push(newNote);
  return newNote;
};

// UPDATE
export const update = (id, title, content) => {
  const index = notes.findIndex(note => note.id === parseInt(id));
  if (index !== -1) {
    notes[index] = { ...notes[index], title, content };
    return notes[index];
  }
  return null;
};

// DELETE
export const remove = (id) => {
  const index = notes.findIndex(note => note.id === parseInt(id));
  if (index !== -1) {
    return notes.splice(index, 1);
  }
  return null;
};