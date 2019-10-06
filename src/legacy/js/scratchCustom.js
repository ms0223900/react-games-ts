getScratchBonus();
function getScratchBonus() {
    var bonus;
    var url = updateBonus.php;
    let promoCode = '';
    const bg1 = 'images/scratchCard_181105-011.png';
    const bg2 = 'images/scratchCard_181105-022.png';
    const bg3 = 'images/scratchCard_181105-033.png';
    const bgArray= [ bg1, bg2, bg3 ];
    selectBG = bgArray[Math.floor(Math.random() * bgArray.length)];
    if (selectBG == bg1) {
        promoCode = '購物金50元';
        bonus = 50;    
    } else if (selectBG == bg2) {
        promoCode = '購物金30元';
        bonus = 30;
    } if (selectBG == bg3) {
        promoCode = '購物金10元';
        bonus = 10;
    }

    $('#promo').wScratchPad({
        // the size of the eraser
        size        : 50,    
        // the randomized scratch images   
        bg:  selectBG,
        // give real-time updates
        realtime    : true, 
        // The overlay images
        fg: 'images/scratchCard_181105-04.png',
        // The cursor (coin) images
        'cursor': 'url(images/icon/coin.png) 5 5, default',
        
        scratchMove(e, percent) {
            // Show the plain-text promo code and call-to-action when the scratch area is 50% scratched
            if ((percent > 70) && (promoCode != '')) {
                
                if($('.promo-container')) {
                    $('.promo-container').show();
                    url = 'updateBonus.php?bonus=' + bonus;
                    updateBonus();
                    updateBonus = null;
                }
                $('body').removeClass('not-selectable');
                $('.promo-code').html(`<h1>您的購物金</h1>${promoCode}`);
                }
                
        }
    });

    document.querySelector('.btn').addEventListener('click',() => {
        document.querySelector('.promo-container').style.display = 'none';
        document.querySelector('.scrach-card').removeChild(document.querySelector('.scrach-card').children[1]);
    });
    
    function updateBonus() {
        xhr = new XMLHttpRequest();
		xhr.onload = function() {
			if (xhr.status == 200) {
				// location.href = 'dishes.php';
			} else {
				
			}
		}
		xhr.open("post", url, true); //設定好所要連結的程式
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded"); 
        xhr.send(null); //送出資料
    }
}

