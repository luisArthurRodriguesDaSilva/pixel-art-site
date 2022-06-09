const caixona = document.querySelector('#pixel-board');
let colorsOfPallete = [];
let selected_color = 0;
const pixelBoard = document.querySelector('#pixel-board');
const paletaDiv = document.querySelector('#color-palette');
const wite =    'linear-gradient( 102.4deg,  rgba(250,250,250,1) 7.8%,  rgba(24,250,255,1) 100.3% )';
const bac =     'linear-gradient(31deg, rgba(61,116,180,0.9948354341736695) 12%, rgba(3,21,42,1) 39%, rgba(0,0,0,1) 68%, rgba(0,55,148,0.8715861344537815) 84%)';
function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

const addColorToPalet = (sizeOfPallet) =>{
    for(let i =0 ; i< sizeOfPallet;i+=1){
        const createColorOfPallet = document.createElement('div');
        createColorOfPallet.classList.add('color');
        createColorOfPallet.id=(i);
        createColorOfPallet.style.width=(screen.availWidth*0.9)/sizeOfPallet + 'px';
        createColorOfPallet.style.height = createColorOfPallet.style.width;
        paletaDiv.appendChild(createColorOfPallet);
    }
    let paletColors = document.querySelectorAll('.color');
    let k = 0;
    for(let i of paletColors){
        let MomentColor = randomColor();
        i.style.background = MomentColor;
        colorsOfPallete[k] = MomentColor;
        k+=1;
    }
    colorsOfPallete[0] = 'black';
    paletColors[0].style.background = 'black';
    paletColors[0].classList.add('selected');
    colorsOfPallete[1] = 'white';
    paletColors[1].style.background = '#ffffff';
}

const create_square = (size_of_canva) =>{
    var k = 0;
    for (let i = 0;i<size_of_canva**2;i+=1){
        if(i%size_of_canva == 0 || i==0){
            k+=1;
                const createLi = document.createElement('div');
                createLi.style.height = (screen.availWidth*0.5)/size_of_canva + 'px';
                //createLi.style.width = (screen.availWidth*0.7 + size_of_canva*4)+ 'px';
                createLi.classList.add('lik');
                caixona.appendChild(createLi);
        }
        let li_atual = document.querySelectorAll('.lik')[k-1];
        const createDiv = document.createElement('div');
        createDiv.classList.add('pixel');
        createDiv.id='linhado'
        createDiv.style.height = (screen.availWidth*0.5)/size_of_canva + 'px';
        createDiv.style.width =  createDiv.style.height;
        li_atual.appendChild(createDiv);
    }
}




addColorToPalet(50);
create_square(5);

const Selecting = (e) => {
    for (let i of e.target.parentNode.children){
        i.classList.remove('selected')
    }
    e.target.classList.add('selected');
    selected_color = parseInt(e.target.id);
}

for (let i of document.querySelectorAll('.color')){
    i.addEventListener('click',Selecting)
}

const colorizing = (e) =>{
    
    e.target.style.background = colorsOfPallete[selected_color];
}



const colorizingAll = (e) =>{
   for(let i of document.querySelectorAll('.pixel')){
       i.style.background=colorsOfPallete[selected_color];
       e.preventDefault();}
}


const conjuntoEssencial = () =>{
    for (let i of document.querySelectorAll('.pixel')){
        i.addEventListener('click',colorizing)
    }
    for (let i of document.querySelectorAll('.pixel')){
        i.addEventListener('mouseleave',(e)=>{
            console.log(e.buttons)
            if (e.buttons == 1){colorizing(e)}
        })
    }
    
    for (let i of document.querySelectorAll('.pixel')){
        i.addEventListener('contextmenu',colorizingAll)
    }
}

conjuntoEssencial();


document.querySelector('#clear-board').addEventListener('click',()=>{
    for(let i of document.querySelectorAll('.pixel'))
    { 
    i.style.background= '#ffffff';
}
});

const changeSizeCanva = (newSize) =>{
    for(let i of document.querySelectorAll('.lik')){i.parentNode.removeChild(i)}
    create_square(newSize);
    conjuntoEssencial();
    
}

const btnVqv = document.querySelector('#generate-board');
btnVqv.addEventListener('click',()=>{
    size_of_canva=document.querySelector('#board-size').value;
    if(size_of_canva == '') alert('Board inválido!');
    changeSizeCanva(size_of_canva);
    for (let k of document.querySelectorAll('.pixel')){
        k.addEventListener('click',colorizing)
    }
})

document.querySelector('#clear-lines').addEventListener('click',()=>{
    let pixels = document.querySelectorAll('.pixel');
    if (pixels[1].id == 'deslinhado'){
        //if(localStorage.getItem('darkmode') == 'true'){caixona.style.paddingBottom = 3 + 'px';}
        for(let i of pixels){
            i.id = 'linhado'
        }
    }
    else{
        if(localStorage.getItem('darkmode') == 'true'){caixona.style.paddingBottom = 0 + 'px';}
        for(let i of pixels){
            i.id = 'deslinhado'
        }
    }
})


const dls = document.querySelector('.material-symbols-outlined');
if (localStorage.getItem('darkmode') == 'null'){
    localStorage.setItem('darkmode',false);
}

const bode =document.querySelector('body');
const titl = document.querySelector('#title');
const btsOnPart = document.querySelectorAll('.part button');
const darkLight = document.querySelector('#dark-light');

const changeBackgrounds = (gradient) =>{
    
    bode.style.backgroundImage= '';
    bode.style.backgroundImage= gradient;
    console.log(gradient);
    console.log(bode.style.backgroundImage);
    //bode.style.MozBackground = gradient;
    //bode.style.WebkitBackground = gradient;
    //bode.style.background = gradient;
}

if(localStorage.getItem('darkmode') == 'true'){

    dls.innerText =  'dark_mode';
    gradient=bac;
    dls.style.color = 'white';
    titl.style.color = dls.style.color;
     //caixona.style.paddingBottom = 3 + 'px';
     document.querySelector('#pixel-board').style.border = '1px solid white';

        

    changeBackgrounds(gradient);
}
else  {
    caixona.style.paddingBottom = 0 + 'px';
}

const changeDarkLightMode = (e) =>{
    console.log('passei');
    


    if(dls.innerText=='dark_mode') {
        dls.innerText= 'light_mode';
        changeBackgrounds(wite);
        dls.style.color = 'black';
        titl.style.color = dls.style.color;
        document.querySelector('#pixel-board').style.border = '1px solid black';
        
        caixona.style.paddingBottom = 0 + 'px';
        localStorage.setItem('darkmode',false);

    }
    else {
        dls.innerText =  'dark_mode';
        changeBackgrounds(bac);
        dls.style.color = 'white';
        //for(p of document.querySelectorAll('.pixel')) {p.style.border = '1px solid white';}

        titl.style.color = dls.style.color;
        //if(document.querySelectorAll('.pixel')[1].id == 'linhado')caixona.style.paddingBottom = 3 + 'px';

        document.querySelector('#pixel-board').style.border = '1px solid white';
        

        localStorage.setItem('darkmode',true);
    }

    }


darkLight.addEventListener('click',changeDarkLightMode);

function download(source){
    const fileName = source.split('/').pop();    //furted by the guy who made this function on https://www.codegrepper.com/code-examples/javascript/javascript+download+image+from+url
	var el = document.createElement("a");
	el.setAttribute("href", source);
	el.setAttribute("download", fileName);
	document.body.appendChild(el);
 	el.click();
	el.remove();
}

const capture = () =>{
    html2canvas(document.querySelector('#pixel-board')).then(canvas => {
        let imgAdress = canvas.toDataURL("image/jpeg",1.0);
        download(imgAdress);
        
    });
}

document.querySelector('#btn-download').addEventListener('click',capture);