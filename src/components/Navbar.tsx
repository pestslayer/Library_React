import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, Providers } from '../config/firebase';


const Navbar = () => {
    const [isSignedIn, setIsSignedIn] = useState(false)

    useEffect(() => {
        const checkSignInStatus = () =>{
            const signedIn = localStorage.getItem('isSignedIn') === "true";
            setIsSignedIn(signedIn)
        };
        checkSignInStatus();
    }, []);
 
    const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("isSignedIn");
        setIsSignedIn(false); // Update the state to reflect sign-out
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  const handleSignIn = async () => {
    try {
      const response = await signInWithPopup(auth, Providers.google);
      if (response.user) {
        localStorage.setItem("isSignedIn", "true");
        setIsSignedIn(true); // Update the state to reflect sign-in
      }
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };



    return (
        <nav className='bg-grey-200 shadow shadow-gray-300 w-100 px-8 md:px-auto'>
            <div className='md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap'>
                <div className='text-indigo-500 md:order-1 font-bold '>Discovery Den</div>
                {/* <div className='text-indigo-500 md:order-1'>
                <i className="fa-solid fa-book"></i>
                </div> */}
                <div className='text-grey-500 order-3 w-full md:w-auto md:order-2'>
                    <ul className='flex font-semibold justify-between'>
                    <li className='md:px-4 md:py-2 text-indigo-500'>
                        <Link to="/" className='nav-item'>Home</Link>
                    </li>
                    {isSignedIn && (
                        <li className='md:px-4 md:py-2 text-indigo-500'>
                            <Link to="/dashboard" className='nav-item'>Dashboard</Link>
                        </li>
                        )}
                        <li className='md:px-4 md:py-2 text-indigo-500'><Link to="/about" className='nav-item'>About</Link></li>
                        {isSignedIn && (
                        <li className='md:px-4 md:py-2 text-indigo-500'>
                            <Link to="/" onClick={handleSignOut}>Logout</Link>
                        </li>
                        )}
                    </ul>
                </div>
                <div className='order-2 md:order-3'>
                    {!isSignedIn && (
                    <button className='px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-grey-50 rounded-xl flex items-center gap-2' onClick={handleSignIn}>
                        <svg xmlns='http://www.w3.org/2000/svg'className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                          {/*add link and auth*/ } 
                          <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Login</span>
                    </button>
                        )}
                </div>
            </div>

        </nav>
    );  
};

export default Navbar