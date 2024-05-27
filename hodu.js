const Top = document.querySelector("header").offsetHeight;

rollUp = () => {
    window.scrollTo({ top: Top, behavior: 'smooth'})
}
// window.onload = function () {
//     const imgMore = document.querySelector('.more_img');
//     const showMore = document.querySelector('.show_more');
//     const imgAddNum = 6;
//
//     console.log('Before addEventListener');
//
//     showMore.addEventListener('click', async function () {
//         console.log('Button clicked');
//
//         if (imgMore.style.display === 'none') {
//             imgMore.style.display = 'block';
//             showMore.textContent = 'Show Less';
//
//             // Picsum Photos 에서 이미지 가져오기
//             for (let i = 0; i < imgAddNum; i++) {
//                 const randomId = Math.floor(Math.random() * 1000);
//                 const response = await fetch(`https://picsum.photos/id/${randomId}/500/300`);
//                 const blob = await response.blob();
//                 const imageUrl = URL.createObjectURL(blob);
//                 const img = document.createElement('img');
//                 img.src = imageUrl;
//                 imgMore.appendChild(img);
//             }
//         } else {
//             imgMore.style.display = 'none';
//             showMore.textContent = 'Show More';
//
//             // 이미지들 제거
//             imgMore.innerHTML = '';
//         }
//     });
//
//     console.log('After addEventListener');
// };


const listPic = document.querySelector('.more_img');
const btn = document.querySelector('.show_more');
let pageToPatch = 1;


btn.addEventListener('click', ()=>{fetchImages(pageToPatch += 1)});

async function fetchImages(page){
    try{
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=6`);

        if(!response.ok){
            throw new Error('네트워크 응답에 문제가 있습니다.');
        }

        // 제이슨 데이터를 자바스크립트 객체로 파싱
        const datas = await response.json();
        console.log(datas);
        makeImageList(datas);

    }catch(error){
        console.error(error);
    }
}

function makeImageList(datas){
    datas.forEach((data)=>{
        listPic.insertAdjacentHTML('beforeend', `<li class="img-width"><img src="${data.download_url}" alt=""></li>`);
    });
}

function show () {
    document.querySelector(".background").className = "background show";
}

function close () {
    document.querySelector(".background").className = "background";
}

document.querySelector("#show").addEventListener('click', show);
document.querySelector("#close").addEventListener('click', close);


