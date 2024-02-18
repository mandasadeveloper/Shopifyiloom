$(document).ready(function(){
  var article_mobile = $('.mandasa_article_head').attr('article-show-mobile');
  console.log(article_mobile);
  $(".mandasa_content").slice(0, article_mobile).show();
  $("#loadMore").on("click", function(e){
    e.preventDefault();
    $(".mandasa_content:hidden").slice(0, article_mobile).slideDown();
    if($(".mandasa_contentt:hidden").length == 0) {
      $("#loadMore").hide();
    }
  });
});

var m_article_eventr = $('.mandasa_archiv_main').attr('article-show-mobile');
  console.log(m_article_eventr);
  $(".content-cussd").slice(0, m_article_eventr).show();
  $("#loadMore11").on("click", function(e){
    e.preventDefault();
    $(".content-cussd:hidden").slice(0, m_article_eventr).slideDown();
    if($(".content-cussd:hidden").length == 0) {
      $("#loadMore11").hide();
    }
  });