const useFacebookLoginRedirect = () => {
  const appId = import.meta.env.VITE_FACEBOOK_APPID
  const redirectUri = import.meta.env.VITE_FACEBOOK_BIND_REDIRECT_URL
  const fbAuthUrl = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&response_type=token`
  return fbAuthUrl
}

export default useFacebookLoginRedirect
