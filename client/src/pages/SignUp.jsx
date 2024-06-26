import { Alert, Button, Label, TextInput, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../Components/OAuth';

// import { useDispatch, useSelector } from 'react-redux';
// import {
//   signInStart,
//   signInFailure,
//   signInSuccess,
// } from '../redux/user/userSlice';

function SignUp() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const [formData, setFormData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  // const { loading, error: errorMessage } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please Fill Out All Details');
      // return dispatch(signInFailure('Please Fill Out All Details'));
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      // dispatch(signInStart());
      const res = await fetch('/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
        // return dispatch(signInFailure(data.message));
      }

      setLoading(false);
      if (res.ok) {
        // dispatch(signInSuccess(data));
        navigate('/sign-in');
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      // dispatch(error.message);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left-section */}
        <div className="flex-1">
          <Link to="/home" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg text-white">
              {`Blog`}
            </span>
            Wallah
          </Link>
          <p className="text-sm mt-5">
            This is a blog Project,You can use Your Email id and Password or
            Sign up With google
          </p>
        </div>
        {/* right-section */}
        <div className="flex-1">
          <div>
            <form
              className="flex flex-col gap-4 "
              onSubmit={(e) => handleSubmit(e)}
            >
              <div>
                <Label value="Your username" />
                <TextInput
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Username"
                  id="username"
                />
              </div>
              <div>
                <Label value="Your email" />
                <TextInput
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <Label value="Your password" />
                <TextInput
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <Button
                gradientDuoTone="purpleToPink"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading..</span>
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
              <OAuth />
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Have an Account?</span>
              <Link to="/sign-in" className="text-blue-500">
                Sign in
              </Link>
            </div>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
