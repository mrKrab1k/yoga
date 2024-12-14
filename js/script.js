const tabs = () => {
    console.log('module is loaded');

    const infoHeaderTab = document.querySelectorAll('.info-header-tab')
    const infoTabcontent = document.querySelectorAll('.info-tabcontent')

    const hideALLTabContent = () => {
        for (let j=0 ; j < infoTabcontent.length; j++) {
            infoTabcontent[j].classList.remove('show') // типо тут добавили к классу show
            infoTabcontent[j].classList.add('hide') // типо тут добавили к классу hide
        }
    }
    const showTabContent = (n) => {
        hideALLTabContent()
        infoTabcontent[n].classList.add('show') // типо тут добавили к классу show
    }
    showTabContent(0)
    infoHeaderTab.forEach((infoTabcontent, index) => {
        infoTabcontent.addEventListener('click', () => {
            showTabContent(index)
        })
    })
}
const modal = () => {
    const modal = document.querySelector('.overlay')
    const more = document.querySelectorAll('.more_btn')
    const close = document.querySelector('.popup-close')

    more.forEach((btn) => {
        btn.addEventListener('click', () => {
            modal.style.display = 'flex' // Тут короче добавили окно
            document.body.style.overflow = 'hidden' // эээ , а это добавило скролл
        })     
    })

    modal.addEventListener('click', (e) => { // Тут событие клика и добавили (event)
        const target = e.target 
        if (target === modal || target === close){ // Тут если кликнули по модальному окну или по кнопке
            modal.style.display = 'none' 
            document.body.style.overflow = ''
        }
    })
}
const timer = () => {
    let deadline = '2024-12-31'
    const getTimeRemaining = (deadline) => {
        let t = Date.parse(deadline) - Date.parse(new Date())
        let seconds = Math.floor((t/1000)%60)
        let minutes = Math.floor((t/1000/60)%60)
        let hours = Math.floor((t/1000/60/60)%24)
        let days = Math.floor(t/(1000*60*60*24))
        
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
            'days': days
        }
    }
    const setTime = () => {
        let t = getTimeRemaining(deadline)

        const timer = document.getElementById('timer')
        const hours = timer.querySelector('.hours')
        const minutes = timer.querySelector('.minutes')
        const seconds = timer.querySelector('.seconds')
        const days = timer.querySelector('.days')

        function addZero(n) {return (n <= 9 ? '0' : '') + n;}

        hours.textContent = addZero(t.hours)
        minutes.textContent = addZero(t.minutes)
        seconds.textContent = addZero(t.seconds)
        days.textContent = addZero(t.days)

        if (t.total <= 0) {
            clearInterval(timeInterval)
            hours.textContent = '00'
            minutes.textContent = '00'
            seconds.textContent = '00'
            days.textContent = '00'
        }   
    }
    let timeInterval = setInterval(setTime, 1000)
}
const slider = () => {
    let slideIndex = 1
    const slides = document.querySelectorAll('.slider-item')
    const dots = document.querySelectorAll('.dot')
    const prev = document.querySelector('.prev')
    const next = document.querySelector('.next')

    const showSlide = (n) => {
        slides.forEach((item, index) => {
            item.style.display = 'none'
            dots[index].classList.remove('dot-active')
        })  

        if (n>slides.length) {slideIndex = 1}
        if (n<1) {slideIndex = slides.length}
        slides[slideIndex-1].style.display = 'block'
        dots[slideIndex-1].classList.add('dot-active')
    }

    showSlide(slideIndex)

    const swapSlide = (n) => {
        showSlide(slideIndex += n)
    }    
    const currentSlide = (n) => {
        showSlide(slideIndex = n)        
    }

    dots.forEach((dot,index) => {
        dot.addEventListener('click', () =>{
            currentSlide(index+1)
        })
    })

    next.addEventListener('click', (e) => {
        swapSlide(1)
    })
    prev.addEventListener('click', (e) => {
        swapSlide(-1)
    })
}
const calc = () => {
    const person = document.getElementById('cbi1')
    const restdays = document.getElementById('cbi2')
    const place = document.getElementById('select')
    const totalValue = document.getElementById('total')
    let personSum = 0
    let daysSum = 0
    let total = 0

    totalValue.textContent = 0

    person.addEventListener('change', () => {
        personSum = +person.value
        total = (personSum*daysSum)*10000
        if (restdays.value == '') {
            totalValue.innerHTML = 0
        } else {totalValue.innerHTML = total}
    })  
    restdays.addEventListener('change', () => {
        daysSum = +restdays.value
        total = (personSum*daysSum)*10000
        if (person.value == ''){
            totalValue.innerHTML = 0
        } else {totalValue.innerHTML = total}
    })
    place.addEventListener('input', function() {
        let a = total
        totalValue.innerHTML = a*place.value
    })

}
const form_sender = () => {
    const form = document.getElementById('contacts')
    const phone = form.querySelector('input[name="phone"]')
    const email = form.querySelector('input[name="email"]')

    const token = '6425762718:AAEiaHtm9HeOcNzlqxrMzwiOA7gR9WVWCF4'
    const chatid = '1943633073'
    const url = `https://api.telegram.org/bot${token}/sendMessage`

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const user = {
            email: email.value,
            phone: phone.value
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatid,
                text: `Новый клиент:\n Email:${email.value}\nPhone:${phone.value}`
            }),
        })
        .then((data)=>{
            email.value = ''
            phone.value = ''
        })
        .catch((err)=>{
            alert('Сервер временно недоступен')
        })
    })

}

tabs()
modal()
timer()
slider()
calc()
form_sender()