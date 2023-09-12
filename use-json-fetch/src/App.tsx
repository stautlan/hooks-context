import './App.css'
import VerifyComponent from './components/VerifyComponent'
import withData, {DataComponent, ErrorComponent, LoadingComponent} from './components/withData'

function VerifyData({data}: any) {
  return (
    <div>

    </div>
  )
}

function App() {
  //const VerifyComponentData = withVerify(VerifyData, 'http://localhost:7070/data');
  //const VerifyComponentError = withVerify(VerifyData, 'http://localhost:7070/error');
  //const VerifyComponentLoading = withVerify(VerifyData, 'http://localhost:7070/loading');

  const DataContainer = withData(DataComponent);
  const ErrorContainer = withData(ErrorComponent);
  const LoadingContainer = withData(LoadingComponent);

  return (
    <div>
      {/* <VerifyComponent /> */}
      <h1>Data Container</h1>
      <DataContainer url='http://localhost:7070/loading' />
      <h1>Error Container</h1>
      <ErrorContainer url='http://localhost:7070/error' />
      <h1>Loading Container</h1>
      <LoadingContainer url='http://localhost:7070/data' />
    </div>
  )
}

export default App
