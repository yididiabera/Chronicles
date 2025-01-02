import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PROJECT_NAME = "Chronicles Blog";

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value.trim() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      return setErrorMessage('Please fill out all fields.');
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      console.log('Sending request to /api/auth/login:', formData);
      const res = await fetch('/api/auth/login', { // Update to correct backend URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('Response from server:', data);

      if (!res.ok) {
        return setErrorMessage(data.message || 'An error occurred.');
      }

      setLoading(false);
      navigate('/dashboard'); // Redirect to dashboard or desired page after login
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Server error. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center mt-10"> {/* Adjusted margin-top */}
      <div className="flex p-5 max-w-md mx-auto flex-col gap-5">
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" value="Your email" />
              <TextInput
                type="email"
                id="email"
                placeholder="name@company.com"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
            <div>
              <Label htmlFor="password" value="Your password" />
              <TextInput
                type="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
                required
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
              className="flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                'Log In'
              )}
            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-500 underline">
              Sign Up
            </Link>
          </div>

          {errorMessage && (
            <Alert
              className="mt-5"
              color="failure"
              role="alert"
              aria-live="assertive"
            >
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
