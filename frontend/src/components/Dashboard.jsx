import { useRecoilState } from "recoil"
import { displayUserAtoms, getBalanceAtoms } from "./atoms/getBalanceAtoms"
import { useEffect, useState } from "react"
import axios from "axios"

function Dashboard() {
    const [getBalance, setGetBalance] = useRecoilState(getBalanceAtoms)
    const [fetchUsers, setFetchUsers] = useRecoilState(displayUserAtoms)
    const [searchValue, setSearchValue] = useState("")

    const fetchBalance = async () => {
        const token = await localStorage.getItem("jwtToken")
        console.log(token)

        try {
            const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            console.log(response.data)
            setGetBalance(response.data.balance)
        } catch (error) {
            console.log("Error fetching balance", error)
        }
    }

    const handleSearch = async (e) => {
        const filter = e.target.value
        setSearchValue(filter)

        if (!filter) {
            setFetchUsers([])
            return
        }

        try {
            const response = await axios.get("http://localhost:3000/api/v1/user/bulk", {
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    filter: filter
                }
            })
            console.log(response.data)
            setFetchUsers(response.data.user)
        } catch (error) {
            console.log("Error searching users", error)
        }
    }

    useEffect(() => {
        fetchBalance()
    }, [])

    return (
        <>
            <div className="login-form">
                <h1>Payments App</h1>
                <h3>Your Balance : ${getBalance ? getBalance.toFixed(2) : "Loading..."}</h3>
                <input
                    value={searchValue}
                    onChange={handleSearch}
                    type="search"
                    placeholder="Search users..."
                />
                <h3>Users</h3>
                <div>
                    {searchValue && Array.isArray(fetchUsers) && fetchUsers.length > 0 ? (
                        fetchUsers.map((user, index) => (
                            <div key={user._id || index}>
                                <div className="login-form">
                                    <h3>{user.firstName} {user.lastName}</h3>
                                    <button>Send Money</button>
                                </div>
                            </div>
                        ))
                    ) : searchValue ? (
                        <span>No users found.</span>
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default Dashboard
