import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginScreen from '../screens/LoginScreen';
import SupportScreen from '../screens/SupportScreen';
import SearchScreen from '../screens/SearchScreen';
import HomeScreen from '../screens/HomeScreen';
import { Icon } from 'react-native-elements';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import SingleFlight from '../screens/SingleFlight';
import LoadingScreen from '../screens/LoadingScreen';
import SearchHotelsScreen from '../screens/hotels/SearchHotelsScreen';
import HotelsResultsScreen from '../screens/hotels/HotelsResultsScreen';
import SingleHotelScreen from '../screens/hotels/SingleHotelScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SingleFlightResult from '../components/SingleFlightResult';
import SearchCountryScreen from '../screens/cityCode/SearchCountryScreen';
import CountryDetailsScreen from '../screens/cityCode/CountryDetailsScreen';
const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  }
}, {
  initialRouteName: 'Login'
})

const SearchStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      header: null
    }
  },
  SearchResults: {
    screen: SearchResultsScreen
  },
  SingleFlightScreen: {
    screen: SingleFlight
  }
})

const ProfileStack = createStackNavigator({
  Profile: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  MyFavorites: {
    screen: FavoritesScreen
  },
  SingleFavorite: {
    screen: SingleFlight
  }
})

const HotelsStack = createStackNavigator({
  HotelsSearch: {
    screen: SearchHotelsScreen,
    navigationOptions: {
      header: null
    }
  },
  HotelsResults: {
    screen: HotelsResultsScreen
  },
  SingleHotel: {
    screen: SingleHotelScreen
  }
})

const CountryDetailsStack = createStackNavigator({
  CountrySearch: {
    screen: SearchCountryScreen,
    navigationOptions: {
      header: null
    }
  },
  CountryDetails: {
    screen: CountryDetailsScreen
  }
})

const AppFlow = createBottomTabNavigator({
  Support: {
    screen: SupportScreen,
    navigationOptions: {
      tabBarIcon: (
        <Icon
          name="help"
          type="material-icons"
        />
      )
    }
  },
  Search: {
    screen: SearchStack,
    navigationOptions: {
      tabBarIcon: (
        <Icon
          name="flight"
          type="material-icons"
        />
      ),
      title: 'Flights'
    }
  },
  Hotels: {
    screen: HotelsStack,
    navigationOptions: {
      tabBarIcon: (
        <Icon
          name="hotel"
          type="material-icons"
        />
      )
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarIcon: (
        <Icon
          name="user"
          type="font-awesome"
        />
      )
    }
  },
  CountrySearch: {
    screen: CountryDetailsStack,
    navigationOptions: {
      tabBarIcon: (
        <Icon
          name="search"
          type="font-awesome"
        />
      ),
      title: "Country"
    }
  }
}, {
  initialRouteName: 'Search'
})

const AppController = createSwitchNavigator({
  Auth: {
    screen: AuthStack,
  },
  App: {
    screen: AppFlow
  },
  Loading: {
    screen: LoadingScreen
  }
}, {
  initialRouteName: 'Loading'
})
export default AppNavigator = createAppContainer(AppController);