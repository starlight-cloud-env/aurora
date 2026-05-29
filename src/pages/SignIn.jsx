import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './SignIn.css'

function SignIn() {
  const { user, signInWithMagicLink } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Redirect if already signed in
  if (user) {
    navigate('/')
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await signInWithMagicLink(email)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSubmitted(true)
      setLoading(false)
    }
  }

  return (
    <div className="signin">
      <div className="signin__card">
        <div className="signin__header">
          <h1 className="signin__logo">Aurora</h1>
          <p className="signin__tagline">Your personal streaming universe</p>
        </div>

        {submitted ? (
          <div className="signin__confirmation">
            <div className="signin__confirmation-icon">✉️</div>
            <h2 className="signin__confirmation-title">Check your inbox</h2>
            <p className="signin__confirmation-text">
              We sent a magic link to <strong>{email}</strong>. 
              Click the link in the email to sign in — no password needed.
            </p>
            <button
              className="signin__resend"
              onClick={() => setSubmitted(false)}
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form className="signin__form" onSubmit={handleSubmit}>
            <label className="signin__label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="signin__input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            {error && <p className="signin__error">{error}</p>}
            <button
              type="submit"
              className="signin__btn"
              disabled={loading || !email}
            >
              {loading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default SignIn