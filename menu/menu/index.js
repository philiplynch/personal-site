import { menuArray } from './data.js'

const menuItems = document.getElementById('menu-items')
const orderInfo = document.getElementById('order-info')
const paymentScreen = document.getElementById('payment-modal')

let totalPrice = 0
let fullOrder = []
let displayOrder
let buttonIsDisplayed = true
let orderPlaced = false

document.addEventListener("click", handleClick)

menuItems.innerHTML = menuArray.map(each => {
        return `
        <div class="menu-item">
            <div class="menu-item-picture">${each.emoji}</div>
            <div class="menu-item-description">
                <div class="menu-item-description-name">${each.name}</div>
                <div>Ingredients: ${each.ingredients}</div>
                <div>$${each.price}</div>
            </div>
            <div class="menu-item-add"><span class="circle" id=${each.id}>+</span></div>
        </div>
        
        `  }).join('')



function render() {
        
        totalPrice = fullOrder.reduce((accumulator, current) => {
            return accumulator + current.price; }, 0);
            
        if (totalPrice > 0) {buttonIsDisplayed = true}
        else {buttonIsDisplayed = false}
    
        displayOrder = fullOrder.map(each => { return `<div class="order-item"><div class="order-item-name">${each.name} </div> <div class="delete-button" id=${each.id}> delete</div></div>` }).join('')
    
        orderInfo.innerHTML = `<h2>Your order</h2>
        ${displayOrder ? displayOrder : "Nothing in your basket<br><br>"}
        Order Total: <span style="font-weight: bold">$${totalPrice}</span>
        <button id="proceed-button" class="${buttonIsDisplayed ? "button" : "button-hidden"}">Proceed</button>
        <br><br>
        ` 
        
     
}

function handleProceedButton() {
    document.getElementById('payment-modal').style.display = "block"
    paymentScreen.innerHTML = `
    <h2 class="card-details">Enter Card Details</h2><div class="exit-button" id="exit-button">X</div>
        <div class="card-form">
            <input type="text" name="name" class="card-form-input" placeholder="Your Name" value="1">
            <input type="text" name="ccnumber" class="card-form-input" placeholder="Credit Card Number" value="1">
            <input type="text" name="ccv" class="card-form-input" placeholder="CCV" value="1">
            <button name="submit" type="submit" class="button" id="submit">Submit</button>
        </div>
    
    `
}

function handleExitButton() {
    document.getElementById('payment-modal').style.display = "none"
}



function handleDelete(input) {
    fullOrder = fullOrder.filter(each => each.id !== input[0].id)
    render()
}

function handleClick(e) {
    
    let clickedItem = menuArray.filter(each => each.id == e.target.id)
    
    if (e.target.className == "circle" && orderPlaced == false) 
        {addItem(clickedItem)
        return 
        }
    else if (e.target.className == "circle" && orderPlaced == true) {
        console.log("you alreadey placed the order! WHAT DO YOU WANT1")
    }
          
    else if(e.target.className == "delete-button" && orderPlaced == false) {
        handleDelete(clickedItem)
        return
        }
        
    else if(e.target.id == "proceed-button" && orderPlaced == false) {
        handleProceedButton()
        return
    }
    
    else if(e.target.id == "exit-button" && orderPlaced == false) {
        handleExitButton()
        return
    }
    
    else if(e.target.id == "submit" && orderPlaced == false) {
        
        const yourname = document.querySelector('[name="name"]').value
        const ccnumber = document.querySelector('[name="ccnumber"]').value
        const ccv = document.querySelector('[name="ccv"]').value
        
        if (yourname == '' || ccnumber == '' || ccv == '') {
            console.log("Please fill all fields before proceeding.")
        }
        
        else {
        
        const minutesUntilReady = 20 + (fullOrder.length * 5)
        
        const orderReadyTime = new Date(Date.now() + 40 * 60 * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

        
        
        document.getElementById('payment-modal').style.display = "none"
        
        
        
        document.getElementById('extra').innerHTML = `<h2>Thank you for your Order!</h2>
        <div><h3>Order Summary:</h3> ${fullOrder.map(each => { return `<div>${each.name}</div>` }).join('')}</div>
        Order Total: <span style="font-weight: bold">$${totalPrice}</span>
        <div class="order-time">😊 Thanks for your order! You ordered ${fullOrder.length} items, therefore it'll be ready in about ${minutesUntilReady} minutes so drop by at the following time and it should be ready:<span class="ready-time"> ${orderReadyTime} </span></div>
        <br><br>
        
        ` 
        orderInfo.innerHTML = ""
        orderPlaced = true
        
        }
        
        return
    }
}

function addItem(input) {
    if (Array.isArray(input) && input.length > 0 && typeof input[0] === 'object') {
        const item = input[0];

        if (!fullOrder.some(orderItem => orderItem.name === item.name)) {
            fullOrder.push(item)
            render()
        } else {
            console.log("Sorry, you can only have one " + item.name);
            return;
        }
    } else {
        console.log("Invalid input: " + input);
        return;
    }
}
 
 


render()

