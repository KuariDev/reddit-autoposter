const btn = document.getElementById('auth_btn')
const input = document.getElementById('password')

btn.addEventListener('click', () => {
    const password = document.getElementById('password').value

    if (!Boolean(password) || password == "") {
        input.classList = ['input-red']
        return
    }

    login(password)
})

input.addEventListener('input', () => {
    input.classList = []
}) 

async function login(password) {
    defaultAxiosInstance({
        method: 'POST',
        url: "/auth/login",
        data: {
            password: password
        }
    }).then((res) => {
        setKeys(res.data.data.pair.access, res.data.data.pair.refresh)
        window.location.href = "/index.html";
    }).catch((e) => {
        console.log(e)
        input.classList = ['input-red']
    })
}

function setKeys(access, refresh) {
    document.cookie = `accessToken=${access}`
    document.cookie = `refreshToken=${refresh}`
}