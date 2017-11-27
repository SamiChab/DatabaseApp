import * as baseStyle from '../../styles';

export var wasSelected = {
	surname: false,
	name: false,
	email: false,
	password: false,
	password2: false
};

export var errorBool = {
	surname: false,
	name: false,
	email: false,
	password: false,
	password2: false
};

export var successBool = {
	surname: false,
	name: false,
	email: false,
	password: false,
	password2: false
};

export var labelColor = {
	surname: baseStyle.COLOR_DISABLED,
	name: baseStyle.COLOR_DISABLED,
	email: baseStyle.COLOR_DISABLED,
	password: baseStyle.COLOR_DISABLED,
	password2: baseStyle.COLOR_DISABLED
};

export var errorMessage = {
	surname: null,
	name: null,
	email: null,
	password: null,
	password2: null
};

export function checkErrors(props){
	// console.log(props);

	if(props.displayErrors) {
		wasSelected.surname = true;
		wasSelected.name = true;
		wasSelected.email = true;
		wasSelected.password = true;
		wasSelected.password2 = true;
	}

	errorBool.surname = getErrorBool(props.error.surname);
	errorBool.name = getErrorBool(props.error.name);
	errorBool.email = getErrorBool(props.error.email);
	errorBool.password = getErrorBool(props.error.password);
	errorBool.password2 = getErrorBool(props.error.password2);// && (props.password2 !== '');

	successBool.surname = getSuccessBool(errorBool.surname, props.surname);
	successBool.name = getSuccessBool(errorBool.name, props.name);
	successBool.email = getSuccessBool(errorBool.email, props.email);
	successBool.password = getSuccessBool(errorBool.password, props.password);
	successBool.password2 = getSuccessBool(errorBool.password2, props.password2);

	labelColor.surname = getLabelColor(errorBool.surname, successBool.surname);
	labelColor.name = getLabelColor(errorBool.name, successBool.name);
	labelColor.email = getLabelColor(errorBool.email, successBool.email);
	labelColor.password = getLabelColor(errorBool.password, successBool.password);
	labelColor.password2 = getLabelColor(errorBool.password2, successBool.password2);

	errorMessage.surname = renderErrorText(props.error.surname, wasSelected.surname);
	errorMessage.name = renderErrorText(props.error.name, wasSelected.name);
	errorMessage.email = renderErrorText(props.error.email, wasSelected.email);
	errorMessage.password = renderErrorText(props.error.password, wasSelected.password);
	errorMessage.password2 = renderErrorText(props.error.password2, wasSelected.password2);

	return (errorBool.surname || errorBool.name || errorBool.email || errorBool.password || errorBool.password2 );
		//|| (!wasSelected.surname && !wasSelected.name && !wasSelected.email && !wasSelected.password && !wasSelected.password2 );
};


function getErrorBool(error) {
	return error!=='';
};

function getSuccessBool(errorBool, inputString) {
	return (!errorBool) && (inputString !== '');
};

function getLabelColor(errorBool, successBool) {
	if(errorBool) {
		return 'red';
	} else if (successBool) {
		return 'green';
	} else {
		return baseStyle.COLOR_DISABLED;
	}
};

function renderErrorText(error, wasSelected){	
	if(!wasSelected) {
		return '';
	}
	return error;
};
