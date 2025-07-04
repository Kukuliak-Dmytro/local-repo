export const saveAccessToken = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
}

export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
}

export const removeAccessToken = () => {
    localStorage.removeItem("accessToken");
}

export const saveRefreshToken = (refreshToken) => {
    localStorage.setItem("refreshToken", refreshToken);
}

export const getRefreshToken = () => {
    return localStorage.getItem("refreshToken");
}

export const removeRefreshToken = () => {
    localStorage.removeItem("refreshToken");
}