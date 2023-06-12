$(function () {
  // ==== 待辦事項文字框的 focus 事件及 blur 事件觸發 ===== //
  $("input.task_name").on("focus", function () {
    $(this).closest("div.task_add_block").addClass("-on");
    // 往父層找，找到第一個符合 div.task_add_block 的元素：
    //$("div.task_add_block").addClass("-on");
  });
  $("input.task_name").on("blur", function () {
    $(this).closest("div.task_add_block").removeClass("-on");
    //$("div.task_add_block").removeClass("-on");
  });

  // ==== text 欄位新增待辦事項 ===== //
  $("input.task_name").on("keyup", function (e) {
    //console.log(e.which);
    if (e.which == 13) {
      // 按下 Enter 鍵
      $("button.task_add").click();
    }
  });

  // 按下新增按鈕
  $("button.task_add").on("click", function () {
    let task_text = $("input.task_name").val().trim();
    if (task_text != "") {
      let list_html = "";

      list_html += "<li>";
      list_html += '<div class="item_flex">';
      list_html += '<div class="left_block">';
      list_html += '<div class="btn_flex">';
      list_html += '<button type="button" class="btn_up">往上</button>';
      list_html += '<button type="button" class="btn_down">往下</button>';
      list_html += "</div>";
      list_html += "</div>";
      list_html += '<div class="middle_block">';
      list_html += '<div class="star_block">';
      list_html +=
        '<span class="star" data-star="1"><i class="fas fa-star"></i></span>';
      list_html +=
        '<span class="star" data-star="2"><i class="fas fa-star"></i></span>';
      list_html +=
        '<span class="star" data-star="3"><i class="fas fa-star"></i></span>';
      list_html +=
        '<span class="star" data-star="4"><i class="fas fa-star"></i></span>';
      list_html +=
        '<span class="star" data-star="5"><i class="fas fa-star"></i></span>';
      list_html += "</div>";
      list_html += '<p class="para">' + task_text + "</p>";
      list_html +=
        '<input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="' +
        task_text +
        '">';
      list_html += "</div>";
      list_html += '<div class="right_block">';
      list_html += '<div class="btn_flex">';
      list_html += '<button type="button" class="btn_update">更新</button>';
      list_html += '<button type="button" class="btn_delete">移除</button>';
      list_html += "</div>";
      list_html += "</div>";
      list_html += "</div>";
      list_html += "</li>";

      /*
      let list_html = `
        <li>
          <div class="item_flex">
            <div class="left_block">
              <div class="btn_flex">
                <button type="button" class="btn_up">往上</button>
                <button type="button" class="btn_down">往下</button>
              </div>
            </div>
            <div class="middle_block">
              <div class="star_block">
                <span class="star" data-star="1"><i class="fas fa-star"></i></span>
                <span class="star" data-star="2"><i class="fas fa-star"></i></span>
                <span class="star" data-star="3"><i class="fas fa-star"></i></span>
                <span class="star" data-star="4"><i class="fas fa-star"></i></span>
                <span class="star" data-star="5"><i class="fas fa-star"></i></span>
              </div>
              <p class="para">${task_text}</p>
            </div>
            <div class="right_block">
              <div class="btn_flex">
                <button type="button" class="btn_update">更新</button>
                <button type="button" class="btn_delete">移除</button>
              </div>
            </div>
          </div>
        </li>
      `;
      */

      $("ul.task_list").prepend(list_html); //貼在最前面
      $("input.task_name").val(""); //取值
    }
  });
});

// ==== 移除待辦事項 ===== /

$("ul.task_list").on("click", "button.btn_delete", function () {
  let r = confirm("確認移除？");
  if (r) {
    $(this)
      .closest("li")
      .animate(
        {
          opacity: 0,
        },
        1000,
        "swing",
        function () {
          $(this).remove();
        }
      );
  }
});

$("button.btn_empty").on("click", function () {
  let r = confirm("確認清空？");
  if (r) {
    $("ul.task_list")
      .children("li")
      .animate(
        {
          opacity: 0,
        },
        1000,
        "swing",
        function () {
          $(this).remove();
        }
      );
  }
});

// ==== 更新待辦事項 ===== //
$("ul.task_list").on("click", "button.btn_update", function () {
  //console.log( $(this).attr("data-edit") );

  if ($(this).attr("data-edit") == undefined) {
    // 進入編輯狀態

    $(this).attr("data-edit", true);
    $(this).closest("li").find("p.para").toggleClass("-none");
    $(this).closest("li").find("input.task_name_update").toggleClass("-none");
  } else {
    let update_task_name = $(this)
      .closest("li")
      .find("input.task_name_update")
      .val()
      .trim();
    if (update_task_name == "") {
      alert("請輸入待辦事項");
    } else {
      $(this)
        .closest("li")
        .find("p.para")
        .html(update_task_name)
        .toggleClass("-none");
      $(this)
        .closest("li")
        .find("input.task_name_update")
        .val(update_task_name)
        .toggleClass("-none");
      $(this).removeAttr("data-edit");
    }
  }
});

// ==== 排序 ===== //
$("ul.task_list").on("click", "button.btn_up, button.btn_down", function () {
  // 往上
  if ($(this).hasClass("btn_up") && !$(this).closest("li").is(":first-child")) {
    let clone_html = $(this).closest("li").clone();
    //let clone_html = $(this).closest("li");
    $(this).closest("li").prev().before(clone_html);
    $(this).closest("li").remove();
  }

  // 往下
  if (
    $(this).hasClass("btn_down") &&
    !$(this).closest("li").is(":last-child")
  ) {
    let clone_html = $(this).closest("li").clone();
    //let clone_html = $(this).closest("li");
    $(this).closest("li").next().after(clone_html);
    $(this).closest("li").remove();
  }
});

// ==== 星號的重要性 ===== //
$("ul.task_list").on("click", "span.star", function (e) {
  let current_star = parseInt($(this).attr("data-star"));

  $(this)
    .closest("div.star_block")
    .find("span.star")
    .each(function (i, item) {
      if (parseInt($(this).attr("data-star")) <= current_star) {
        $(this).addClass("-on");
      } else {
        $(this).removeClass("-on");
      }
    });

  //排序
});
