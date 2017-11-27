import I18n from 'react-native-i18n';
//import Expo from 'expo';


// import en from './en.json';
// import de from './de.json';
// import fr from './fr.json';

// Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
I18n.fallbacks = true;

// Add different defaultLocale here (default is 'en').
// It will be used as a fallback when device locale isn't found in
// translations
I18n.defaultLocale = 'fr';
I18n.locale = 'fr';


/* Expo.Util.getCurrentLocaleAsync().then((language) => {
	console.log(`Langue utilisateur: ${language}`);	
	I18n.locale = language;
}); */

/* getLanguages().then(languages => {
	console.log(`Langue utilisateur: ${languages[0]}`);
	I18n.locale = languages[0].substr(0, 2);
}); */

// Add translations here
I18n.translations = {
  en: require('./en.json'),
  de: require('./de.json'),
  fr: require('./fr.json'),
};
