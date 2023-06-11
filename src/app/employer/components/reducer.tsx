
export interface employerReducer{
    repoInfo: any[],
    currentRepo: any,
    newJob?: {
        title:string,
        description:string,
        payment: string,
        period: string,
        salary: number
    },
    
}


export const initialValues: employerReducer =  {

    repoInfo: [],
    currentRepo: {},
}

export enum ActionKinds {
    SET_REPO_INFO = 'SET_REPO_INFO',
    SET_CURRENT_REPO = 'SET_CURRENT_REPO',
    SET_JOB_TITLE = 'SET_JOB_TITLE',
    SET_JOB_DESCRIPTION = 'SET_JOB_DESCRIPTION',
    SET_JOB_PAYMENT = 'SET_JOB_PAYMENT', 
    SET_JOB_PERIOD = 'SET_JOB_PERIOD',
    SET_JOB_SALARY = 'SET_JOB_SALARY' 
    
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
        case "SET_JOB_TITLE":
            return {...state, newJob: {title: action.payload, ...state.newJob}}
            break;
        case "SET_JOB_DESCRIPTION":
            return {...state, newJob: {description: action.payload, ...state.newJob}}
            break;
        case "SET_JOB_PAYMENT":
            return {...state, newJob: {payment: action.payload, ...state.newJob}}
            break;
        case "SET_JOB_PERIOD":
            return {...state, newJob: {period: action.payload, ...state.newJob}}
            break;
        case "SET_JOB_SALARY":
            return {...state, newJob: {salary: action.payload, ...state.newJob}}
            break;
    
        
        default:
            return state;
    }
}


