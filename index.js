const passwordEl = document.querySelector('#password')
const upperCaseCheckEl = document.querySelector('#uppercase-check')
const numberCheckEl = document.querySelector('#number-check')
const symbolCheckEl = document.querySelector('#symbol-check')
const securityIndicatorBarEl = document.querySelector('#security-indicator-bar')

let passwordLength = 16

function generatePassword() {
    let chars = 'abcdefghjlmnpqrstuvwxyz'
    const upperCaseChars = "ABCDEFGHJLMNPQRSTUVWXYZ"
    const numberChars = "123456789"
    const symbolChars = "?!@&*()[]"


    if (upperCaseCheckEl.checked) {
        chars += upperCaseChars
    }
    if (numberCheckEl.checked) {
        chars += numberChars
    }
    if (symbolCheckEl.checked) {
        chars += symbolChars
    }

    let password = ""

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }
    passwordEl.value = password
    calculateQuality()
    calculateFonteSize()
}

function calculateQuality() {
    const percent = Math.round((passwordLength / 64) * 25 +
        (upperCaseCheckEl.checked ? 15 : 0) +
        (numberCheckEl.checked ? 25 : 0) +
        (numberCheckEl.checked ? 35 : 0))

    if (percent > 69) {
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.add('safe')
    } else if (percent > 50) {
        securityIndicatorBarEl.classList.remove('critical')
        securityIndicatorBarEl.classList.add('warning')
        securityIndicatorBarEl.classList.remove('safe')
    } else {
        securityIndicatorBarEl.classList.add('critical')
        securityIndicatorBarEl.classList.remove('warning')
        securityIndicatorBarEl.classList.remove('safe')
    }
    if (percent >= 100) {
        securityIndicatorBarEl.classList.add('complete')
    } else {
        securityIndicatorBarEl.classList.remove('complete')
    }
    securityIndicatorBarEl.style.width = `${percent}%`
}

function calculateFonteSize() {
    if (passwordLength > 55) {
        passwordEl.classList.remove("font-sm")
        passwordEl.classList.remove("font-xs")
        passwordEl.classList.remove("font-xxs")
        passwordEl.classList.remove("font-xxxs")
        passwordEl.classList.add("font-xxxxs")
    } else if (passwordLength > 50) {
        passwordEl.classList.remove("font-sm")
        passwordEl.classList.remove("font-xs")
        passwordEl.classList.remove("font-xxs")
        passwordEl.classList.add("font-xxxs")
        passwordEl.classList.remove("font-xxxxs")
    } else if (passwordLength > 39) {
        passwordEl.classList.remove("font-sm")
        passwordEl.classList.remove("font-xs")
        passwordEl.classList.add("font-xxs")
        passwordEl.classList.remove("font-xxxs")
        passwordEl.classList.remove("font-xxxxs")
    } else if (passwordLength > 26) {
        passwordEl.classList.remove("font-sm")
        passwordEl.classList.add("font-xs")
        passwordEl.classList.remove("font-xxs")
        passwordEl.classList.remove("font-xxxs")
        passwordEl.classList.remove("font-xxxxs")
        
    } else if (passwordLength > 13) {
        passwordEl.classList.add("font-sm")
        passwordEl.classList.remove("font-xs")
        passwordEl.classList.remove("font-xxs")
        passwordEl.classList.remove("font-xxxs")
        passwordEl.classList.remove("font-xxxxs")
        
    } else {
        passwordEl.classList.remove("font-sm")
        passwordEl.classList.remove("font-xs")
        passwordEl.classList.remove("font-xxs")
        passwordEl.classList.remove("font-xxxs")
        passwordEl.classList.remove("font-xxxxs")        
    }
}

function copy() {
    navigator.clipboard.writeText(passwordEl.value)
    console.log(passwordEl.value)
}

const passwordLenghtEl = document.querySelector('#password-length')
passwordLenghtEl.addEventListener('input', function () {
    passwordLength = passwordLenghtEl.value
    document.querySelector('#password-lenght-text').innerText = passwordLength
    generatePassword()
})

upperCaseCheckEl.addEventListener('click', generatePassword)
numberCheckEl.addEventListener('click', generatePassword)
symbolCheckEl.addEventListener('click', generatePassword)


document.querySelector('#copy-1').addEventListener('click', copy)
document.querySelector('#copy-2').addEventListener('click', copy)
document.querySelector('#renew').addEventListener('click', generatePassword)
generatePassword()


