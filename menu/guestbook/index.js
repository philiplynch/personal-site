import { comments } from './data.js'
import Swal from 'sweetalert2';



document.getElementById('guestbook-entries').innerHTML = `<h1>Entries</h1>`
document.getElementById('submit').addEventListener("click", addComment)



function render() {
    
let tweets = comments.map(each => {
    return `
    <div class="entry">
        <div class="entry-name">${each.name}</div> <div class="entry-location">${each.location}</div>
        <div class="entry-comment">${each.comment}</div>
    </div>
    `
}).join('')

document.getElementById('guestbook-entries').innerHTML = tweets

}

function addComment() {
    
    if (document.getElementById('name').value === "" || document.getElementById('location').value === "" || document.getElementById('comments').value === "") {Swal.fire({
  title: 'Error!',
  text: "You didn't fill out all the fields",
  icon: 'error',
  confirmButtonText: 'Ok'
})}
    
    else {   
    const newComment = {
        name: document.getElementById('name').value,
        location: document.getElementById('location').value,
        comment: document.getElementById('comments').value
        }
        comments.unshift(newComment)
    }
    
    
    
    render()
}

render()