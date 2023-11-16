function getPosts() {
    authAxiosInstance({
        method: 'GET',
        url: "/post"
    }).then((res) => {
        drawPosts(res.data.data)
    })
}
getPosts()

function getAccs() {
    authAxiosInstance({
        method: 'GET',
        url: "/account"
    }).then(data => {
        let array = data.data.data

        var out = '';
        for (let i = 0; i < array.length; i++) {
            out += `<option value="${array[i].id}">${array[i].login}</option>`
        }
        document.querySelector('#create__post__account__id').innerHTML = out
    })
}
getAccs()

function drawPosts(posts) {
    for (let i = 0; i < posts.length; i++) {
        const postContainer = document.createElement('div')
        postContainer.classList = ["post-container"]
    
        const post = document.createElement('div')
        post.classList = ["post"]

        const info = document.createElement('div')
        info.classList = ["post-info"]
    
        const postTitle = document.createElement('p')
        postTitle.classList = ["post-title"]
        postTitle.innerHTML = posts[i].title
        info.appendChild(postTitle)

        const postType = document.createElement('p')
        postType.classList = ["post-type"]
        postType.innerHTML = `Тип:  <span class="bold">${posts[i].text ? 'текстовое' : 'изображение'}</span>`
        info.appendChild(postType)

        const postData = document.createElement('p')
        postData.classList = ["post-data"]
        postData.innerHTML = `Текст сообщения:<br>${posts[i].text ? posts[i].text : posts[i].imageUrl}`
        info.appendChild(postData)

        const postSubbreditNames = document.createElement('p')
        postSubbreditNames.classList = ["post-subbreditNames"]
        postSubbreditNames.innerHTML = `Сабредиты:  <span class="bold">${posts[i].subbreditNames.join(", ")}</span>`
        info.appendChild(postSubbreditNames)

        const postIsNSFW = document.createElement('p')
        postIsNSFW.classList = ["post-isNSFW"]
        postIsNSFW.innerHTML = `Это NSFW: <span class="bold">${posts[i].isNSFW ? 'Да' : 'Нет'}</span>`
        info.appendChild(postIsNSFW)

        const postPostIn = document.createElement('p')
        postPostIn.classList = ["post-postIn"]
        postPostIn.innerHTML = `${posts[i].send_at ? 'Время отправки:<br>' + new Date(new Date(posts[i].send_at).getTime()) : 'Время отправки отсутствует'}`
        postPostIn.innerHTML = `${posts[i].isSent ? '<span class="bold" style="color: #059e00">Отправлено</span>' : postPostIn.innerHTML}`
        info.appendChild(postPostIn)

        post.appendChild(info)


        const postBtns = document.createElement('div')
        postBtns.classList = ["post-buttons"]

        const stopBtn = document.createElement('div')
        stopBtn.classList = ["stop-post-btn"]
        stopBtn.innerHTML = `<div class="btn ${!posts[i].send_at || posts[i].isSent ? 'btn_hovered' : ''}">${!posts[i].send_at || posts[i].isSent ? 'Остановлено' : 'Остановить'}</div>`
        stopBtn.onclick = () => { stop(posts[i].id) }
        postBtns.appendChild(stopBtn)

        const editBtn = document.createElement('div')
        editBtn.classList = ["edit-post-btn"]
        editBtn.innerHTML = `<a id="${posts[i].id}_${posts[i].text ? 'текстовое' : 'изображение'}" class="open-popup2"> <div class="btn">Изменить</div> </a>`
        editBtn.onclick = () => { edit(posts[i].id) }
        postBtns.appendChild(editBtn)

        console.log(2)

        post.appendChild(postBtns)

        postContainer.appendChild(post)
        document.getElementsByClassName('posts')[0].appendChild(postContainer)
    }
    showPopup2()
}

async function stop(id) {
    authAxiosInstance({
        url: `post/stop/${id}`,
        method: 'POST'
    }).then((res) => {
        location.reload()
    })
}

async function edit(id) {
    console.log(id)
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

document.querySelector('#create__post__button').addEventListener('click', function (event) {
    let create__post__account__id = document.querySelector('#create__post__account__id').value

    let create__post__subreddit__names = document.querySelector('#create__post__subreddit__names').value.split(';')

    let create__post__title = document.querySelector('#create__post__title').value
    let create__post__text = document.querySelector('#create__post__text').value

    let create__post__image = document.querySelector('#create__post__image').value

    let create__post__time = new Date(document.querySelector('#create__post__time').value).getTime()
    //let time = create__post__time.getTime() + new Date().getTimezoneOffset() * 60 * 1000

    let create__post__isNSFW = document.querySelector('#create__post__isNSFW')
    let isNSFW = false
    if (create__post__isNSFW.checked) {
        isNSFW = true
    } else {
        isNSFW = false
    }

    authAxiosInstance({
        url: `post`,
        method: 'POST',
        data: {
            accountId: create__post__account__id,
            subbreditNames: (create__post__subreddit__names[0] === '' || create__post__subreddit__names[0] === "") ? [] : create__post__subreddit__names,
            title: Boolean(create__post__title) ? create__post__title : [],
            imageUrl: Boolean(create__post__image) ? create__post__image : null,
            text: Boolean(create__post__text) ? create__post__text : null,
            send_at: create__post__time,
            isNSFW: isNSFW
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
            if (error.response.data.info.errors.includes('Subreddit not found')) {
                document.querySelector('#create__error').innerHTML += `<p style="color: red;">Сабреддиты не найдены</p>`
                setTimeout(() => {
                    document.querySelector('#create__error').innerHTML = ``
                }, 2500)
            } else if (error.response.data.info.errors.includes('Account not found')) {
                document.querySelector('#create__error').innerHTML += `<p style="color: red;">Аккаунт не найден</p>`
                setTimeout(() => {
                    document.querySelector('#create__error').innerHTML = ``
                }, 2500)
            } else if (error.response.data.info.errors.includes('Or text post ot image post')) {
                document.querySelector('#create__error').innerHTML += `<p style="color: red;">Вы можете отправить только текстовый пост либо только пост с изображением</p>`
                setTimeout(() => {
                    document.querySelector('#create__error').innerHTML = ``
                }, 2500)
            } else {
                document.querySelector('#create__post__account__id').style.cssText = 'border-bottom: 2px solid red;'
                document.querySelector('#create__post__subreddit__names').style.cssText = 'border-bottom: 2px solid red;'
                document.querySelector('#create__post__title').style.cssText = 'border-bottom: 2px solid red;'
                document.querySelector('#create__post__text').style.cssText = 'border-bottom: 2px solid red;'
                document.querySelector('#create__post__image').style.cssText = 'border-bottom: 2px solid red;'
                document.querySelector('#create__post__time').style.cssText = 'border-bottom: 2px solid red;'
                document.querySelector('#create__post__isNSFW').style.cssText = 'border-bottom: 2px solid red;'
                setTimeout(() => {
                    document.querySelector('#create__post__account__id').style.cssText = ''
                    document.querySelector('#create__post__subreddit__names').style.cssText = ''
                    document.querySelector('#create__post__title').style.cssText = ''
                    document.querySelector('#create__post__text').style.cssText = ''
                    document.querySelector('#create__post__image').style.cssText = ''
                    document.querySelector('#create__post__time').style.cssText = ''
                    document.querySelector('#create__post__isNSFW').style.cssText = ''
                }, 2500)
            }
        }
        if (error.response.status >= 500) {
            document.querySelector('body').innerHTML += '<div class="server__error">Непредвиденная ошибка</div>'
        }
    })
})


function showPopup2(params) {
    let popupBg2 = document.querySelector('.popup__bg2');
    let popup2 = document.querySelector('.popup2');
    let openPopupButtons2 = document.querySelectorAll('.open-popup2');
    let closePopupButton2 = document.querySelector('.close-popup2');

    console.log(1)

    document.querySelectorAll('.open-popup2').forEach((button) => {
        button.addEventListener('click', (e) => {
            let arr = button.id.split('_')
            let id = arr[0]
            let type = arr[1]

            popupBg2.classList.add('active');
            popup2.classList.add('active');
            document.cookie = `postId=${id}`
            document.cookie = `postType=${type}`

            let label1 = document.querySelector('#change__text__label')
            let label2 = document.querySelector('#change__image__label')

            if (type === 'текстовое') {
                label2.innerHTML = ''
                label1.innerHTML = '<input id="change__post__text" type="text" name="tel"><div class="label__text">Текст</div>'
            }
            if (type === 'изображение') {
                label1.innerHTML = ''
                label2.innerHTML = '<input id="change__post__image" type="text" name="tel"><div class="label__text">Ссылка на изображение</div>'
            }
        })
    });

    closePopupButton2.addEventListener('click',() => {
        popupBg2.classList.remove('active')
        popup2.classList.remove('active');
    });

    document.addEventListener('click', (e) => {
        if(e.target === popupBg) {
            popupBg2.classList.remove('active');
            popup2.classList.remove('active');
        }
    });
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

document.querySelector('#change__post__button').addEventListener('click', function (event) {
    var re = /\s*;\s*/;
    let change__post__subreddit__names = document.querySelector('#change__post__subreddit__names').value.split(';')

    let change__post__title = document.querySelector('#change__post__title').value
    
    let change__post__text = ''
    let change__post__image = ''
    if (getCookie('postType') === 'текстовое') {
        change__post__text = document.querySelector('#change__post__text').value
    }
    if (getCookie('postType') === 'изображение') {
        change__post__image = document.querySelector('#change__post__image').value
    }

    let change__post__time = new Date(document.querySelector('#change__post__time').value).getTime()
    //let time = change__post__time.getTime() + new Date().getTimezoneOffset() * 60 * 1000

    let change__post__isNSFW = document.querySelector('#change__post__isNSFW')
    let isNSFW = false
    if (change__post__isNSFW.checked) {
        isNSFW = true
    } else {
        isNSFW = false
    }

    authAxiosInstance({
        url: `post`,
        method: 'PUT',
        data: {
            id: getCookie('postId'),
            subbreditNames: (change__post__subreddit__names[0] === '' || change__post__subreddit__names[0] === "") ? [] : change__post__subreddit__names,
            title: change__post__title,
            imageUrl: Boolean(change__post__image) ? change__post__image : null,
            text: Boolean(change__post__text) ? change__post__text : null,
            send_at: change__post__time,
            isNSFW: isNSFW
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
            if (error.response.data.info.errors.includes('Subreddit not found')) {
                document.querySelector('#change__error').innerHTML += `<p style="color: red;">Сабреддиты не найдены</p>`
                setTimeout(() => {
                    document.querySelector('#change__error').innerHTML = ``
                }, 2500)
            } else {
                document.querySelector('change__post__subreddit__names').style.cssText = 'border-bottom: 2px solid red;'
                document.querySelector('change__post__title').style.cssText = 'border-bottom: 2px solid red;'
                document.querySelector('change__post__text').style.cssText = 'border-bottom: 2px solid red;'
                document.querySelector('change__post__image').style.cssText = 'border-bottom: 2px solid red;'
                document.querySelector('change__post__time').style.cssText = 'border-bottom: 2px solid red;'
                document.querySelector('change__post__isNSFW').style.cssText = 'border-bottom: 2px solid red;'
                setTimeout(() => {
                    document.querySelector('change__post__subreddit__names').style.cssText = ''
                    document.querySelector('change__post__title').style.cssText = ''
                    document.querySelector('#change__post__text').style.cssText = ''
                    document.querySelector('#change__post__image').style.cssText = ''
                    document.querySelector('change__post__time').style.cssText = ''
                    document.querySelector('change__post__isNSFW').style.cssText = ''
                }, 2500)
            }
        }
        if (error.response.status >= 500) {
            document.querySelector('body').innerHTML += '<div class="server__error">Непредвиденная ошибка</div>'
        }
    })
})
