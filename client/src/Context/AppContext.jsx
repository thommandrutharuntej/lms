import { createContext, useState, useEffect } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from '@clerk/clerk-react'
export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const navigate = useNavigate()
    const { userId } = useAuth()

    const { getToken } = useAuth()
    const { user } = useUser()

    const [allCourses, setAllCourses] = useState([])
    const [isEducator, setIsEducator] = useState(true)
    const [enrolledCourses, setEnrolledCourses] = useState([])

    // Fetch dummy courses
    useEffect(() => {
        setAllCourses(dummyCourses)
    }, [])

    const logToken = async () => {
        console.log(await getToken())
    }

    useEffect(() => {
        if (user) {
            logToken()
        }
    }, [user])

    const value = {
        allCourses, navigate, isEducator, setIsEducator, enrolledCourses, setEnrolledCourses
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}