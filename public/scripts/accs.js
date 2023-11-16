function getAccs() {
    authAxiosInstance({
        method: 'GET',
        url: "/account"
    }).then((res) => {
        drawAccs(res.data.data)
    })
}
getAccs()

function drawAccs(accs) {
    for (let i = 0; i < accs.length; i++) {
        const accContainer = document.createElement('div')
        accContainer.classList = ["acc-container"]
    
        const acc = document.createElement('div')
        acc.classList = ["acc"]

        const info = document.createElement('div')
        info.classList = ["acc-info"]
    
        const accLogin = document.createElement('p')
        accLogin.classList = ["acc-login"]
        accLogin.innerHTML = `Логин: <span class="bold">${accs[i].login}</span>`
        info.appendChild(accLogin)

        const accPassword = document.createElement('p')
        accPassword.classList = ["acc-password"]
        accPassword.innerHTML = `Пароль: <span class="bold">${accs[i].password}</span>`
        info.appendChild(accPassword)

        const accClientId = document.createElement('p')
        accClientId.classList = ["acc-clientId"]
        accClientId.innerHTML = `Client id: <span class="bold">${accs[i].clientId}</span>`
        info.appendChild(accClientId)

        const accClientSecret = document.createElement('p')
        accClientSecret.classList = ["acc-clientSecret"]
        accClientSecret.innerHTML = `Client secret: <span class="bold">${accs[i].clientSecret}</span>`
        info.appendChild(accClientSecret)

        acc.appendChild(info)


        const accBtns = document.createElement('div')
        accBtns.classList = ["acc-buttons"]

        // const editBtn = document.createElement('div')
        // editBtn.classList = ["edit-acc-btn"]
        // editBtn.innerHTML = `<a href="#" class="open-popup2"> <div class="btn">Изменить</div> </a>`
        // editBtn.onclick = () => { edit(accs[i].id) }
        // accBtns.appendChild(editBtn)

        const delBtn = document.createElement('div')
        delBtn.classList = ["del-acc-btn"]
        delBtn.innerHTML = `<div class="btn">Удалить</div>`
        delBtn.onclick = () => { del(accs[i].id) }
        accBtns.appendChild(delBtn)

        acc.appendChild(accBtns)


        accContainer.appendChild(acc)
        document.getElementsByClassName('accs')[0].appendChild(accContainer)
    }
}

async function del(id) {
    authAxiosInstance({
        url: `/account/${id}`,
        method: 'delete'
    }).then(() => {
        location.reload()
    })
}

async function edit(id) {
    
}

let popupBg = document.querySelector('.popup__bg');
let popup = document.querySelector('.popup');
let openPopupButtons = document.querySelectorAll('.open-popup');
let closePopupButton = document.querySelector('.close-popup');

openPopupButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        popupBg.classList.add('active');
        popup.classList.add('active');
    })
});

closePopupButton.addEventListener('click',() => {
    popupBg.classList.remove('active')
    popup.classList.remove('active');
});

document.addEventListener('click', (e) => {
    if(e.target === popupBg) {
        popupBg.classList.remove('active');
        popup.classList.remove('active');
    }
});

document.querySelector('#create__account__button').addEventListener('click', function (event) {
    let create__account__login = document.querySelector('#create__account__login').value
    let create__account__password = document.querySelector('#create__account__password').value
    let create__account__clientId = document.querySelector('#create__account__clientId').value
    let create__account__clientSecret = document.querySelector('#create__account__clientSecret').value

    authAxiosInstance({
        url: `account`,
        method: 'POST',
        data: {
            login: create__account__login,
            password: create__account__password,
            clientId: create__account__clientId,
            clientSecret: create__account__clientSecret
        }
    }).then(res => {
        if (res.status < 300) {
            setTimeout(() => {
                location.reload()
            }, 1500)
        }
        drawUsers(res.data.data)},
    ).catch(error => {
        if (error.response.status >= 400) {
            console.log(error.response.data.info.errors)
            if (error.response.data.info.errors.includes('Account not found')) {
                document.querySelector('#account__error').innerHTML += `<p style="color: red;">Аккаунт не найдет</p>`
                setTimeout(() => {
                    document.querySelector('#account__error').innerHTML = ``
                }, 2500)
            } else if (error.response.data.info.errors.includes('Incorrect data')) {
                document.querySelector('#account__error').innerHTML += `<p style="color: red;">Неправильные данные</p>`
                setTimeout(() => {
                    document.querySelector('#account__error').innerHTML = ``
                }, 2500)
            } else {
                document.querySelector('#create__account__login').style.cssText = 'border-bottom: 2px solid red;'
                document.querySelector('#create__account__password').style.cssText = 'border-bottom: 2px solid red;'
                document.querySelector('#create__account__clientId').style.cssText = 'border-bottom: 2px solid red;'
                document.querySelector('#create__account__clientSecret').style.cssText = 'border-bottom: 2px solid red;'
                setTimeout(() => {
                    document.querySelector('#create__account__login').style.cssText = ''
                    document.querySelector('#create__account__password').style.cssText = ''
                    document.querySelector('#create__account__clientId').style.cssText = ''
                    document.querySelector('#create__account__clientSecret').style.cssText = ''
                }, 2500)
            }
        }
        if (error.response.status >= 500) {
            document.querySelector('body').innerHTML += '<div class="server__error">Непредвиденная ошибка</div>'
        }
    })
})

// async function createAccount() {
//     let create__account__login = document.querySelector('#create__account__login').value
//     let create__account__password = document.querySelector('#create__account__password').value
//     let create__account__clientId = document.querySelector('#create__account__clientId').value
//     let create__account__clientSecret = document.querySelector('#create__account__clientSecret').value

//     authAxiosInstance({
//         url: `account`,
//         method: 'POST',
//         data: {
//             login: create__account__login,
//             password: create__account__password,
//             clientId: create__account__clientId,
//             clientSecret: create__account__clientSecret
//         }
//     }).then(res => {
//         if (res.status < 300) {
//             setTimeout(() => {
//                 location.reload()
//             }, 1500)
//         }
//         drawUsers(res.data.data)},
//     ).catch(error => {
//         if (error.response.status >= 400) {
//             console.log(error.response.data.info.errors)
//             if (error.response.data.info.errors.includes('Account not found')) {
//                 document.querySelector('#account__error').innerHTML += `<p style="color: red;">Аккаунт не найдет</p>`
//                 setTimeout(() => {
//                     document.querySelector('#account__error').innerHTML = ``
//                 }, 2500)
//             } else if (error.response.data.info.errors.includes('Incorrect data')) {
//                 document.querySelector('#account__error').innerHTML += `<p style="color: red;">Неправильные данные</p>`
//                 setTimeout(() => {
//                     document.querySelector('#account__error').innerHTML = ``
//                 }, 2500)
//             } else {
//                 document.querySelector('#create__account__login').style.cssText = 'border-bottom: 2px solid red;'
//                 document.querySelector('#create__account__password').style.cssText = 'border-bottom: 2px solid red;'
//                 document.querySelector('#create__account__clientId').style.cssText = 'border-bottom: 2px solid red;'
//                 document.querySelector('#create__account__clientSecret').style.cssText = 'border-bottom: 2px solid red;'
//                 setTimeout(() => {
//                     document.querySelector('#create__account__login').style.cssText = ''
//                     document.querySelector('#create__account__password').style.cssText = ''
//                     document.querySelector('#create__account__clientId').style.cssText = ''
//                     document.querySelector('#create__account__clientSecret').style.cssText = ''
//                 }, 2500)
//             }
//         }
//         if (error.response.status >= 500) {
//             document.querySelector('body').innerHTML += '<div class="server__error">Непредвиденная ошибка</div>'
//         }
//     })
// }