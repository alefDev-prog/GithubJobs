import { repoInfo } from "@/interfaces/interface";
import fetchRepositories from "./utils/fetchRepos";
import JobForm from "./components/jobForm";

export default async function Employer() {
    
    //const [values, dispatch] = useReducer<(state: employerReducer, action: Action) => any>(employerReducer, initialValues);


    const repos = await fetchRepositories();
   
    
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
    
}
    



