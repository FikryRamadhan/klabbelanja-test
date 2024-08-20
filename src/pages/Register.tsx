import FeatureRegister from "../features/user/Register"
import checkGuest from "../app/guest"


function Register(){
    checkGuest()
    return(
        <>
            <FeatureRegister />
        </>
    )
}

export default Register