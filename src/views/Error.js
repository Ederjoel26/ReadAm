import '../styles/Error.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';

export const Error = () => {
    return(
        <div className="d-flex align-items-center bg-nf justify-content-center" style={{height:"100vh"}}>
            <div className="card text-center shadow-lg">
                <div className="card-body">
                <h1 className="font-roboto card-title">404</h1>
                <p className="h3 font-roboto p-2 card-text">Oops.. Esta página no ha sido encontrada.</p>
                <p className="h6">Esta página no parece existir.
                <br/> No te sientas mal, permitanos ayudarlo a volver a su camino.</p>
                <a type="button" className="btn btn-dark col-6 font-roboto mt-4 mb-5" href="/feed">Regresar a la página principal</a>
                </div>
            </div>
        </div>
    );  
}