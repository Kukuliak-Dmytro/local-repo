import useInvite from "../hooks/useInvire"
import PageWrapper from "../layouts/PageWrapper"
import useFormState from "../hooks/useFormState"
import Input from "../components/ui/Input"
import Button from "../components/ui/Button"
import { useQuery } from "@tanstack/react-query"
import http from "../utils/http"
export default function Shared() {
    const { inviteMutation } = useInvite()
    const { data: invites, isLoading } = useQuery({
        queryKey: ['invites'],
        queryFn: async () => {
            const response = await http.get('/invites')
            console.log(response.data)
            return response.data
        }
    })
    const [formData, setFormData, handleChange] = useFormState({
        email: ""
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        inviteMutation(formData.email)
    }
    return (

        <PageWrapper>
            <h1 className="text-2xl font-bold">Share your todo list with others</h1>
            <form onSubmit={handleSubmit} className='flex gap-2 items-center justify-center'>
                <Input type="email" name="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <Button type="submit">Invite</Button>
            </form>
            {isLoading ? <p>Loading...</p> : (
                <>
                    <h2>Sent Invites</h2>
                    <ul>
                        {(invites.sent || []).map(invite => (
                            <li key={invite.id}>{invite.invitedUserEmail} ({invite.status})</li>
                        ))}
                    </ul>
                    <h2>Received Invites</h2>
                    <ul>
                        {(invites.received || []).map(invite => (
                            <li key={invite.id}>{invite.invitedUserEmail} ({invite.status})</li>
                        ))}
                    </ul>
                </>
            )}
        </PageWrapper>
    )
}