
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function CreatePost(){

  const [isFormOpen, setIsFormOpen] = useState(false);

    const InitialData ={
        title: "",
        description:""
      }


      const [postList, setPostList] = useState([]);
      // creo una variabile per l'edit
      // inizialmente non c'è alcun post in fase di modifica
      const [postToEdit, setPostToEdit] = useState(null);

      const [formData, setFormData] = useState(InitialData)
    
      function createFormData(newValue,fieldName) {
        // clono l'oggetto form data
        const newFormData={...formData};
        // aggiorno fieldName con newVlaue
        newFormData[fieldName]= newValue;
        // passo l'oggetto modificato a setFormData
        setFormData(newFormData);
    
        // ******VERSIONE COMPATTA******
        // setFormData({
        //   ...formData,
        //   [fieldName]:newValue,
        // })
      }
    

      // l'evento al click del pulsante

      function handleFormSubmit(e) {
        // evita il caricamento di default della pagina
        e.preventDefault();
        // se il post esiste già
        if (postToEdit) {
          const updatedPostList = postList.map((post) =>
          // verifico se l'ID corrisponde all'ID del post che sto modificando
            post.id === postToEdit.id 
            // Se sì, restituisci un nuovo oggetto con i dati del form aggiornati
            ? { ...post, formData } 
             // Se no, restituisci il post inalterato
            : post
          );
      
          // Aggiorno lo stato dell'elenco dei post
          setPostList(updatedPostList);
      
          // Resetto lo stato del form e di postToEdit
          setFormData(InitialData);
          setPostToEdit(null);
      
          
          setIsFormOpen(false);

        } else {
        // aggiungo il titolo alla lista 
        const newPostList =[...postList,
          {
            formData, 
            id: uuidv4(),
            createAt: new Date(),}];
        // aggiorno lo state
        setPostList(newPostList)
    
          // ******VERSIONE COMPATTA******
          // setPostList([...postList,{
          //   ...formData, 
          //    id: uuidv4(), 
          // }]);
    
          // resetto i campi
    
          setFormData(InitialData);

          // chiudi il modulo di inserimento
          setIsFormOpen(false);
        
        }}
    
        function removePost(idToRemove) {
          
          setPostList(postList.filter((post) => post.id !== idToRemove));
        }
    

        function editPost(idToUpdate) {
          
          // cerco il post per id 
          const postToEdit = postList.find((post) => post.id === idToUpdate);
          // se il post da modificare esiste
          if (postToEdit) {
            // apro il form
            setIsFormOpen(true)
            // me lo mostra nel form
            setFormData(postToEdit.formData);
            // aggiorno lo stato dell'elemento da modificare
            setPostToEdit(postToEdit);
          }
        }
      return (
        <>
        <div className='container mx-auto'>
        {isFormOpen ? (
           
          <form className='flex flex-col gap-4 mx-auto' onSubmit={handleFormSubmit}>
            <h1 className='font-bold mt-6'>Crea il tuo post</h1>
            {/* NAME */}
            <div>
              <label className=" block font-bold mb-2" htmlFor="title_input">
          Title
              </label>
              <input className="border px-3 py-4 w-full" type="text" name='title'  id="title_input"  value={formData.title}
              onChange={e=>createFormData(e.target.value,'title')}
                placeholder="Insersci un titolo..." />
            </div>
    
            {/* DESC */}
            <div>
              <label className=" block font-bold mb-2" htmlFor="description_input">
              Description
              </label>
              <input className="border px-3 py-4 w-full" type="text" name='description'  id="description_input"   value={formData.description}
            onChange={e=>createFormData(e.target.value,'description')}
              placeholder="Insersci una descrizione..." />
            </div>
    
         {/* **PULSANTE */}
            <button type="submit" className={`bg-${postToEdit ? 'green' : 'yellow'}-500 text-white py-2 px-4 uppercase rounded-full max-w-xs`}>
              {postToEdit ? 'Edit' : 'Create'}
            </button>
        
          </form>
          )
          :  
          (
            <div onClick={() => setIsFormOpen(true)}>
            <button className="flex items-center justify-center rounded-lg px-2 m-3 text-l bg-blue-500 text-white ">+  Add post</button>
            </div>
           
          )}
    
    
          <div className='border-t my-10' >
              
              <div className='grid grid-cols-3 gap-10 my-10'>
                {postList.map((post) => (
                <div className=" bg-zinc-50 shadow-lg rounded-lg">
    
                <div className="p-4 bg-zinc-50">
                <h2 key={post.id} className="text-xl font-semibold text-gray-800"> {post.formData.title}</h2>
                  <p className="text-gray-600 mt-2">{post.formData.description}</p>
              
               
            
                </div>

                <div className='flex'>
                <button
                className="flex items-center justify-center rounded-lg px-2 m-3 text-l bg-red-500 text-white "
                onClick={() => removePost(post.id)}
                >
               Delete
                </button>

                <button
                className="flex items-center justify-center rounded-lg px-2 m-3 text-l bg-green-500 text-white "
                onClick={() => editPost(post.id)}
                >
              Edit
                </button>
                </div>
             
            </div>
            
                ))}
              </div>
              
    
    
            </div>
        </div>
</>    
)}