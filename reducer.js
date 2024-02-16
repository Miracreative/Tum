const initialState = {language: 'en',
                        userInfo: {
                            currentAddress: 'non location',
                            latitude: 24.6877,
                            longitude: 46.7219,
                            email: "user@mail.com",
                            userName: "John Dou",
                            userAge: 23
                        },
                        
                        plan: {
                            sum: 1000,
                            long: 'sar/hellp'
                        },
                        childrens: {
                            children1: {
                                gender: '',
                                name: '',
                                lastName: '',
                                age: 15,
                                photo: ''
                            }
                            
                        },
                        deliveryDatails: {
                            time: 'morning',
                            date: 'Friday, February2, 2024'
                        }
                    };
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LNG': 
            if(state.language == 'en') {
                return {
                    ...state,
                    language: 'ar'
                }
            } else if(state.language == 'ar') {
                return {
                    ...state,
                    language: 'en'
                }
            }
        case 'LATITUDE': 
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    latitude: action.payload
                }
                
            }
        case "LONGITUUDE": 
            return {
                ...state,
                userInfo: {
                    ...state.userInfo, 
                    longitude: action.payload
                }
            }
        case 'LOCATION': 
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    currentAddress: action.payload
                }
            }
        case 'EMAIL': 
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                email: action.payload
            }
        }
        case 'GENDER1':
            return {
                ...state,
                childrens: {
                    ...state.childrens,
                    children1: {
                        ...state.childrens.children1,
                        gender: action.payload
                    }
                }
            }
        case 'NAME1':
            return {
                ...state,
                childrens: {
                    ...state.childrens,
                    children1: {
                        ...state.childrens.children1,
                        name: action.payload
                    }
                }
            }
        case 'LASTNAME1':
            return {
                ...state,
                childrens: {
                    ...state.childrens,
                    children1: {
                        ...state.childrens.children1,
                        lastName: action.payload
                    }
                }
            }
        case 'PHOTO1':
            return {
                ...state,
                childrens: {
                    ...state.childrens,
                    children1: {
                        ...state.childrens.children1,
                        photo: action.payload
                    }
                }
            }
        case 'AGE1':
            return {
                ...state,
                childrens: {
                    ...state.childrens,
                    children1: {
                        ...state.childrens.children1,
                        age: action.payload
                    }
                }
            }
        case 'SUM': 
            return {
                ...state,
                plan: {
                    ...state.plan,
                    sum: action.payload,
                }
            }
        case 'LONG': 
            return {
                ...state,
                plan: {
                    ...state.plan,
                    long: action.payload
                }
            }
        case 'TIME': 
            return {
                ...state,
                deliveryDatails: {
                    ...state.deliveryDatails,
                    time: action.payload
                }
            }
        case 'DATE': 
            return {
                ...state,
                deliveryDatails: {
                    ...state.deliveryDatails,
                    date: action.payload
                }
            }
		default:
			return state
	}
}

export default reducer;