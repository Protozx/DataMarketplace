
import NavBar from './NavBar';
import DatasetPage from './DatasetPage';
import DatasetView from './DatasetView';
import LoginForm from './LoginForm';
import Message from './Message';

const dataset = {
  comments: [
      {
          id: 1,
          author: "María López",
          content: "Excelente conjunto de datos, muy útil para mi proyecto.",
          date: "2024-05-01",
      },
      {
          id: 2,
          author: "Carlos García",
          content: "Encontré algunos valores faltantes que podrían corregirse.",
          date: "2024-05-03",
      },
  ],
};

function App(){
  return (<div className='container-fluid ms-0 '><NavBar /><DatasetView datasetName="Pinguinos en la isla"
    author="Juan Pérez"
    lastUpdated="15 de octubre de 2023"
    description="Este dataset contiene información sobre ventas de productos en el último año."
    grafic='images\vd.PNG'
    statistics='images\xolo.jpg'
    comments={dataset.comments}
    
    />
    
    
    </div>
      
  );
}


export default App;