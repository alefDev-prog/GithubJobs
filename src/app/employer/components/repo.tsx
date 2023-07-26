"use client";

import { Dispatch, SetStateAction} from "react";
import { repoInfo } from "@/interfaces/interface";

export default function Repo({repository, setCurrentRepo}:{repository:any, setCurrentRepo: Dispatch<SetStateAction<repoInfo | undefined>>}) {
    function handleClick() {
        setCurrentRepo(repository);
    }
    return (
        <div className="list-group-item list-group-item-action" onClick={handleClick}>{repository.name}</div>
    )
}