import { projects } from './data.js'
const projectList = document.getElementById('opus')

const projectsHtml = projects.map(each => { return `
        <div class="project-card">
            <h3 class="project-title"><a href="#${each.url}">${each.name}</a></h3>
            <p class="completed-on">Completed on: ${each.completed_on}</p>
            <p class="description">${each.description}</p>
                <ul class="js-concepts-used">
                    ${each.jsconcepts.map(each => {return `<li>${each.slice(0)}</li>`}).join('')}
                </ul>
        </div>`
    })

function render() {
    projectList.innerHTML = projectsHtml
}

render()