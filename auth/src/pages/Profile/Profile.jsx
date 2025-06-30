import { useState, useEffect } from "react"
import getProfile from "../../services/profileService"
import PageWrapper from "../../layout/PageWrapper/PageWrapper"
import { Link } from "react-router"
import ProtectedRoute from "../../layout/ProtectedRoute/ProtectedRoute"
export default function Profile() {
    const [profile, setProfile] = useState({})
    useEffect(() => {
        const fetchProfile = async () => {
            const profile = await getProfile()
            setProfile(profile)
        }
        fetchProfile()
    }, [])
    return(
        <ProtectedRoute>
            <PageWrapper>
                <h1>Profile</h1>
                <span>{JSON.stringify(profile)}</span>
                <Link to="/">Home</Link>
            </PageWrapper>
        </ProtectedRoute>
    )
}