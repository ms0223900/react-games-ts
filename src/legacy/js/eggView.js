function $all(all) {
    return document.querySelectorAll(all);
};
const eggScore = {
    egg(egg) {
        egg.container.forEach(function(e,w) {
            var score = Math.round(e.children[0].innerText);
            console.log(score);
            
            var li = e.children[1].children[0].getElementsByTagName('li');
            for(let i = 0; i < li.length ; i ++) {
                let img = li[i].children[0].getElementsByTagName('img')[0];
                img.src = egg.whiteEgg;
            }
            for(let i = 0; i < score ; i ++) {
                let img = li[i].children[0].getElementsByTagName('img')[0];
                img.src = egg.blackEgg;
            }
        })
    }
}
window.addEventListener('load', function(){
    eggScore.egg({
        container: $all('.score-container'),
        whiteEgg: 'images/eggEmpty.svg',
        blackEgg: 'images/eggFull.svg',
    });
});