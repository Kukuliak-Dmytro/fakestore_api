export default function Login(){
    const handleLogin=(event:any)=>{
        event.preventDefault();
        console.log("Logging in")
    }
    return (
        <div className="login-wrapper flex content-center items-center justify-center h-screen">
            <div className="login bg-gray-100 p-10 rounded-lg flex flex-col gap-4">
                <h1>Login</h1>
                <form className="flex flex-col gap-4" onSubmit={(e)=>{handleLogin(e)}}>
                    <input type="text" placeholder="Username" className="p-2"/>
                    <input type="password" placeholder="Password" className="p-2"/>
                    <button className="p-2 bg-blue-500 text-white rounded cursor-pointer">Login</button>
                </form>
            </div>
        </div>
    )
}