export function viewProfile() {
    const btn = document.getElementsByClassName('viewProfile');
    //console.log(btn)
    var b = Array.from(btn);
    //console.log(b.length)
    for(let i=0; i<b.length; i++){
        btn[i].addEventListener('click', async function(){
            //console.log(btn[i].id)
            window.location.href = `https://3dhousemap.in/profile/${btn[i].id}`;
        })
    }
}