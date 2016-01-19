export default function(){
  'ngInject';
  return {
    restrict: 'A',
    link(scope, el) {
      let menu;
      function dropdownButtonClick() {
        menu.toggleClass('show-menu');
      }
      function itemClick() {
        menu.removeClass('show-menu');
      }

      let button = $('.dropdown-button', el);
      menu = button.siblings('.dropdown-menu');
      $('.dropdown-button', el).on('click', dropdownButtonClick);
      menu.on('click', 'li', itemClick);

      scope.$on('$destroy', () => {
        button.off('click', dropdownButtonClick);
        menu.off('click', 'li', itemClick);
        menu = null;
        button = null;
      });
    }
  };
}
