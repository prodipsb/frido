import axios from 'axios';
// import { getToken } from '../services/store'
// import nProgress from 'nprogress';
import Config from 'react-native-config';


const appEnv = Config.APP_ENV;

console.log('appEnv', appEnv);

let appUrl = '';
if(appEnv == 'production'){
     appUrl = Config.APP_ENDPOINT;
}else{
     appUrl = Config.APP_ENDPOINT_LOCAL;
}



export const get = (endpoint, params) => {
    const url = `${appUrl}/${endpoint}`;
     console.log('app url', url);
    // return false;

   // const { accessToken } = getToken();
    const headers = {}
   // headers['Authorization'] = `Bearer ${accessToken}`;

    const options = {
        method: 'GET',
        url: `${url}`,
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json',
            ...headers
        },
        params: params
    };
   // nProgress.start();
    return axios.request(options)?.then((response) => response)
        .catch((error) => {
            console.log(error);
        })
     //   .finally(() => nProgress.done());
}


export const post = async(endpoint, body) => {
    const url = `${appUrl}/${endpoint}`;
    console.log('app url', url);
    const headers = {}

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...headers
        },
        url: url,
        data: body
    }

    return  await axios(options)?.then((res) => res)
        .catch(error => {
            console.log('api response err', error)
     })



    //    const formData = new URLSearchParams();
    //     formData.append('field1', 'value1');
    //     formData.append('field2', 'value2');
    //     const response = await axios.request({
    //     url: url,
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     data: formData
    //     });

}

export const upload = async (endpoint, body) => {
    const url = `${appUrl}/${endpoint}`;
    console.log('app url', url);
    //const { accessToken } = getToken();
    const headers = {}
  //  headers['Authorization'] = `Bearer ${accessToken}`;

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            ...headers
        },
        url: `${url}`,
        data: body
    }
    return await axios(options)?.then((res) => res)
        .catch((error) => {
            console.log(error);
        })
}



export const del = (endpoint) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;

    const { accessToken } = getToken();
    const headers = {}
    headers['Authorization'] = `Bearer ${accessToken}`;

    const options = {
        method: 'DELETE',
        url: `${url}`,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
    };
    nProgress.start();
    return axios.request(options)?.then((response) => response)
        .catch((error) => {
            console.log(error);
        })
        .finally(() => nProgress.done());
}


//MEVRIK API CALLER

// GET
// options { token, method, return_as, id }
export const Mevrik = (endpoint, payload = null, config = {}) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;

    const { accessToken } = getToken();
    const headers = {
        'Content-Type': 'application/json'
    }
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const options = {
        method: config.method ?? (!payload ? 'GET' : 'POST'),
        url: `${url}`,
        headers,
    };
    nProgress.start();
    return axios.request(options)?.
        // { error: success: data: }
        then((response) => {
            if (response.data.error) {
                // sentry.erro
                // handle api error
            } else {
                if (response.data.results) return response.data.results;
                else if (response.data.data) return response.data.data;
                return response.data;
            }
        })
        .catch((error) => {
            // sentry error
            // handle server req error
            console.error('api get error', error);
            // message.error(error.response.data.detail);
        })
        .finally(() => nProgress.done());
}

// POST
export const POST = (endpoint, body, noToken = false) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;

    const { accessToken } = getToken();
    const headers = {
        'Content-Type': 'application/json',
    }

    if (accessToken) {
        headers['Authorization'] = noToken ? '' : `Bearer ${accessToken}`;
    }

    const options = {
        method: 'POST',
        headers,
        url: `${url}`,
        data: body
    }
    nProgress.start();

    return axios(options).then((res) => res)
        .catch(error => {
            if (error.response) {
                console.log('api post error', error.response);
                // message.error(error.response.data.detail);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }

        )
        .finally(() => nProgress.done());
}


// DELETE
export const DELETE = (endpoint) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`;

    const { accessToken } = getToken();
    const headers = {
        'Content-Type': 'application/json'
    }
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }
    const options = {
        method: 'DELETE',
        url: `${url}`,
        headers
    };
    nProgress.start();
    return axios.request(options).then((response) => response)
        .catch((error) => {
            console.error('api get error', error);
            // message.error(error.response.data.detail);
        })
        .finally(() => nProgress.done());
}

