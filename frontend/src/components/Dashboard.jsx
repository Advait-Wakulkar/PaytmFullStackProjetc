import { useRecoilState } from "recoil"
import { displayUserAtoms, getBalanceAtoms } from "./atoms/getBalanceAtoms"
import { useEffect, useState } from "react"
import axios from "axios"

function Dashboard() {
    const [getBalance, setGetBalance] = useRecoilState(getBalanceAtoms)
    const [fetchUsers, setFetchUsers] = useRecoilState(displayUserAtoms)
    const [searchValue, setSearchValue] = useState("")  // State for search input

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
        const filter = e.target.value // Get the value from the input field

        setSearchValue(filter)  // Update search value state

        if (!filter) {
            setFetchUsers([])  // Clear user list if search is empty
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
        fetchBalance()  // Fetch balance on component load
    }, [])

    const buttonStyle = {
        marginRight: '10px',  // Space between buttons
        padding: '10px 15px', // Padding for buttons
        backgroundColor: '#4CAF50', // Button background color
        color: 'white', // Text color
        border: 'none', // Remove border
        borderRadius: '5px', // Rounded corners
        cursor: 'pointer', // Cursor pointer
    }

    const buttonHoverStyle = {
        backgroundColor: '#45a049' // Darker background color on hover
    }

    return (
        <>
            <div className="login-form">
                <h1>Payments App</h1>
                <h3>Your Balance : ${getBalance ? getBalance.toFixed(2) : "Loading..."}</h3>
                <input
                    value={searchValue}  // Bind the value of the input to state
                    onChange={handleSearch}  // Ensure handleSearch is called properly
                    type="search"
                    placeholder="Search users..."
                />
                <h3>Users</h3>
                <div>
                    {/* Only render users and buttons if search is not empty */}
                    {searchValue && Array.isArray(fetchUsers) && fetchUsers.length > 0 ? (
                        fetchUsers.map((user, index) => (
                            <div key={user._id || index}>
                                <div className="login-form">
                                    <h3>{user.firstName} {user.lastName}</h3>
                                    <button 
                                        style={buttonStyle} 
                                        onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor} 
                                        onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                                    >
                                        Send Money
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : searchValue ? (
                        <span>No users found.</span>
                    ) : null} {/* If search is empty, don't render users */}
                </div>
            </div>
        </>
    )
}

export default Dashboard
