import { 
	SET_NOTES,
	ADD_NOTE,
	UPDATE_NOTE
} from '../types';

const INITIAL_STATE = {
	notes: []
};

export default (state = INITIAL_STATE, action) => {
	
	switch (action.type) {

		case SET_NOTES:
			return { ...state, notes: action.payload };

		case ADD_NOTE:
			return { ...state, notes: action.payload };

		case UPDATE_NOTE:
			return { ...state, notes: action.payload };
		
		default:
			return state;
	}
};
