"use client";

import { Dispatch} from "react";
import { Action, ActionKinds } from "./reducer";

export default function Repo({repository, setCurrentRepo}:{repository:any, setCurrentRepo: Dispatch<Action>}) {
    function handleClick() {
        setCurrentRepo({type: ActionKinds.SET_CURRENT_REPO, payload: repository});
    }
    return (
        <div className="list-group-item list-group-item-action" onClick={handleClick}>{repository.name}</div>
    )
}