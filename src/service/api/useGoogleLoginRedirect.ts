const useGoogleLoginRedirect = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const redirectUri = import.meta.env.VITE_GOOGLE_LOGIN_REDIRECT_URL
  const scope = 'email profile'
  const responseType = 'token'
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=online`
  return googleAuthUrl
}

export default useGoogleLoginRedirect
