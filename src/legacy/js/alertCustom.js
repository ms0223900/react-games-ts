$(".food-button-buy").click(function(e) {
    e.preventDefault();
    swal({
        type: 'success',
        title: '你成功加入購物車',
        button: false,
        timer: 1500,
      });
  });