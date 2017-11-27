import * as baseStyle from '../../styles';


const WELCOME_DATA = [
	{ 
		backgroundColor: '#fa931d',
		primaryColor: '#fff',
		imageSource: 'https://i.imgur.com/1LS7rDG.png',
		imageStyle: {
			width: baseStyle.SCREEN_WIDTH,
			height: baseStyle.SCREEN_WIDTH / 2,
		},
	},
	{ 
		backgroundColor: '#03A9F5',
		primaryColor: '#fff',
		imageSource: 'https://i.imgur.com/1LS7rDG.png',
		imageStyle: {
			width: baseStyle.SCREEN_WIDTH,
			height: baseStyle.SCREEN_WIDTH / 2,
		},
	},
	{ 
		backgroundColor: '#009688',
		primaryColor: '#fff',
		imageSource: 'https://i.imgur.com/1LS7rDG.png',
		imageStyle: {
			width: baseStyle.SCREEN_WIDTH,
			height: baseStyle.SCREEN_WIDTH / 2,
		},	
	},
];

const FR = [
	{ 
		text: 'Bienvenue dans l\'application Training',
		description: 'Laissez-vous guider dans ce court tutoriel',
	},
	{ 
		text: 'Trouvez des jobs autour de vous',
		description: 'Description',
	},
	{ 
		text: 'Faites ceci et cela',
		description: '',	
	},
]

const DE = [
	{ 
		text: 'Willkommen in die Training App',
		description: 'Lassen Sie sich in diese kurze Anleitung führen',
	},
	{ 
		text: 'Finden Sie Arbeitsplätze in der Nähe',
		description: 'Beschreibung',
	},
	{ 
		text: 'Machen Sie dies und das',
		description: '',	
	},
]

const EN = [
	{ 
		text: 'Welcome in the Training app',
		description: '',
	},
	{ 
		text: 'Find jobs aroud you',
		description: 'Description',
	},
	{ 
		text: 'Use this to do that',
		description: '',	
	},
]

function concatArraysOfObjects(array1, array2) {
	OUTPUT = [];
	for(i=0; i< array1.length; i++){
		OUTPUT[i] = Object.assign({}, array1[i], array2[i]);
	}
	return OUTPUT;
}

export default function getWelcomeData(lang) {
	switch(lang){
		case 'fr':
			return concatArraysOfObjects(WELCOME_DATA, FR);
		case 'de':
			return concatArraysOfObjects(WELCOME_DATA, DE);
		case 'en':
			return concatArraysOfObjects(WELCOME_DATA, EN);
		default: 
			return concatArraysOfObjects(WELCOME_DATA, EN);
	}
}

