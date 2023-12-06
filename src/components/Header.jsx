export default function Header(){
    const links = [
        {
          label: 'Home',
          url: '#'
        },
        {
          label: 'Posts',
          url: '#'
        },
        {
          label: 'Chi Siamo',
          url: '#'
        },
        {
          label: 'Contatti',
          url: '#'
        },
      ];
    return(
        <header className="py-4 text-center text-xl font-semibold bg-gray-900 text-white">
        
        

      <ul className="flex justify-center space-x-8">
        {
          // Return esplicito
          links.map((link, i) => {
            return <li key={i}><a href="#">{link.label}</a></li>;
          })
        }
      </ul>
        
        </header> 
    )
}