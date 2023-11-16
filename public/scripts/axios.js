const baseUrl = "https://c293-178-214-245-114.ngrok-free.app/api"

const defaultAxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

const authAxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

authAxiosInstance.interceptors.request.use((config) => {
  const accessToken = getCookie('accessToken')
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

authAxiosInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && error.config && !error.config._isRetry)
    {
      originalRequest._isRetry = true
      try {
        const tokens = await getNewTokens()
        return authAxiosInstance.request(originalRequest)
      } catch (e) {
        console.log(e)
        document.cookie = ""
        document.location = "/auth.html"
      }
    }

    throw error
  }
)

async function getNewTokens() {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `${baseUrl}/auth/refresh`,
      data: {
        refreshToken: getCookie('refreshToken'),
      }
    }).then((response) => {
      const pair = response.data.data
      if (pair) {
        document.cookie = `accessToken=${pair.access}`
        document.cookie = `refreshToken=${pair.refresh}`
      }
      resolve()
    }).catch(e => {
      reject()
    })
  })
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}