$(() => {

    new Promise(function(resolve, reject) {
        $.ajax({
            type: "get",
            url: "../server/getPageCount.php",
            dataType: "json",
            success: (data) => {
                let res = "";
                for (let i = 0; i < data.count; i++) {
                    res += `<a href="javascript:;">${i + 1}</a>`
                }
                $("#page").html(res);
                $("#page").children().eq(0).addClass("active");

                resolve();
            }
        });
    }).then(function() {
        getDataWithPage(1, 0);
    })


    /* type ==0 默认排序  id */
    /* type ==1 升序排列  价格 */
    /* type ==2 降序排列  价格 */
    function getDataWithPage(page, type) {
        $.ajax({
            type: "get",
            url: "../server/getGoodsData.php",
            data: `page=${page}&sortType=${type}`,
            dataType: "json",
            success: (data) => renderUI(data)
        });
    }

    function renderUI(data) {
        console.log(data);

        let html = data.map((ele) => {
            return `
                <li class="item">
                    <div class="item-box">
                        <img src=${ele.src}>
                        <div class="price ">￥ ${ele.price}</div>
                        <div class="title ">${ele.title.substr(0,15)}</div>
                        <div class="dis ">${ele.disCount}</div>
                        <div class="storeName ">${ele.shopName}</div>
                    </div>
                </li>
            `
        }).join("");
        $(".box-list").html(html);
    }

    /* 先给页面添加点击事件，当点击的时候获取页码值，根据该值发送网络请求 */
    $("#page").on("click", "a", function() {
        getDataWithPage($(this).text());
        $(this).addClass("active").siblings().removeClass("active");
    })

    /* 处理排序 */
    $(".typeBtn").click(function() {
        getDataWithPage(1, $(this).index());
    })
})