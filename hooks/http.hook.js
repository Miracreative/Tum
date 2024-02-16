import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [process, setProcess] = useState('waiting');

    const _apiKey = 'bearer 95bb57fd6d68b41a61d103afbf4e7777611a0c52a157ba750d54c84401f79cbc3bd4174390b3a17b9db6c7ca26506b8851387501323fa5f24847939c0e7911064edfcde87b39f67b4c486ccc6e5d69867a21e69eb55a68e49cfaeb9c4128a1c49f2e268e0e37354da99301ebcc127b9c0e01b1c333eff154eb79e66269a0a197';

    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type':'application/json',
                'Authorization': `${_apiKey}`,}) => {
    
        setProcess('loading');

        try {
            const response = await fetch(url, {method, body, headers})

            if(!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            setProcess('error')
            throw e;
        }
    }, []);

    const clearError = useCallback(() => {
        setProcess('loading')
    }, []);

    return {request, clearError, process, setProcess};
}