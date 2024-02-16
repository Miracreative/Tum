import {useHttp} from '../hooks/http.hook.js';


const useDBService = () => {

const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'http://192.168.0.189:1337/api/';
    const checkUserEmail = async (userEmail) => {
        const res = await request(`${_apiBase}users?filters[email]=${userEmail}`);
        return res[0]?.email
    }

    const getDefaultMeals = async () => {
        const res = await request(`${_apiBase}meals?populate=*&filters[type_of_meal][Title]=Breakfast&filters[age_category][title]=3-6 years&filters[day_of_the_week][Title]=Sunday`);
        return res.data.map(_transformMeals);
    }

    const getDaysOfWeek = async () => {
        const res = await request(`${_apiBase}day-of-the-weeks`);
        return res.data.map(_transformWeekDays);
    }
    
    const _transformMeals = (meal) => {
        return {
            title: meal.attributes.title
        }
    }

    const _transformWeekDays = (day) => {
        return {
            title: day.attributes.Title,
            number: day.attributes.number
        }
    }


   
    return {checkUserEmail, 
            getDefaultMeals,
            getDaysOfWeek,
            clearError, 
            process,
            setProcess}
}

export default useDBService;