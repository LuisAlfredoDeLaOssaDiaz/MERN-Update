import { ENV } from "../utils";

export class User {
    baseApi = ENV.BASE_API;

    async getMe(accessToken) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.USER_ME}`;
            const params = {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
            const response = await fetch(url, params);
            const result_ = await response.json();
            const {msg: result} = result_ ;
        
            delete result.password;
            
            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }
    
    async createUser( accessToken, data ) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key)=> {
                // console.log(key, data[key]);
                formData.append(key, data[key])
            })
            
            if(data.fileAvatar) {
                formData.append("avatar", data.fileAvatar);
            }
            
            const url = `${this.baseApi}/${ENV.API_ROUTES.USER}`;
            const params = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            };
            const response = await fetch(url, params);
            const result_ = await response.json();
            const {msg: result} = result_;
            
            // console.log(data.fileAvatar);
            
            if (response.status !== 201) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async getUsers(accessToken, active = undefined) {
        try {
            let url;
            if (active !== undefined) {
                url = `${this.baseApi}/${ENV.API_ROUTES.USERS}?active=${active}`;
            } else {
                url = `${this.baseApi}/${ENV.API_ROUTES.USERS}`;
            }
            
            const params = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            }
            
            const response = await fetch(url, params);
            const result_ = await response.json();
            const {msg: result} = result_;

            if(response.status !== 200) throw result;

            return result;
        } catch(error) {
            throw error
        }
    }

    async updateUser(accessToken, id, data) {
        try {
            if (!data.password) {
                delete data.password
            }
            const formData = new FormData();
            Object.keys(data).forEach((key)=> {
                // console.log(key, data[key]);
                formData.append(key, data[key])
            })
            
            if(data.fileAvatar) {
                formData.append("avatar", data.fileAvatar);
            }
            
            const url = `${this.baseApi}/${ENV.API_ROUTES.UPDATEUSER}/${id}`;
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            }

            const response = await fetch(url, params);
            const result_ = await response.json();
            const {msg: result} = result_;

            if(response.status !== 200) throw result;

            return result

        } catch (error) {
            throw error;
        }
    }

    async deleteUser(accessToken, id) {
        try {            
            const url = `${this.baseApi}/${ENV.API_ROUTES.USER}/${id}`;
            const params = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }

            const response = await fetch(url, params);
            const result_ = await response.json();
            const {msg: result} = result_;

            if(response.status !== 200) throw result;

            return result

        } catch (error) {
            throw error;
        }
    }
}
