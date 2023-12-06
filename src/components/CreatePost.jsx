
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default function CreatePost(){
  const techTags = ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MySql"];

  const [isFormOpen, setIsFormOpen] = useState(false);

    const InitialData ={
        title: "",
        description:"",
        image: "",
        category: "", 
        tags: [],
      }


      const [postList, setPostList] = useState([]);
      // creo una variabile per l'edit
      // inizialmente non c'è alcun post in fase di modifica
      const [postToEdit, setPostToEdit] = useState(null);

      const [formData, setFormData] = useState(InitialData)
    
      // **********CREO I DATI**********
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

      
      // **********TAGS**********
      function handleTagToggle(tag) {
        // Clono l'array dei tag e controllo se il tag è già presente
        const updatedTags = formData.tags.includes(tag)
        // Rimuovo il tag se è già presente
          ? formData.tags.filter((t) => t !== tag) 
           // Aggiungo il tag se non è presente
          : [...formData.tags, tag];
      
        // Aggiorno la funzione createFormData con i nuovi tag
        createFormData(updatedTags, 'tags');
      }

     
      // **********EVENTO AL CLICK DEL PULSANTE **********
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
    
        // **********DELETE**********
        function removePost(idToRemove) {
          
          setPostList(postList.filter((post) => post.id !== idToRemove));
        }
    
        // **********UPDATE**********
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
              <input className="border px-3 py-1 w-full" type="text" name='title'  id="title_input"  value={formData.title}
              onChange={e=>createFormData(e.target.value,'title')}
                placeholder="Insersci un titolo..." />
            </div>
            {/* IMG */}
            <div>
              <label className="block font-bold mb-2" htmlFor="image_input">
                Image
              </label>
              <input
                className="border px-3 py-1 w-full "
                type="text"
                name="image"
                id="image_input"
                value={formData.image}
                onChange={(e) => createFormData(e.target.value, 'image')}
                placeholder="Inserisci l'URL dell'immagine..."
              />
            </div>
            {/* CATEGORY */}
            <div>
              <label className="block font-bold mb-2" htmlFor="category_select">
                Category
              </label>
              <select
                className="border px-3 py-1 w-full"
                name="category"
                id="category_select"
                value={formData.category}
                onChange={(e) => createFormData(e.target.value, 'category')}
              >
                <option value="">Seleziona una categoria</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Fullstack">Fullstack</option>
              </select>
            </div>

            {/* DESC */}
            <div>
              <label className=" block font-bold mb-2" htmlFor="description_input">
              Description
              </label>
              <input className="border px-3 py-6 w-full" type="text" name='description'  id="description_input"   value={formData.description}
            onChange={e=>createFormData(e.target.value,'description')}
              placeholder="Insersci una descrizione..." />
            </div>
            
            {/* TAGS */}
            <div>
              <label className="block font-bold mb-2">Tags</label>
              <div>
                {techTags.map((tag) => (
                  <label key={tag} className="mr-2 ">
                    <input
                   
                      type="checkbox"
                      name={tag}
                      checked={formData.tags.includes(tag)}
                      onChange={() => handleTagToggle(tag)}
                    />
                 
                   {tag}
                    
                  </label>
                ))}
              </div>
</div>

    
         {/* **PULSANTE */}
            <button type="submit" className={`${postToEdit ? 'border-blue-600 bg-blue-600 text-white ' : 'border-green-300 bg-green-300  text-black'}  py-2 px-4 uppercase rounded-full max-w-xs`}>
              {postToEdit ? 'Edit' : 'Create'}
            </button>
        
          </form>
          )
          :  
          (
            <div className="flex justify-center" onClick={() => setIsFormOpen(true)}>
            <button className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto">+  Add post</button>
            </div>
           
          )}
    
    
          <div className='my-52'>
              <h1 className='font-bold text-center'>I miei post</h1>
              <div className='grid grid-cols-3 gap-10 my-10 '>
                {postList.map((post) => (
                <div className=" bg-zinc-50 shadow-lg rounded ">
    
                <div className="p-4 bg-zinc-50 ">
                  
                    {/* img */}
                    <img
                        src={post.formData.image}
                        alt="Post Image"
                        className="my-2 max-h-52 object-cover w-full"
                      />
                      {/* title */}
                    <h2 key={post.id} className="text-xl font-semibold text-gray-800"> {post.formData.title}</h2>
                      {/* category */}
                      <p className="text-emerald-500 font-bold mt-2">Category: {post.formData.category}</p>
                      {/* desc */}
                      <p className="text-gray-600 mt-2">{post.formData.description}</p>
                      {/* tags */}
                      <div className="flex flex-wrap gap-2">
                        {post.formData.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-bold text-black"
                          >
                            # {tag}
                          </span>
                        ))}
                      </div>
               
            
                </div>
                {/* buttons */}
                <div className='flex'>
                <button
                className="flex items-center justify-center rounded-lg p-3 m-3 text-l bg-red-500 text-white "
                onClick={() => removePost(post.id)}
                >
              <i class="fa-solid fa-trash-can"></i>
                </button>

                <button
                className="flex items-center justify-center rounded-lg p-3 m-3 text-l bg-green-500 text-white "
                onClick={() => editPost(post.id)}
                >
              <i class="fa-solid fa-pen-to-square"></i>
                </button>
                </div>
             
            </div>
            
                ))}
              </div>
              
    
    
            </div>
        </div>
</>    
)}