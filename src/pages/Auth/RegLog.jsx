import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function RegLog() {
    const [showRegister, setShowRegister] = useState(false);
    const [userRole, setUserRole] = useState('buyer');
    const { login, register, loading, error } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        surname: '',
        birthDate: '',
        phone: '',
        role: 'buyer'
    });

    const [formErrors, setFormErrors] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleRoleChange = (role) => {
        setUserRole(role);
        setFormData(prevState => ({
            ...prevState,
            role: role
        }));
    };

    const validateForm = () => {
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            setFormErrors("Некоректний email");
            return false;
        }
        if (formData.password.length < 8) {
            setFormErrors("Пароль повинен містити не менше 8 символів");
            return false;
        }
        if (showRegister && formData.password !== formData.confirmPassword) {
            setFormErrors("Паролі не співпадають");
            return false;
        }
        setFormErrors("");
        return true;
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            await login(formData.email, formData.password);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = new Date(formData.birthDate).toISOString().split('T')[0];

        const userData = {
            ...formData,
            birthDate: formattedDate,
        };

        if (validateForm()) {
            await register(userData);
        }
    };

    return (
        <div className="container mt-5 w-50">
            {formErrors && <div className="alert alert-danger" role="alert">{formErrors}</div>}
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="btn-group w-100 mb-3" role="group" aria-label="Toggle form group">
                <input type="radio" className="btn-check" name="authOption" id="btnRegister" autoComplete="off" />
                <label className="btn btn-outline-dark w-50" htmlFor="btnRegister" onClick={() => setShowRegister(true)}>Реєстрація</label>

                <input type="radio" className="btn-check" name="authOption" id="btnLogin" autoComplete="off" defaultChecked />
                <label className="btn btn-outline-dark w-50" htmlFor="btnLogin" onClick={() => setShowRegister(false)}>Вхід</label>
            </div>

            {/* Форма входа */}
            {!showRegister && (
                <form className="p-4 border rounded bg-light" onSubmit={handleLoginSubmit}>
                    <h2 className="mb-4 text-center">Вхід</h2>

                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                        <input type="email" className="form-control" id="email" placeholder="Введіть ваш email" required onChange={handleChange} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                        <input type="password" className="form-control" id="password" placeholder="Введіть ваш пароль" required onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                        {loading ? 'Загрузка...' : 'Увійти'}
                    </button>
                </form>
            )}

            {/* Форма регистрации */}
            {showRegister && (
                <form className="p-4 border rounded bg-light" onSubmit={handleRegisterSubmit}>
                    <h2 className="mb-4 text-center">Реєстрація</h2>

                    <div className="btn-group w-100 mb-3" role="group" aria-label="User role group">
                        <input type="radio" className="btn-check" name="userRole" id="btnBuyer" autoComplete="off" checked={userRole === 'buyer'} onChange={() => handleRoleChange('buyer')} />
                        <label className="btn btn-outline-dark w-50" htmlFor="btnBuyer">Я покупець</label>

                        <input type="radio" className="btn-check" name="userRole" id="btnSeller" autoComplete="off" checked={userRole === 'seller'} onChange={() => handleRoleChange('seller')} />
                        <label className="btn btn-outline-dark w-50" htmlFor="btnSeller">Я продавець</label>
                    </div>

                    {/* Поля для регистрации */}
                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                        <input type="text" className="form-control" id="name" placeholder="Введіть ваше ім'я" required onChange={handleChange} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="bi bi-person-badge-fill"></i></span>
                        <input type="text" className="form-control" id="surname" placeholder="Введіть ваше прізвище" required onChange={handleChange} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="bi bi-calendar-date-fill"></i></span>
                        <input type="date" className="form-control" id="birthDate" required onChange={handleChange} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="bi bi-telephone-fill"></i></span>
                        <input type="tel" className="form-control" id="phone" placeholder="Введіть ваш номер телефону" required onChange={handleChange} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                        <input type="email" className="form-control" id="email" placeholder="Введіть ваш email" required onChange={handleChange} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                        <input type="password" className="form-control" id="password" placeholder="Введіть ваш пароль" required onChange={handleChange} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                        <input type="password" className="form-control" id="confirmPassword" placeholder="Підтвердіть ваш пароль" required onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn btn-dark w-100" disabled={loading}>
                        {loading ? 'Загрузка...' : 'Зареєструватися'}
                    </button>
                </form>
            )}
        </div>
    );
}

export default RegLog;
