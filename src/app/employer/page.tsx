import { repoInfo } from "@/interfaces/interface";
import fetchRepositories from "./utils/fetchRepos";
import JobForm from "./components/jobForm";

export default async function Employer() {
    
    //const [values, dispatch] = useReducer<(state: employerReducer, action: Action) => any>(employerReducer, initialValues);


    const repos = await fetchRepositories();
    console.log(repos);
    
   if(repos) {
        return (
            <main className="container-xl">
                <div className="row">
            
        
                    <JobForm repos={repos} />
                </div>
            </main>
        )
   }
   else return (
    <h1>Error</h1>
   )
    
    
        
 


    /*

    return (
        <main className="container-xl">
            <div className="row">

                {/* The selection of repo 
                <div className="col">
                    <div className="card border-1">
                        <div className="card-header">
                            <h3 className="card-title">Your repositories</h3>
                        </div>
                        <button onClick={() => console.log(values.currentRepo)}>check</button>
                        <div className="list-group" style={{maxHeight: "300px", overflowY:"scroll"}}>

                            {values.repoInfo.map((obj: object, index: Key | null | undefined): React.ReactNode => {
                                return <Repo repository={obj} setCurrentRepo={dispatch} key={index}/>
                            })}
                        </div>
                    </div>  
                </div>

                
                <JobForm values={values} />
                        
            </div>
        </main>
        
        
    );
*/}
    



