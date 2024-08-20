import FeatureLogin from '../features/user/Login'

import checkGuest from '../app/guest'


function Login(){
    checkGuest()
    return(
        <>
            <FeatureLogin />
        </>
    )
}

export default Login