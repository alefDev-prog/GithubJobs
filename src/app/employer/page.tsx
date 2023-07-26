import { useAuth } from "@/context/AuthContext";
import { Octokit } from "@octokit/rest";
import { useEffect, useReducer, Key } from "react";
import Repo from "./components/repo";
import { employerReducer, ActionKinds, initialValues, Action } from "./components/reducer";
import JobForm from "./components/jobForm";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { encryptedData, filteredRepo } from "@/interfaces/interface";
import { decrypt } from "../crypto/funcs";
import fetchRepositories from "./utils/fetchRepos";

export default async function Employer() {
    
    //const [values, dispatch] = useReducer<(state: employerReducer, action: Action) => any>(employerReducer, initialValues);


    const repos = await fetchRepositories() as filteredRepo[];
    
    console.log(repos);

    return (
        <h1>Employer</h1>
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
    



