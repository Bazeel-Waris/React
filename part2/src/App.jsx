import { useState, useEffect } from 'react';
import axios from 'axios';
// import Note from './Component/Note.jsx';

// const App = () => {
//   const [notes, setNotes] = useState([])
//   const [newNote, setNewNote] = useState('a new note...') 
//   const [showAll, setShowAll] = useState(true);

//   const hook = () => {

//     console.log('effect')
    
//     const eventHandler = response => {
//       console.log('promise fulfilled')
//       setNotes(response.data)
//     }

//     const promise = axios.get('http://localhost:3001/notes')
//     promise.then(eventHandler)

//   }

//   useEffect(hook, [])
//   console.log('render', notes.length, 'notes')
//   const notesToShow = showAll ? notes : notes.filter( note => note.important === true);

//   const handleNoteChange = (event) => {
//     console.log(event.target.value)
//     setNewNote(event.target.value)
//   }

//   const addNote = (event) => {
//     event.preventDefault();
//     const noteObject = {
//       content: newNote,
//       important: Math.random() < 0.5,
//       id: notes.length + 1,
//     }

//     setNotes(notes.concat(noteObject))
//     setNewNote('')  
//   }
//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all' }
//         </button>
//       </div>
//       <ul>
//         { notesToShow.map( note => <Note key={note.id} note={note} />) }
//       </ul>
//       <form onSubmit={addNote}>
//         <input value={newNote} onChange={handleNoteChange}/>
//         <button type='submit'>Save</button>
//       </form>
//     </div>
//   )
// }
// export default App

// -----------------------

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredList, setFilteredList] = new useState(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const hook = () => {
    console.log('Effect');

    const handleData = (response) => {
      console.log(response)
      const data = response.data;
      setPersons(data);
    }
    const promise = axios.get('http://localhost:3001/persons');
    promise.then( handleData )
  }

  useEffect(hook, []);
  console.log('render', persons, 'persons');

  const handleChangeName = event => setNewName(event.target.value);
  const handleChangeNumber = event => setNewNumber(event.target.value);

  const add = (event) => {
    
    event.preventDefault();
    const personObject = { 
      name: newName,
      number: newNumber,
    };
    
    const p = persons.map(per => JSON.stringify(per));
  
    if(p.includes(JSON.stringify(personObject)))
      alert(`${personObject.name} is already added to Phone Book`);
    else
      setPersons([...persons, personObject]);

    setNewName('');
    setNewNumber('');

  }

  const filterBySearch = (event) => {
    
    const query = event.target.value;
    var updatedList = [...persons];
    
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  
    setFilteredList(updatedList);

  }

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
      Search: <input onChange={filterBySearch}/>
      <ol>
        {filteredList.map((item, i) => (
          <li key={i}>{item.name}</li>
        ))}
      </ol>
    </div>

      <h2>Add a New</h2>

      <PersonForm add={add} newName={newName} newNumber={newNumber} handleChangeName={handleChangeName} handleChangeNumber={handleChangeNumber}/>

      <h2>Numbers</h2>
      
      <Person persons={persons}/>
    </div>
  )
}

export default App

const PersonForm = ({add, newName, newNumber, handleChangeName, handleChangeNumber}) => {
  return (
    <div>
      <form onSubmit={add}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={ handleChangeNumber }/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}
const Person = ({persons}) => {
  return (
    <div>

      {persons.map((person, i) => <div key={i}>{person.name} {person.number}</div>)}
    </div>
  )
}


// -----------------------------------------------------------------------------------
// const App = () => {
//   const courses = [
//     {
//       name: 'Half Stack application development',
//       id: 1,
//       parts: [
//         {
//           name: 'Fundamentals of React',
//           exercises: 10,
//           id: 1
//         },
//         {
//           name: 'Using props to pass data',
//           exercises: 7,
//           id: 2
//         },
//         {
//           name: 'State of a component',
//           exercises: 14,
//           id: 3
//         },
//         {
//           name: 'Redux',
//           exercises: 11,
//           id: 4
//         }
//       ]
//     }, 
//     {
//       name: 'Node.js',
//       id: 2,
//       parts: [
//         {
//           name: 'Routing',
//           exercises: 3,
//           id: 1
//         },
//         {
//           name: 'Middlewares',
//           exercises: 7,
//           id: 2
//         }
//       ]
//     }
//   ]
//   return <Course courses={courses} />
// }

// export default App