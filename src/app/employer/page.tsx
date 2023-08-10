import { repoInfo } from "@/interfaces/interface";
import fetchRepositories from "./utils/fetchRepos";
import JobForm from "./components/jobForm";
import getCookieData from "@/globalUtils/getCookieData";

export default async function Employer() {
    
    //const [values, dispatch] = useReducer<(state: employerReducer, action: Action) => any>(employerReducer, initialValues);


    const repos = await fetchRepositories();
    
    
   if(repos) {
    const githubURL = getCookieData().url; 
        return (
            <main className="container-xl">
                <div className="row">
            
        
                    <JobForm repos={repos} githubURL={githubURL}/>
                </div>
            </main>
        )
   }
   else return (
    <h1>Error</h1>
   )
    
}
    



