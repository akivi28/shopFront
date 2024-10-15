const apiUrl = import.meta.env.VITE_API_URL;

export const loginUser = async (email,password) => {
    const response = await fetch(apiUrl+'/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,password})
    });
    if(!response.ok){
        const errorData = await response.json().catch(() => null);
        console.log(errorData);
        const errorMessage = errorData?.error || "Ошибка сервера.";
        throw new Error(errorMessage);
    }
    const data = await response.json();
    console.log(data);
    return data;
}

export const registerUser = async (user) => {
    const response = await fetch(apiUrl + '/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    // Проверяем, является ли ответ успешным
    if (!response.ok) {
        // Читаем тело ответа как JSON
        const errorData = await response.json().catch(() => null);
        console.log(errorData);
        const errorMessage = errorData?.error || "Ошибка сервера.";
        throw new Error(errorMessage);
    }

    // Если ответ успешный, возвращаем данные
    const data = await response.json();
    console.log(data);
    return data;
};
