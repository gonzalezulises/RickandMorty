import Layout from "../components/Layout/Layout"
import Link from "next/link"


export default function Custom404() {
    
    
    return (
        <Layout>

            <div className="text-center">
                <h1 className="my-5">404 - Pagina no encontrada</h1>
                <Link href="/"><h2 className="btn btn-primary">Ir al inicio</h2></Link>
            </div>
        </Layout>
    )  
}