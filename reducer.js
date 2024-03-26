const initialState = {language: 'en',
                        userInfo: {
                            currentAddress: 'non location',
                            latitude: 24.6877,
                            longitude: 46.7219,
                            email: "user@mail.com",
                            phone: null,
                            userName: "John Dou",
                            userAge: 23,
                            cardNumber: null
                        },
                      
                        childrens: {
                            children1: {
                                gender: '',
                                name: '',
                                lastName: '',
                                age: 15,
                                photo: '',
                                deliveryDetails: {
                                    area: '',
                                    building: '',
                                    flat: '',
                                    street: '',
                                    delideryInsrtuctions: '',
                                    time: 'morning',
                                    date: 'Friday, February2, 2024'
                                },
                                plan: {
                                    sum: 1000,
                                    long: 'sar/hellp'
                                },
                                warnings: {
                                    Fish: false,
                                    Beef: false,
                                    Seafoods: false,
                                    Chicken: false,
                                    Broccaly: false,
                                    Eggs: false,
                                    Shugar: true,
                                    Bread: false
                                }
                            }
                            
                        },
                       
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
        case 'PHONE': 
        return {
            ...state,
            userInfo: {
                ...state.userInfo,
                phone: action.payload
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
                childrens: {
                    ...state.childrens,
                    children1: {
                        ...state.childrens.children1,
                        plan: {
                            ...state.childrens.children1.plan,
                            sum: action.payload,
                            
                        }
                    }
                }
                
            }
        case 'LONG': 
            return {
                ...state,
                childrens: {
                    ...state.childrens,
                    children1: {
                        ...state.childrens.children1,
                        plan: {
                            ...state.childrens.children1.plan,
                            long: action.payload,
                            
                        }
                    }
                }
            }
        case 'TIME': 
            return {
                ...state,
                childrens: {
                    ...state.childrens,
                    children1: {
                        ...state.childrens.children1,
                        deliveryDetails: {
                            ...state.childrens.children1.deliveryDetails,
                            time: action.payload
                            
                        }
                    }
                }
                
            }
        case 'DATE': 
            return {
                ...state,
                childrens: {
                    ...state.childrens,
                    children1: {
                        ...state.childrens.children1,
                        deliveryDetails: {
                            ...state.childrens.children1.deliveryDetails,
                            date: action.payload
                        }
                    }
                }
            }
        case 'AREA': 
            return {
                ...state,
                childrens: {
                    ...state.childrens,
                    children1: {
                        ...state.childrens.children1,
                        deliveryDetails: {
                            ...state.childrens.children1.deliveryDetails,
                            area: action.payload
                        }
                    }
                }
            }
        case 'BUILDING': 
            return {
                ...state,
                childrens: {
                    ...state.childrens,
                    children1: {
                        ...state.childrens.children1,
                        deliveryDetails: {
                            ...state.childrens.children1.deliveryDetails,
                            building: action.payload
                        }
                    }
                }
            }
        case 'FLAT': 
            return {
                ...state,
                childrens: {
                    ...state.childrens,
                    children1: {
                        ...state.childrens.children1,
                        deliveryDetails: {
                            ...state.childrens.children1.deliveryDetails,
                            flat: action.payload
                        }
                    }
                }
            }
        case 'STREET': 
            return {
                ...state,
                childrens: {
                    ...state.childrens,
                    children1: {
                        ...state.childrens.children1,
                        deliveryDetails: {
                            ...state.childrens.children1.deliveryDetails,
                            street: action.payload
                        }
                    }
                }
            }
        case 'INSTRUCTIONS': 
            return {
                ...state,
                childrens: {
                    ...state.childrens,
                    children1: {
                        ...state.childrens.children1,
                        deliveryDetails: {
                            ...state.childrens.children1.deliveryDetails,
                            delideryInsrtuctions: action.payload
                        }
                    }
                }
            }
		default:
			return state
	}
}

export default reducer;