import { 
	SET_NOTES
} from '../types';

const INITIAL_STATE = {
	notes: []
};

export default (state = INITIAL_STATE, action) => {
	
	switch (action.type) {

		case SET_NOTES:
			return { ...state, notes: action.payload };
		
		default:
			return state;
	}
};