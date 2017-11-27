
import { 
	SET_NOTES
} from '../types';

export const setNotes = (notes) => {
	return {
		type: SET_NOTES,
		payload: notes
	};
};

