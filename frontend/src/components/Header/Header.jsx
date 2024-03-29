import React from 'react';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import TokenContext from '../../context/TokenContext.js';
import "./header.css"
function Header() {
    const token = localStorage.getItem("authToken");
    const { user } = useContext(TokenContext);
    console.log("user", user);
    const logout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    }
    const todo = () => {
        window.location.href = "/"
    }
    const register = () => {
        window.location.href = "/register"
    }
    const login = () => {
        window.location.href = "/login"
    }
    
    

    return (
        <div>


            <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div>
                        <button onClick={todo} class="flex items-center space-x-3 rtl:space-x-reverse">

                            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Todo App</span>
                        </button>
                    </div>
                    { token ? (
                        <>
                        <div className='ml-[850px] flex items-start '>
                        <p className='text-white mr-5'>Welcome, <span className=' text-xl text-gray-300 capitalize ml-'>{user.name}</span></p>
                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={logout} >Logout</button>
                    </div>
                    </>
                    ):(
                    <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                   
                        <button onClick={register} type="button" class="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                        <button onClick={login} type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Login </button>
                        <button  data-collapse-toggle="navbar-sticky" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span class="sr-only">Open main menu</span>
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>)}


                </div>
            </nav>

            <Outlet />
        </div>
    );
}

export default Header;