function getAllUsers() {
    authAxiosInstance({
        url: '/user',
        method: 'GET'
    })
    .catch(e => {
        console.log(e)
        //location.replace('/auth.html')
    }).then((res) => drawUsers(res.data.data))
}
getAllUsers()

function drawUsers(users) {
    for (let i = 0; i < users.length; i++) {
        const userContainer = document.createElement('div')
        userContainer.classList = ["user-container"]

        const user = document.createElement('div')
        user.classList = ["user"]

        const info = document.createElement('div')
        info.classList = ["user-info"]

        const userId = document.createElement('p')
        userId.classList = ["user-login"]
        userId.innerHTML = `ID: <span class="bold">${users[i].id}</span>`
        info.appendChild(userId)

        const userPassword = document.createElement('p')
        userPassword.classList = ["user-login"]
        userPassword.innerHTML = `Пароль: <span class="bold">${users[i].password}</span>`
        info.appendChild(userPassword)

        user.appendChild(info)

        const userBtns = document.createElement('div')
        userBtns.classList = ["user-buttons"]

        const delBtn = document.createElement('div')
        delBtn.classList = ["del-user-btn"]
        delBtn.innerHTML = `<div class="btn">Удалить</div>`
        delBtn.onclick = () => { del(users[i].id) }
        userBtns.appendChild(delBtn)

        user.appendChild(userBtns)

        userContainer.appendChild(user)
        document.getElementsByClassName('all-users-container')[0].appendChild(userContainer)
    }
}

function del(id) {
    authAxiosInstance({
        url: `/user/${id}`,
        method: 'delete'
    }).then(() => {
        location.reload()
    })
}

document.getElementById("create-btn").addEventListener('click', () => {
    const password = document.getElementById("create-user-input").value


    if (!Boolean(password) || password == "") {
        document.getElementById("create-user-input").classList = ['create-user-input input-red']
        return
    }

    authAxiosInstance({
        url: '/user',
        method: 'POST',
        data: {
            password: password
        }
    }).then(() => {
        location.reload()
    })
})

document.getElementById("create-user-input").addEventListener('input', () => {
    document.getElementById("create-user-input").classList = ["create-user-input"]
}) 