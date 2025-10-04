//https://www.youtube.com/watch?v=Q7AOvWpIVHU was used to help learn three.js
//https://threejs.org/ was used to help build the three.js

/*
        IMPORTS
*/

import './styles.css';
import * as THREE from 'three';
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

//link email service using my public key
(function(){emailjs.init({publicKey: "JsP_rpfllrT-t1dqu",});})();





/*
        THREE.JS
*/

//create the 3d scene
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#background')});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//make sure canvas changes size when the user changes the 
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//create the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let rotatePlanet = true;

//get the components needed to load the 3d models
const loader = new GLTFLoader();
let planet = new THREE.Group();
let mixer;
let clock = new THREE.Clock();

//load the planet model
loader.load("resources/planet.glb", (gltf) => {
    planet.add(gltf.scene); 
	mixer = new THREE.AnimationMixer( gltf.scene );
    gltf.animations.forEach(anim => {
        let action = mixer.clipAction(anim);
        action.timeScale = 0.5;
	    action.play();
    })
});

//load the clouds
const cloudCount = 25;
const cloudDistance = 70;
let cloudArray = [];
for(let i = 0; i < cloudCount; i++) {
    loader.load("resources/cloud.glb", (gltf) => {
        let cloudMeshScene = gltf.scene;
        let cloudMeshMaterial = new THREE.MeshStandardMaterial ({
            color: 0xFFFFFF
        });
        let cloudMeshGeometry;
        cloudMeshScene.children[0].traverse(o => {
            if (o.isMesh) {
                cloudMeshGeometry = o.geometry;
            }
        });
        let cloudMesh = new THREE.Mesh(cloudMeshGeometry, cloudMeshMaterial);
        let scale = Math.random()*30 + 30;
        cloudMesh.scale.set(scale, scale, scale);
        cloudMesh.rotation.set(Math.random(0,1)*360,Math.random(0,1)*360,Math.random(0,1)*360);
        let x = (Math.random() * 2) - 1;
        let y = (Math.random() * 2) - 1;
        let z = (Math.random() * 2) - 1;
        cloudMesh.position.set((x/(Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2))))*(cloudDistance + (Math.random()*10)),(y/(Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2))))*(cloudDistance + (Math.random()*10)),(z/(Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2))))*(cloudDistance + (Math.random()*10)));
        let cloudParent = new THREE.Object3D();
        cloudParent.add(cloudMesh);
        cloudParent.rotation.set(Math.random(0,1)*360,Math.random(0,1)*360,Math.random(0,1)*360);
        cloudArray.push(cloudParent);
        planet.add(cloudParent);
    });
}

//create the lights
const dirLight = new THREE.DirectionalLight(`#ffffff`,1.5);
const ambientLight = new THREE.AmbientLight('#ffffff', 1);

//add all the objects to the scene
scene.add(planet, dirLight, ambientLight);

//add the blue sky background
scene.background = new THREE.TextureLoader().load('resources/images/sky.jpg');

//set the inital camera position
let cameraTargetPos = new THREE.Vector3(60,5,100);
let cameraTargetRot = new THREE.Euler(0,0,0);
let planetTargetRot = new THREE.Euler(0,0,0);
camera.position.set(60,5,100);

//get each of the panels
let homePanel = document.querySelector('#homePanel');
let cityPanel = document.querySelector('#cityPanel');
let energyPanel = document.querySelector('#energyPanel');
let waterPanel = document.querySelector('#waterPanel');
let teamPanelA = document.querySelector('#teamPanelA');
let teamPanelB = document.querySelector('#teamPanelB');
let teamPanelC = document.querySelector('#teamPanelC');
let formConfirmationContent = document.querySelector('#formConfirmationContent');

//functions that are called when nav buttons are pressed
let homeFunction = () => {
    //make the planet start rotating
    rotatePlanet = true;

    //reset the scroll
    window.scrollTo(0,0); 

    //move the camera
    cameraTargetPos = new THREE.Vector3(60,5,100);
    cameraTargetRot = new THREE.Euler(0,0,0);

    //rotate the planet
    planetTargetRot = new THREE.Euler(0,0,0);

    //highlight the correct nav button and show the correct panel
    togglePanels(homePanel);
    styleButtons(homeButton, homeButtonMobile);
    if (window.history.state !== 'home' && window.history.state !== null) {
        window.history.pushState('home', '', '/');
    }
}

let cityFunction = () => {
    //make the planet stop rotating
    rotatePlanet = false;

    //reset the scroll
    window.scrollTo(0,0); 

    //move the camera
    cameraTargetPos = new THREE.Vector3(0,55,0);
    cameraTargetRot = new THREE.Euler(0,0,0);

    //rotate the planet
    planetTargetRot = new THREE.Euler(6.14,2.86,0);

    //highlight the correct nav button and show the correct panel
    togglePanels(cityPanel);
    styleButtons(cityButton, cityButtonMobile);
    if (window.history.state !== 'city') {
        window.history.pushState('city', '', '/city');
    }
}

let energyFunction = () => {
    //make the planet stop rotating
    rotatePlanet = false;

    //reset the scroll
    window.scrollTo(0,0); 

    //move the camera
    cameraTargetPos = new THREE.Vector3(0,55,0);
    cameraTargetRot = new THREE.Euler(6.19,0.19,0);

    //rotate the planet
    planetTargetRot = new THREE.Euler(1.24,1.57,0.05);

    //highlight the correct nav button and show the correct panel
    togglePanels(energyPanel);
    styleButtons(energyButton, energyButtonMobile);
    if (window.history.state !== 'energy') {
        window.history.pushState('energy', '', '/energy');
    }
}

let waterFunction = () => {
    //make the planet stop rotating
    rotatePlanet = false;

    //reset the scroll
    window.scrollTo(0,0); 

    //move the camera
    cameraTargetPos = new THREE.Vector3(0,55,0);
    cameraTargetRot = new THREE.Euler(5.67,0.05,0);

    //rotate the planet
    planetTargetRot = new THREE.Euler(4.43,0.52,6.95);

    //highlight the correct nav button and show the correct panel
    togglePanels(waterPanel);
    styleButtons(waterButton, waterButtonMobile);
    if (window.history.state !== 'water') {
        window.history.pushState('water', '', '/water');
    }
}

let teamFunction = () => {
    //make the planet stop rotating
    rotatePlanet = false;

    //reset the scroll
    window.scrollTo(0,0); 

    //move the camera
    cameraTargetPos = new THREE.Vector3(0,55,0);
    cameraTargetRot = new THREE.Euler(0,2.52,0);

    //rotate the planet
    planetTargetRot = new THREE.Euler(1,6.57,3.9);

    //highlight the correct nav button and show the correct panel
    togglePanels(teamPanelA);
    teamPanelB.setAttribute('class', 'activePanel');
    teamPanelC.setAttribute('class', 'activePanel');
    styleButtons(teamButton, teamButtonMobile);
    if (window.history.state !== 'team') {
        window.history.pushState('team', '', '/team');
    }
}

let formFunction = () => {
    //make the planet start rotating
    rotatePlanet = true;

    //reset the scroll
    window.scrollTo(0,0); 

    //move the camera
    cameraTargetPos = new THREE.Vector3(60,5,100);
    cameraTargetRot = new THREE.Euler(0,0,0);

    //rotate the planet
    planetTargetRot = new THREE.Euler(0,0,0);

    //highlight the correct nav button and show the correct panel
    togglePanels(formPanel);
    styleButtons(formButton, formButtonMobile);
    if (window.history.state !== 'form') {
        window.history.pushState('form', '', '/form');
    }
}

// handle back button
addEventListener('popstate', event => {
    switch (event.state) {
        case 'city':
            cityFunction();
            break;
        case 'energy':
            energyFunction();
            break;
        case 'water':
            waterFunction();
            break;
        case 'team':
            teamFunction();
            break;
        case 'form':
            formFunction();
            break;
        case 'home':
        default:
            homeFunction();
            break;
    }
})

//get each of the buttons
let homeButton = document.querySelector('#homeButton');
let cityButton = document.querySelector('#cityButton');
let energyButton = document.querySelector('#energyButton');
let waterButton = document.querySelector('#waterButton');
let teamButton = document.querySelector('#teamButton');
let formButton = document.querySelector('#formButton');
let homeButtonMobile = document.querySelector('#homeButtonMobile');
let cityButtonMobile = document.querySelector('#cityButtonMobile');
let energyButtonMobile = document.querySelector('#energyButtonMobile');
let waterButtonMobile = document.querySelector('#waterButtonMobile');
let teamButtonMobile = document.querySelector('#teamButtonMobile');
let formButtonMobile = document.querySelector('#formButtonMobile');

//assign the corresponding function to each of the buttons
homeButton.parentElement.addEventListener('click', homeFunction);
cityButton.parentElement.addEventListener('click', cityFunction);
energyButton.parentElement.addEventListener('click', energyFunction);
waterButton.parentElement.addEventListener('click', waterFunction);
teamButton.parentElement.addEventListener('click', teamFunction);
formButton.parentElement.addEventListener('click', formFunction);
homeButtonMobile.parentElement.addEventListener('click', homeFunction);
cityButtonMobile.parentElement.addEventListener('click', cityFunction);
energyButtonMobile.parentElement.addEventListener('click', energyFunction);
waterButtonMobile.parentElement.addEventListener('click', waterFunction);
teamButtonMobile.parentElement.addEventListener('click', teamFunction);
formButtonMobile.parentElement.addEventListener('click', formFunction);

//called to show the correct panel
let togglePanels = (activePanel) => {
    homePanel.setAttribute('class', 'hiddenPanel');
    cityPanel.setAttribute('class', 'hiddenPanel');
    energyPanel.setAttribute('class', 'hiddenPanel');
    waterPanel.setAttribute('class', 'hiddenPanel');
    teamPanelA.setAttribute('class', 'hiddenPanel');
    teamPanelB.setAttribute('class', 'hiddenPanel');
    teamPanelC.setAttribute('class', 'hiddenPanel');
    formPanel.setAttribute('class', 'hiddenPanel');
    formConfirmationContent.setAttribute('class', 'hiddenContent');
    activePanel.setAttribute('class', 'activePanel');
}

//called to highlight the correct button
let styleButtons = (activeButton, activeButtonMobile) => {
    homeButton.setAttribute('class', 'inactiveNav');
    cityButton.setAttribute('class', 'inactiveNav');
    energyButton.setAttribute('class', 'inactiveNav');
    waterButton.setAttribute('class', 'inactiveNav');
    teamButton.setAttribute('class', 'inactiveNav');
    formButton.setAttribute('class', 'inactiveNav');
    homeButtonMobile.setAttribute('class', 'inactiveNav');
    cityButtonMobile.setAttribute('class', 'inactiveNav');
    energyButtonMobile.setAttribute('class', 'inactiveNav');
    waterButtonMobile.setAttribute('class', 'inactiveNav');
    teamButtonMobile.setAttribute('class', 'inactiveNav');
    formButtonMobile.setAttribute('class', 'inactiveNav');
    activeButton.setAttribute('class', 'activeNav');
    activeButtonMobile.setAttribute('class', 'activeNav');
}

//runs every frame
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    //make sure baked animations run
    if (mixer) {
        mixer.update(clock.getDelta());
    }

    //make sure the planet rotates on its own if needed
    if (rotatePlanet && planet) {
        planet.rotation.x += 0.001;
        planet.rotation.y += 0.0005;
        planet.rotation.z += 0.001;
    }
    //if not, slerp towards it's desired rotation
    else if (planet) {
        planet.quaternion.slerp(new THREE.Quaternion().setFromEuler(planetTargetRot), 0.03);
    }

    //make each of the clouds rotate around the planet
    cloudArray.forEach((cloud) => {
        cloud.rotation.x -= 0.0001;
        cloud.rotation.y -= 0.0005;
        cloud.rotation.z -= 0.0001;
        cloud.children[0].lookAt(0,0,0);
    });

    //make the camera lerp towards its desired location and rotation
    camera.position.lerp(cameraTargetPos, 0.06);
    camera.quaternion.slerp(new THREE.Quaternion().setFromEuler(cameraTargetRot), 0.03);

    //make the scene always light up from the camera's position
    dirLight.position.set(camera.position.x,camera.position.y,camera.position.z);
}





/*
        JSON CONTENT LOADING
*/

//called to load all of the necessary content from JSON files
function loadContent() {
    loadGoalContent('cities', '#cityContentA', '#cityContentB');
    loadGoalContent('energy', '#energyContentA', '#energyContentB');
    loadGoalContent('water', '#waterContentA', '#waterContentB');
    loadHomePageContent();
    loadTeamPageContent();
    loadTitleContent();
}

//load the content for the home page
function loadHomePageContent() {
    fetch('resources/json/homepage.json')
        .then(res => res.json())
        .then(data => {
            const contentAEle = document.getElementById('homeContentA');
            const contentBEle = document.getElementById('homeContentB');

            const headingA = document.createElement('h2');
            const paraA = document.createElement('p');
            headingA.textContent = data.contentA.heading;
            paraA.textContent = data.contentA.para;
            contentAEle.appendChild(headingA);
            contentAEle.appendChild(paraA);

            const headingB = document.createElement('h2');
            const paraB = document.createElement('p');
            headingB.textContent = data.contentB.heading;
            paraB.textContent = data.contentB.para;
            contentBEle.appendChild(headingB);
            contentBEle.appendChild(paraB);
        })
}

//load the content for the team page
function loadTeamPageContent() {
    fetch('resources/json/teams.json')
        .then(res => res.json())
        .then(data => {
            for (const member of data.members) {
                let contentEle = document.querySelector(`#teamContent${member.id}`);
                
                const nameEle = document.createElement('h3');
                nameEle.textContent = member.name;
                contentEle.appendChild(nameEle);

                const roleEle = document.createElement('p');
                roleEle.textContent = `Role: ${member.role}`;
                contentEle.appendChild(roleEle);

                const imageElement = document.createElement('img');
                imageElement.src = member.image;
                contentEle.appendChild(imageElement);

                const workPara = document.createElement('p');
                const workList = document.createElement('ol');
                workList.classList.add('inside-marker');
                for (const line of member.work) {
                    const liEle = document.createElement('li');
                    liEle.textContent = line;
                    workList.appendChild(liEle);
                }
                workPara.appendChild(workList);
                contentEle.appendChild(workPara);
            }
        })
}

//load the content for the goal page
function loadGoalContent(jsonFile, idA, idB) {
    fetch(`resources/json/goals/${jsonFile}.json`)
        .then(response => response.json())
        .then(responseData => {
            let articleElementA = document.querySelector(idA);
            let articleElementB = document.querySelector(idB);
            
            let titleElement = document.createElement('h2');
            titleElement.textContent = responseData.title;

            let subheadingElement = document.createElement('h3');
            subheadingElement.textContent = responseData.subheading;

            let linkElement = document.createElement('a');
            linkElement.textContent = 'More info...';
            linkElement.href = responseData.un_link

            let imageElement = document.createElement('img');
            imageElement.src = responseData.image;
            imageElement.alt = `Image showing ${responseData.title} goals`

            let textTitleElement = document.createElement('h2');
            textTitleElement.textContent = "Description";

            let mainTextElement = document.createElement('p');
            mainTextElement.textContent = responseData.text;

            articleElementA.appendChild(titleElement);
            articleElementA.appendChild(subheadingElement);
            articleElementA.appendChild(linkElement);
            articleElementA.appendChild(document.createElement('br'));
            articleElementA.appendChild(imageElement);
            articleElementB.appendChild(textTitleElement);
            articleElementB.appendChild(mainTextElement);
        })
}

//load the content for each of the titles
function loadTitleContent() {
    fetch(`resources/json/titles.json`)
        .then(response => response.json())
        .then(responseData => {
            let homeTitle = document.querySelector('#homeButtonTitle');
            let cityTitle = document.querySelector('#cityButtonTitle');
            let energyTitle = document.querySelector('#energyButtonTitle');
            let waterTitle = document.querySelector('#waterButtonTitle');
            let teamTitle = document.querySelector('#teamButtonTitle');
            let formTitle = document.querySelector('#formButtonTitle');
            let homeTitleMobile = document.querySelector('#homeButtonTitleMobile');
            let cityTitleMobile = document.querySelector('#cityButtonTitleMobile');
            let energyTitleMobile = document.querySelector('#energyButtonTitleMobile');
            let waterTitleMobile = document.querySelector('#waterButtonTitleMobile');
            let teamTitleMobile = document.querySelector('#teamButtonTitleMobile');
            let formTitleMobile = document.querySelector('#formButtonTitleMobile');
            let formMainTitle = document.querySelector('#formTitle');
            let formFirstName = document.querySelector('#formFirstNameTitle');
            let formSecondName = document.querySelector('#formSecondNameTitle');
            let formEmail = document.querySelector('#formEmailTitle');
            let formMessage = document.querySelector('#formMessageTitle');
            let formRequired = document.querySelector('#formRequiredTitle');

            homeTitle.textContent = responseData.buttons.home;
            cityTitle.textContent = responseData.buttons.city;
            energyTitle.textContent = responseData.buttons.energy;
            waterTitle.textContent = responseData.buttons.water;
            teamTitle.textContent = responseData.buttons.team;
            formTitle.textContent = responseData.buttons.form;

            homeTitleMobile.textContent = responseData.mobileButtons.home;
            cityTitleMobile.textContent = responseData.mobileButtons.city;
            energyTitleMobile.textContent = responseData.mobileButtons.energy;
            waterTitleMobile.textContent = responseData.mobileButtons.water;
            teamTitleMobile.textContent = responseData.mobileButtons.team;
            formTitleMobile.textContent = responseData.mobileButtons.form;

            formMainTitle.textContent = responseData.form.title;
            formFirstName.textContent = responseData.form.firstName;
            formSecondName.textContent = responseData.form.secondName;
            formEmail.textContent = responseData.form.email;
            formMessage.textContent = responseData.form.message;
            formRequired.textContent = responseData.form.required;
        })
}





/*
        FORM HANDLING
*/

//get each element within the form
let submitButton = document.querySelector('#submitButton');
let formFirstName = document.querySelector('#formFirstName');
let formSecondName = document.querySelector('#formSecondName');
let formEmail = document.querySelector('#formEmail');
let formMessage = document.querySelector('#formMessage');
let formConfirmationHeader = document.querySelector('#formConfirmationHeader');
let formConfirmationText = document.querySelector('#formConfirmationText');
let form = document.querySelector('form');

//add an event when the submit button is pressed
form.addEventListener('submit', event => {
    event.preventDefault();
    formConfirmationContent.setAttribute('class', 'hiddenContent');

    //change the text in the submit button
    submitButton.value="Sending..."

    //create an object to store the form information in
    const formObject = {
        firstName:formFirstName.value,
        secondName:formSecondName.value,
        email:formEmail.value,
        message:formMessage.value
    }

    //send a POST request to server.js
    fetch('/submit', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(formObject)
    })

    //format the reponse into a JSON format
    .then(response => response.json())

    //when the data is recieved
    .then(data => {
        //send an email.js request using my service id and the correct template id
        emailjs.send('service_u2lzh7b', 'template_oqoj6dp', {
            first_name: data.firstName,
            second_name: data.secondName,
            message: data.message
        })

        //once the email request has been sent
        .then(
            //if the request is successful
            (response) => {
                //change the text in the submit button
                submitButton.value="Sent!";

                //show the confirmation panel with the correct text
                formConfirmationContent.setAttribute('class', 'activeContent');
                formConfirmationHeader.textContent="Success!"
                formConfirmationText.textContent=`Hey ${data.firstName} ${data.secondName}! Your message has been received and we will contact you at ${data.email}`;
            },
            //if there is an error
            (error) => {
                //change the text in the submit button
                submitButton.value="Send Message";

                //show the confirmation panel with the correct text
                formConfirmationContent.setAttribute('class', 'activeContent');
                formConfirmationHeader.textContent="Failure"
                formConfirmationText.textContent=`An error occured while proccessing your email. Please try again`;
            },
        );  
    })
    //if there is an error with the POST request
    .catch(error => {
        console.error('Error:', error);
    });
})

loadContent();
animate();

// set current page based on location
switch (window.location.pathname) {
    case '/city':
        cityFunction();
        break;
    case '/energy':
        energyFunction();
        break;
    case '/water':
        waterFunction();
        break;
    case '/team':
        teamFunction();
        break;
    case '/form':
        formFunction();
        break;
}