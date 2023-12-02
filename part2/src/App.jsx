import { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './Component/Note.jsx';
import noteService from './services/notes'
import personService from './services/persons'

// const App = () => {
//   const [notes, setNotes] = useState([])
//   const [newNote, setNewNote] = useState('') 
//   const [showAll, setShowAll] = useState(true);

//   const hook = () => {

//     // const eventHandler = response => {
//     //   console.log('promise fulfilled')
//     //   setNotes(response.data)
//     // }

//     noteService.getAll().then(initialNotes => {
//       console.log(initialNotes)
//       setNotes(initialNotes)
//     })

//   }

//   useEffect(hook, [])
//   // console.log('render', notes.length, 'notes')

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
//     }

//     noteService.create(noteObject).then(returnedNote => {
//       setNotes(notes.concat(returnedNote))
//       setNewNote('')  
//     })
//     // noteService.create(noteObject).then(response => {
//     //   console.log(response)
//     //   setNotes(notes.concat(response.data))
//     //   setNewNote('')  
//     // })
    
//   }

//   const toggleImportanceOf = (id) => {
//     // const url = `http://localhost:3001/notes/${id}`
//     const note = notes.find(n => n.id === id)
//     const changedNote = { ...note, important: !note.important }

//     noteService.update(id, changedNote).then(returnedNote => {
//       setNotes(notes.map(note => note.id !== id ? note : returnedNote))
//     })
//     .catch(error => {
//       alert(
//         `the note '${note.content}' was already deleted from server`
//       )
//       setNotes(notes.filter(n => n.id !== id))
//     })
//     // console.log(`Importance of ${id} needs to be toggled!`)
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
//         { notesToShow.map( (note,i) => <Note key={i} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>) }
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
  const [filteredList, setFilteredList] = useState(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const hook = () => {
    // console.log('Effect');

    // const handleData = (response) => {
    //   console.log(response)
    //   const data = response.data;
    //   setPersons(data);
    // }
    
    // const promise = axios.get('http://localhost:3001/persons');
    // promise.then( handleData )

    personService.getAllPersons().then(persons => setPersons(persons))
  }

  useEffect(hook, []);
  // console.log('render', persons, 'persons');

  const handleChangeName = event => setNewName(event.target.value);
  const handleChangeNumber = event => setNewNumber(event.target.value);

  const add = (event) => {

    event.preventDefault();
    const personObject = { 
      name: newName,
      number: newNumber,
    };
    
    const indexOfElement = persons.findIndex(person => person.name === personObject.name);
    if(confirm(`${personObject.name} is already added to phonebook, replace the old number with new one?`) && indexOfElement !== -1)
    {
     
      const updatedPersons = [...persons];
      updatedPersons[indexOfElement] = personObject;

      personService.updatePerson(persons[indexOfElement].id, personObject)
      .then(updatedPerson => {
              setPersons(updatedPersons);
              setNewName('');
              setNewNumber('');
            })
    }
    else if(indexOfElement === -1)
    {
      // axios.post('http://localhost:3001/persons', personObject).then(response => {
      //   console.log(response.data)
      //   setPersons([...persons, response.data]);
      // })
      personService.createPerson(personObject).then(addPerson => setPersons([...persons, addPerson]))
    }
    

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

  // Delete Phone Number
  const handleDelete = (id) => {
    const url = `http://localhost:3001/persons/${id}`
    const per = persons.find(p => p.id === id)

    if(confirm(`Are you sure to Delete ${per.name}`))
    {
      axios.delete(url).then(res => {
        const updatedPersons = persons.filter(p => p.id !== id);
        setPersons(updatedPersons);
      })
    }
    
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
      
      <Person persons={persons} handleDelete={handleDelete}/>
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

const Person = ({persons, handleDelete}) => {
 
  return (
    <div>
      {persons.map((person, i) => <div key={i}>{person.name} {person.number} <button onClick={() => handleDelete(person.id)}>Delete</button></div>)}
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