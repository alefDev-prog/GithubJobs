


export enum actionKind {
    OPEN_APPROVE_MODAL = 'OPEN_APPROVE_MODAL',
    CLOSE_APPROVE_MODAL = 'CLOSE_APPROVE_MODAL',
    OPEN_REQUEST_MODAL = 'OPEN_REQUEST_MODAL',
    CLOSE_REQUEST_MODAL = 'CLOSE_REQUEST_MODAL',
}

export interface jobControlState {
    showApproveModal: boolean,
    showRequestModal: boolean,
}

export interface jobControlAction {
    type: actionKind,
    payload?: any
}

export const initialValues: jobControlState = {
    showApproveModal: false,
    showRequestModal: false
}

export function reducer(state: jobControlState, action: jobControlAction) {
    const { type, payload } = action;
    switch (type) {
        case actionKind.OPEN_APPROVE_MODAL:
        return {
            ...state,
            showApproveModal: true,
        };
        case actionKind.CLOSE_APPROVE_MODAL:
        return {
            ...state,
            showApproveModal: false,
        };
        case actionKind.OPEN_REQUEST_MODAL : 
            return {
                ...state,
                showRequestModal: true,
            }
        case actionKind.CLOSE_REQUEST_MODAL: 
            return {
                ...state,
                showRequestModal: false,
            }
        default:
        return state;
    }
}