function ShowMenu() {
    var menu_block = $('.menu-block'),
        main_block = $('.main-block');
    if (main_block.hasClass("hidden-xs")) {
        main_block.removeClass("hidden-xs");
        menu_block.addClass("hidden-xs");
    }
    else {
        main_block.addClass("hidden-xs");
        menu_block.removeClass("hidden-xs");
    }
}