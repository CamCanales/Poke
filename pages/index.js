import Link from 'next/link'

const Pokemon = ({pokemon}) =>{
   const id = pokemon.url.split('/').filter(x=>x).pop()
  return(
    <li><Link href={`/pokemones/${id}`}>{pokemon.name}</Link></li>
  )
}

export default function Pokemones({pokemones}) {
  console.log(pokemones)
  return (
    <div>
      <p>pokemones</p>
      <ul>
        {pokemones.map(pokemon => <Pokemon pokemon={pokemon} key={pokemon.name}></Pokemon>)}
      </ul>
    </div>
    
  )
}

//esta función "getStaticProps" permite generar una página estatica 
export const getStaticProps = async () =>{
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  const data = await response.json()

  //debe retornar si o si un objeto con la propiedad "props", sinó, no se asignará al Pokemones
  return{
    props: {pokemones: data.results}
  }
}