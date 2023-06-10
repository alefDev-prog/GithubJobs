
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

export interface Action {
    type: ActionKinds,
    payload: any
}

export const employerReducer = (state: any = initialValues, action: Action) => {
    switch(action.type) {
        case "SET_CURRENT_REPO": 
            return {...state, currentRepo: action.payload}
            break;
        case "SET_REPO_INFO":
            return {...state, repoInfo: action.payload}
            break;
        
        default:
            return state;
    }
}


