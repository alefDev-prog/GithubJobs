
export interface employerReducer{
    repoInfo: any[],
    currentRepo: object
}


export const initialValues: employerReducer =  {

    repoInfo: [],
    currentRepo: {},
}

export enum ActionKinds {
    SET_REPO_INFO = 'SET_REPO_INFO',
    SET_CURRENT_REPO = 'SET_CURRENT_REPO',
    
}

interface Action {
    type: ActionKinds,
    payload: any
}

export const reducer = (state: any = initialValues, action: Action) => {
    switch(action.type) {
        case "SET_CURRENT_REPO": 
            return {...state, passwordMessage: action.payload}
            break;
        case "SET_REPO_INFO":
            return {...state, usernameMessage: action.payload}
            break;
        
        default:
            return state;
    }
}


