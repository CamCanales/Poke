import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

//2 - LUEGO LE PASA LOS DATOS AL COMPONENTE
//3 - GENERA EL HTML Y LE DEVUELVE LOS DATOS AL USUARIO
const Pokemon = ({data}) =>{
    const router = useRouter()
    console.log(router)

    return(
        <div>
            <h1>{data.name} número #{data.id}</h1>
            <Image src={data.sprites.front_default} width={400} height={400}></Image>
            <Link href='/'>volver al inicio</Link>
        </div>
    )
}

export default Pokemon

export const getStaticProps = async({params}) =>{
    const response = await fetch(`http://pokeapi.co/api/v2/pokemon/${params.id}`)
    const data = await response.json()

    return {props: {data}}
}

export const getStaticPaths= async() =>{
    //si "fallback:false" NEXT JS solo generará el html para las rutas indicadas en la constante paths
    //si "fallback:true" intentará renderizar el componente de manera "lazy"
    const paths = [
        { params: { id: '1'}}, 
        { params: { id: '2'}},
    ]
    return{
        paths,
        fallback:'blocking',
    }
}

/*
//getServerSideProps 
//1 - SE EJECUTA PRIMERO EN EL SERVIDOR, LUEGO LE PASA LOS DATOS AL COMPONENTE
//generando contenido en el server, SSR (SERVER SIDE RENDERING)
export const getServerSideProps = async({params}) =>{
    const response = await fetch(`http://pokeapi.co/api/v2/pokemon/${params.id}`)
    const data = await response.json()

    return {props: {data}}
}
*/