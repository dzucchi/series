import { createStackNavigator } from "react-navigation";

import LoginPage from './pages/LoginPage'
import SeriesPage from './pages/SeriesPage'
import SerieDetailPage from './pages/SerieDetailPage'
import SerieFormPage from './pages/SerieFormPage'

export default createStackNavigator({
	'SerieForm': {
		screen: SerieFormPage,
		navigationOptions: {
			title: 'Nova série',
		}
	},
	'Main': {
		screen: SeriesPage
	},
	'SerieDetail': {
		screen: SerieDetailPage,
		navigationOptions: ({ navigation }) => {
			const { serie } = navigation.state.params;
			return {
				title: serie.title,
			}
		}
	},
	'Login': {
		screen: LoginPage,
		navigationOptions: {
			title: 'Bem vindo',
		}
	},
}, {
	navigationOptions: {
		title: 'Séries!',
		headerTintColor: 'white',
		headerStyle: {
			backgroundColor: '#6ca2f7',
			borderBottomWidth: 1,
			borderBottomColor: '#C5C5C5'
		},
		headerTitleStyle: {
			color: 'white',
			fontSize: 30,
		}
	}	
});